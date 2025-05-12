<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Favorite::with(['user', 'article'])->get();

        return Inertia::render('Favorites/Index', [
            'favorites' => $favorites
        ]);
    }

    public function create()
    {
        return Inertia::render('Favorites/Create', [
            'users' => User::all(),
            'articles' => Article::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'created_at' => 'required|date'
        ]);

        Favorite::create($validated);

        return redirect()->route('favorites.index')->with('success', 'Favori ajouté avec succès.');
    }

    public function destroy(Favorite $favorite)
    {
        $favorite->delete();

        return redirect()->route('favorites.index')->with('success', 'Favori supprimé.');
    }
}
