<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Article;
use App\Models\User;
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
|--------------------------------------------------------------------------
| Favoris  ➜ protégés : seulement disponibles une fois connecté
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::resource('favorites', FavoriteController::class)
        ->only(['index', 'store', 'destroy']);
});

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Profil (authentifié)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        $user = Auth::user();
        $articles = Article::where('vendeur_id', $user->id)->get();

        $users = $user->role === 'admin'
            ? User::select('id', 'name', 'email', 'role')->get()
            : [];

        return Inertia::render('Profile', [
            'articles' => $articles,
            'users' => $users,
            'auth' => [
                'user' => $user, // ← ici !
                'isAdmin' => $user->role === 'admin',
                'isVendeur' => $user->role === 'vendeur',
                'isUser' => $user->role === 'user',
            ],
        ]);
    });

    Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout']);
});

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

Route::get('/panier', fn () => Inertia::render('Panier'));
Route::get('/wishlist', fn () => Inertia::render('Wish'));

Route::post('/userpreferences/toggle', [UserPreferenceController::class, 'toggle'])->name('userpreferences.toggle');

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
