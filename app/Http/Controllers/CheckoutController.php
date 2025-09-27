<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\StripeClient;
use App\Models\Order;
use App\Models\OrderItem;

class CheckoutController extends Controller
{
    /**
     * POST /checkout
     * items: [{ id, title, price, quantity|qty?, main_image_url? }]
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'items'                  => ['required','array','min:1'],
            'items.*.id'             => ['required','integer'],
            'items.*.title'          => ['required','string','max:255'],
            'items.*.price'          => ['required','numeric','min:0'],
            'items.*.quantity'       => ['nullable','integer','min:1'],
            'items.*.qty'            => ['nullable','integer','min:1'],
            'items.*.main_image_url' => ['nullable','string','max:255'],
        ]);

        try {
            $stripe = new StripeClient(config('services.stripe.secret'));

            $lineItems = collect($data['items'])->map(function ($item) {
                $qty = (int) ($item['quantity'] ?? $item['qty'] ?? 1);
                if ($qty < 1) $qty = 1;

                $unitAmount = (int) round(((float) $item['price']) * 100);

                $image = null;
                if (!empty($item['main_image_url'])) {
                    $path  = 'storage/' . ltrim($item['main_image_url'], '/');
                    $image = URL::to('/' . $path);
                }

                return [
                    'price_data' => [
                        'currency'     => 'eur',
                        'product_data' => [
                            'name'     => $item['title'],
                            'images'   => $image ? [$image] : [],
                            'metadata' => [
                                'article_id' => (string) $item['id'],
                                'unit_price' => (string) $unitAmount, // en centimes
                            ],
                        ],
                        'unit_amount'  => $unitAmount,
                    ],
                    'quantity' => $qty,
                ];
            })->values()->all();

            if (empty($lineItems)) {
                return back()->with('error', 'Aucun article valide à payer.');
            }

            $session = $stripe->checkout->sessions->create([
                'mode'        => 'payment',
                'line_items'  => $lineItems,
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'  => route('checkout.cancel'),
                'metadata'    => [
                    'user_id' => Auth::id() ? (string) Auth::id() : '',
                ],
            ]);

            return Inertia::location($session->url);

        } catch (\Throwable $e) {
            report($e);
            return back()->with('error', "Impossible de démarrer le paiement Stripe.");
        }
    }

    /**
     * GET /checkout/success?session_id=...
     * Affiche la page de confirmation + (si payé) crée l’Order à partir des données Stripe
     * pour éviter les doubles, on vérifie stripe_payment_intent.
     */
    public function success(Request $request)
    {
        $sessionId = (string) $request->query('session_id');

        $sessionData = [];
        if ($sessionId) {
            try {
                $stripe  = new StripeClient(config('services.stripe.secret'));
                $session = $stripe->checkout->sessions->retrieve($sessionId, [
                    'expand' => ['line_items', 'line_items.data.price.product'],
                ]);

                $sessionData = [
                    'id'             => $session->id,
                    'status'         => $session->status,
                    'payment_status' => $session->payment_status,
                    'amount_total'   => $session->amount_total,
                    'currency'       => $session->currency,
                    'payment_intent' => $session->payment_intent,
                ];

                $user = Auth::user();
                if ($user && $session->payment_status === 'paid') {
                    $existing = Order::where('user_id', $user->id)
                        ->where('stripe_payment_intent', (string) $session->payment_intent)
                        ->first();

                    if (!$existing) {
                        $order = Order::create([
                            'user_id'               => $user->id,
                            'total_price'           => $session->amount_total / 100,
                            'stripe_session_id'     => $session->id,
                            'stripe_payment_intent' => (string) $session->payment_intent,
                        ]);

                        foreach (($session->line_items->data ?? []) as $line) {
                            $articleId  = null;
                            $unitAmount = (int) ($line->price?->unit_amount ?? 0);
                            $qty        = (int) ($line->quantity ?? 1);
                            if ($qty < 1) $qty = 1;

                            $product = $line->price?->product;
                            if ($product && isset($product->metadata)) {
                                if (!empty($product->metadata->article_id)) {
                                    $articleId = (int) $product->metadata->article_id;
                                }
                                if (!empty($product->metadata->unit_price)) {
                                    $unitAmount = (int) $product->metadata->unit_price;
                                }
                            }

                            // Sans colonne quantity : N lignes
                            for ($i = 0; $i < $qty; $i++) {
                                OrderItem::create([
                                    'order_id'          => $order->id,
                                    'article_id'        => $articleId,
                                    'price_at_purchase' => $unitAmount / 100,
                                ]);
                            }
                        }
                    }
                }

            } catch (\Throwable $e) {
                report($e);
            }
        }

        return Inertia::render('Checkout/Success', [
            'sessionId' => $sessionId,
            'session'   => $sessionData,
        ]);
    }

    /** GET /checkout/cancel */
    public function cancel()
    {
        return Inertia::render('Checkout/Cancel');
    }

    /**
     * POST /stripe/webhook (optionnel)
     */
    public function webhook(Request $request)
    {
        $secret = config('services.stripe.webhook_secret');
        if (!$secret) {
            return response('webhook secret missing', 400);
        }

        $payload = $request->getContent();
        $sig     = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig, $secret);
        } catch (\Throwable $e) {
            report($e);
            return response('invalid payload', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            // Tu pourrais finaliser ici si tu préfères côté webhook.
        }

        return response('ok', 200);
    }

    /**
     * POST /checkout/finalize
     * Déclenché depuis Success.jsx pour “copier” le panier côté BDD (fallback).
     */
    public function finalize(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $data = $request->validate([
            'session_id' => ['required','string'],
            'items'      => ['required','array','min:1'],
            'items.*.id'    => ['required','integer'],
            'items.*.price' => ['required','numeric','min:0'],
        ]);

        $total = collect($data['items'])->sum(fn($i) => (float) $i['price']);

        $order = Order::create([
            'user_id'               => $user->id,
            'total_price'           => $total,
            'stripe_session_id'     => $data['session_id'],
            'stripe_payment_intent' => $request->input('payment_intent', ''), // optionnel
        ]);

        foreach ($data['items'] as $item) {
            OrderItem::create([
                'order_id'          => $order->id,
                'article_id'        => (int) $item['id'],
                'price_at_purchase' => (float) $item['price'],
            ]);
        }

        return response()->json(['success' => true]);
    }
}
