<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Article;
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
    UserPreferenceController
};

/*
|--------------------------------------------------------------------------
| Routes RESTful (backend persistant)
|--------------------------------------------------------------------------
*/
Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);

/*
|------------------------------------------------------------------
| Favoris  ➜  protégés : seulement disponibles une fois connecté
| (les visiteurs utilisent localStorage + cookie, donc pas besoin
|  de back avant authentification)
|------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // index, store, destroy suffisent pour ta logique actuelle
    Route::resource('favorites', FavoriteController::class)
        ->only(['index', 'store', 'destroy']);
});

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login',  [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

/*
|--------------------------------------------------------------------------
| Profil vendeur
|--------------------------------------------------------------------------
*/
Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');

Route::get('/profile', function () {
    $user     = Auth::user();
    $articles = Article::where('vendeur_id', $user->id)->get();

    return Inertia::render('Profile', [
        'articles' => $articles,
    ]);
})->middleware('auth');

/*
|--------------------------------------------------------------------------
| Pages visiteurs
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    $articles = Article::orderBy('created_at', 'desc')->take(9)->get();
    return Inertia::render('Home', [
        'recentArticles' => $articles,
    ]);
});

// 🛒 Panier (offline + fusion login)
Route::get('/panier', fn () => Inertia::render('Panier'));

// ⭐ Wishlist /offline (visiteur) : même principe que le panier
Route::get('/wishlist', fn () => Inertia::render('Wish'));

/*
|--------------------------------------------------------------------------
| Pages légales & divers
|--------------------------------------------------------------------------
*/
Route::get('/register', fn () => Inertia::render('Register'));
Route::get('/legal',    fn () => Inertia::render('Legal'));
Route::get('/terms',    fn () => Inertia::render('Terms'));

/*
|--------------------------------------------------------------------------
| Fallback 404
|--------------------------------------------------------------------------
*/
Route::fallback(fn () => Inertia::render('Page404'));
