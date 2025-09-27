<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\User;
use App\Models\Order;
use App\Http\Controllers\{
    ArticleController,
    AuthController,
    CartItemController,
    FavoriteController,
    OrderController,
    OrderItemController,
    SessionController,
    UserController,
    UserLogController,
    UserPreferenceController,
    CheckoutController, // Stripe
};

/* =========================
|  CRUDs principaux
|=========================*/
Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);

/* =========================
|  Auth
|=========================*/
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

/* =========================
|  Profil — seulement connecté
|=========================*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        $user = Auth::user();

        $articles = Article::where('vendeur_id', $user->id)->get();

        $users = $user->role === 'admin'
            ? User::select('id', 'name', 'email', 'role')->get()
            : [];

        $logs = $user->role === 'admin'
            ? \App\Models\UserLog::with('user')->latest()->get()
            : [];

        // Historique d’achats du user connecté
        $orders = Order::with(['items.article'])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Profile', [
            'articles' => $articles,
            'users'    => $users,
            'logs'     => $logs,
            'orders'   => $orders,
            'auth'     => [
                'user'      => $user,
                'isAdmin'   => $user->role === 'admin',
                'isVendeur' => $user->role === 'vendeur',
                'isUser'    => $user->role === 'user',
            ],
        ]);
    });

    Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ Détonateur : Success.jsx déclenche cet endpoint pour
    // copier le panier -> historique, puis vider le panier.
    Route::post('/checkout/finalize', [CheckoutController::class, 'finalize'])
        ->name('checkout.finalize');
});

/* =========================
|  Accueil (pour tous)
|=========================*/
Route::get('/', function () {
    $latestSwitches = Article::where('category', 'switch')->latest()->take(2)->get();
    $latestRouters  = Article::where('category', 'router')->latest()->take(1)->get();

    $recent = $latestRouters->isEmpty()
        ? $latestSwitches->concat(
            Article::where('category', 'switch')->latest()->skip(2)->take(1)->get()
          )
        : $latestSwitches->concat($latestRouters);

    $recent = $recent->sortByDesc('created_at')->values()->take(3);

    $switchArticles = Article::where('category', 'switch')->latest()->take(6)->get();
    $routerArticles = Article::where('category', 'router')->latest()->take(6)->get();

    return Inertia::render('Home', [
        'recentArticles' => $recent,
        'switchArticles' => $switchArticles,
        'routerArticles' => $routerArticles,
    ]);
});

/* =========================
|  Pages simples
|=========================*/
Route::get('/panier', fn () => Inertia::render('Panier'));
Route::get('/wishlist', fn () => Inertia::render('Wish'));

Route::post('/userpreferences/toggle', [UserPreferenceController::class, 'toggle'])
    ->name('userpreferences.toggle');

Route::get('/register', fn () => Inertia::render('Register'));
Route::get('/legal',    fn () => Inertia::render('Legal'));
Route::get('/terms',    fn () => Inertia::render('Terms'));

/* =========================
|  Stripe Checkout
|=========================*/
Route::post('/checkout',        [CheckoutController::class, 'create'])->name('checkout.create');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel',  [CheckoutController::class, 'cancel'])->name('checkout.cancel');
Route::post('/stripe/webhook',  [CheckoutController::class, 'webhook'])->name('stripe.webhook');

/* =========================
|  Fallback 404 Inertia
|=========================*/
Route::fallback(fn () => Inertia::render('Page404'));
