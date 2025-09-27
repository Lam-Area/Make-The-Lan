<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserLog;
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

/* CRUDs principaux */
Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);

/* Favoris — seulement connecté */
Route::middleware('auth')->group(function () {
    Route::resource('favorites', FavoriteController::class)
        ->only(['index', 'store', 'destroy']);
});

/* Auth */
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

/* Profil — seulement connecté */
Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        $user = Auth::user();
        $articles = Article::where('vendeur_id', $user->id)->get();

        $users = $user->role === 'admin'
            ? User::select('id', 'name', 'email', 'role')->get()
            : [];

        $logs = $user->role === 'admin'
            ? UserLog::with('user')->latest()->get()
            : [];

        return Inertia::render('Profile', [
            'articles' => $articles,
            'users' => $users,
            'logs' => $logs,
            'auth' => [
                'user' => $user,
                'isAdmin' => $user->role === 'admin',
                'isVendeur' => $user->role === 'vendeur',
                'isUser' => $user->role === 'user',
            ],
        ]);
    });

    Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout']);
});

/* Accueil (pour tous) */
Route::get('/', function () {
    // 3 cartes "Nouveaux articles" : on force au moins 1 router si dispo
    $latestSwitches = \App\Models\Article::where('category', 'switch')->latest()->take(2)->get();
    $latestRouters  = \App\Models\Article::where('category', 'router')->latest()->take(1)->get();

    // Si pas de routeur, on complète avec des switches (ou inversement)
    if ($latestRouters->isEmpty()) {
        $fallback = \App\Models\Article::where('category', 'switch')->latest()->skip(2)->take(1)->get();
        $recent = $latestSwitches->concat($fallback);
    } else {
        $recent = $latestSwitches->concat($latestRouters);
    }

    // On re-trie pour l’ordre par date desc et on limite à 3
    $recent = $recent->sortByDesc('created_at')->values()->take(3);

    // Sections “Switches” et “Routeurs” (max 6)
    $switchArticles = \App\Models\Article::where('category', 'switch')->latest()->take(6)->get();
    $routerArticles = \App\Models\Article::where('category', 'router')->latest()->take(6)->get();

    return Inertia::render('Home', [
        'recentArticles' => $recent,
        'switchArticles' => $switchArticles,
        'routerArticles' => $routerArticles,
    ]);
});

/* Pages diverses */
Route::get('/panier', fn () => Inertia::render('Panier'));
Route::get('/wishlist', fn () => Inertia::render('Wish'));

Route::post('/userpreferences/toggle', [UserPreferenceController::class, 'toggle'])
    ->name('userpreferences.toggle');

Route::get('/register', fn () => Inertia::render('Register'));
Route::get('/legal',    fn () => Inertia::render('Legal'));
Route::get('/terms',    fn () => Inertia::render('Terms'));

/* Fallback 404 Inertia */
Route::fallback(fn () => Inertia::render('Page404'));
