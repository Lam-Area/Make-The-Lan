<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with('order', 'article')->get();

        return Inertia::render('OrderItems/Index', [
            'orderItems' => $orderItems
        ]);
    }

    public function create()
    {
        return Inertia::render('OrderItems/Create', [
            'orders' => Order::all(),
            'articles' => Article::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'article_id' => 'required|exists:articles,id',
            'price_at_purchase' => 'required|numeric|min:0',
            'created_at' => 'required|date',
        ]);

        OrderItem::create($validated);

        return redirect()->route('orderitems.index')->with('success', 'Détail de commande ajouté.');
    }

    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();

        return redirect()->route('orderitems.index')->with('success', 'Détail supprimé.');
    }
}
