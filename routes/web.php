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
    OrderController,
    OrderItemController,
    SessionController,
    UserController,
    UserLogController,
    UserPreferenceController,
    CheckoutController,
};


Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);


Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth')->group(function () {

    Route::get('/profile', function () {
        $user = Auth::user();


        $articles = $user->role === 'admin'
            ? Article::latest()->get()
            : Article::where('vendeur_id', $user->id)->latest()->get();

        $users = $user->role === 'admin'
            ? User::select('id', 'name', 'email', 'role')->get()
            : [];

        $logs = $user->role === 'admin'
            ? \App\Models\UserLog::with('user')->latest()->get()
            : [];


        $orders = Order::with(['items.article'])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Profile', [
            'articles' => $articles,
            'users'    => $users,
            'logs'     => $logs,
            'orders'   => $orders,
        ]);
    })->name('profile');

    Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


    Route::post('/checkout/finalize', [CheckoutController::class, 'finalize'])
        ->name('checkout.finalize');


    Route::get('/admin/articles', [ArticleController::class, 'adminIndex'])
        ->name('admin.articles.index');
});


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


Route::get('/panier', fn () => Inertia::render('Panier'))->name('cart.page');
Route::get('/wishlist', fn () => Inertia::render('Wish'))->name('wishlist.page');

Route::post('/userpreferences/toggle', [UserPreferenceController::class, 'toggle'])
    ->name('userpreferences.toggle');


Route::get('/register', fn () => Inertia::render('Register'))->name('register.form');
Route::get('/legal',    fn () => Inertia::render('Legal'))->name('legal');
Route::get('/terms',    fn () => Inertia::render('Terms'))->name('terms');


Route::post('/checkout',        [CheckoutController::class, 'create'])->name('checkout.create');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel',  [CheckoutController::class, 'cancel'])->name('checkout.cancel');
Route::post('/stripe/webhook',  [CheckoutController::class, 'webhook'])->name('stripe.webhook');


Route::fallback(fn () => Inertia::render('Page404'));
