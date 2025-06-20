<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Article;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserLogController;
use App\Http\Controllers\UserPreferenceController;

// 🔄 Routes RESTful
Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('favorites', FavoriteController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);

// 🔐 Auth
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

// 👤 Profil utilisateur (vendeur)
Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');

Route::get('/profile', function () {
    $user = Auth::user();
    $articles = Article::where('vendeur_id', $user->id)->get();

    return Inertia::render('Profile', [
        'articles' => $articles,
    ]);
});

// 🏠 Accueil
Route::get('/', function () {
    $articles = Article::orderBy('created_at', 'desc')->take(9)->get();
    return Inertia::render('Home', [
        'recentArticles' => $articles,
    ]);
});

// 🛒 Panier (offline + fusion login)
Route::get('/panier', function () {
    return Inertia::render('Panier');
});

// 📄 Pages légales
Route::get('/register', fn() => Inertia::render('Register'));
Route::get('/legal', fn() => Inertia::render('Legal'));
Route::get('/terms', fn() => Inertia::render('Terms'));

// 🔚 Fallback
Route::fallback(fn() => Inertia::render('Page404'));
