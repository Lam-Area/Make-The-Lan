<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'file_path' => 'nullable|string',
            'code_preview' => 'nullable|string',
            'vendeur_id' => 'required|exists:users,id',
        ]);

        Article::create($validated);

        return redirect()->route('articles.index')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'file_path' => 'nullable|string',
            'code_preview' => 'nullable|string',
            'vendeur_id' => 'required|exists:users,id',
        ]);

        $article->update($validated);

        return redirect()->route('articles.index')->with('success', 'Article modifié avec succès.');
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé.');
    }

    public function show(Article $article)
    {
        return Inertia::render('Articles/Show', [
            'article' => $article
        ]);
    }
}
