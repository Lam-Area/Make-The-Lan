<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->get();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'           => ['required', 'string', 'max:150'],
            'description'     => ['required', 'string'],
            'price'           => ['required', 'numeric', 'min:0'],
            'brand'           => ['nullable', 'string', 'max:100'],
            'model'           => ['nullable', 'string', 'max:100'],
            'category'        => ['nullable', 'string', Rule::in(['router','switch','access_point'])],
            'sku'             => ['nullable', 'string', 'max:100', 'unique:articles,sku'],
            'stock_quantity'  => ['nullable', 'integer', 'min:0'],
            'main_image_url'  => ['nullable', 'string', 'max:255'],
            'specs'           => ['nullable'], // array ou JSON string
            'vendeur_id'      => ['required', 'exists:users,id'],
        ]);

        // specs peut arriver en string JSON depuis un formulaire brut
        if (isset($validated['specs']) && is_string($validated['specs'])) {
            $decoded = json_decode($validated['specs'], true);
            $validated['specs'] = is_array($decoded) ? $decoded : null;
        }

        $article = Article::create($validated);

        return redirect()->route('articles.index')
            ->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title'           => ['required', 'string', 'max:150'],
            'description'     => ['required', 'string'],
            'price'           => ['required', 'numeric', 'min:0'],
            'brand'           => ['nullable', 'string', 'max:100'],
            'model'           => ['nullable', 'string', 'max:100'],
            'category'        => ['nullable', 'string', Rule::in(['router','switch','access_point'])],
            'sku'             => ['nullable', 'string', 'max:100', Rule::unique('articles','sku')->ignore($article->id)],
            'stock_quantity'  => ['nullable', 'integer', 'min:0'],
            'main_image_url'  => ['nullable', 'string', 'max:255'],
            'specs'           => ['nullable'],
            'vendeur_id'      => ['required', 'exists:users,id'],
        ]);

        if (isset($validated['specs']) && is_string($validated['specs'])) {
            $decoded = json_decode($validated['specs'], true);
            $validated['specs'] = is_array($decoded) ? $decoded : null;
        }

        $article->update($validated);

        return redirect()->route('articles.index')
            ->with('success', 'Article modifié avec succès.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article supprimé.');
    }

    public function show(Article $article)
    {
        // Fournit les infos vendeur pour le bloc vendeur + Show.jsx
        $article->load('vendeur');

        return Inertia::render('Articles/Show', [
            'article' => $article,
        ]);
    }
}
