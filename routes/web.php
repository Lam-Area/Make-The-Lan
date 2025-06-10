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

Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('favorites', FavoriteController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::put('/profile/info', [UserController::class, 'updateInfo'])->name('profile.update');

Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
Route::get('/articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');

// Route personnalisée vers le profil avec les articles du vendeur
Route::get('/profile', function () {
    $user = Auth::user();
    $articles = Article::where('vendeur_id', $user->id)->get();

    return Inertia::render('Profile', [
        'articles' => $articles,
    ]);
});

Route::get('/', function () {
    $articles = Article::orderBy('created_at', 'desc')->take(6)->get();
    return Inertia::render('Home', [
        'recentArticles' => $articles,
    ]);
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/panier', function () {
    return Inertia::render('Panier');
});

Route::get('/legal', function () {
    return Inertia::render('Legal');
});

Route::get('/terms', function () {
    return Inertia::render('Terms');
});

Route::fallback(function () {
    return Inertia::render('Page404');
});
