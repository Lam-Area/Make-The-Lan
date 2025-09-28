<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query   = Article::query();
        $search  = trim((string) ($request->get('search') ?? $request->get('q') ?? ''));
        $category = $request->get('category');
        $sort     = $request->get('sort', 'recent');

        if ($category) {
            $query->where('category', $category);
        }

        if ($search !== '') {
            $query->where(function ($qq) use ($search) {
                $like = "%{$search}%";
                $qq->where('title', 'like', $like)
                   ->orWhere('description', 'like', $like)
                   ->orWhere('brand', 'like', $like)
                   ->orWhere('model', 'like', $like)
                   ->orWhere('sku', 'like', $like);
            });
        }

        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'stock_desc':
                $query->orderBy('stock_quantity', 'desc');
                break;
            case 'recent':
            default:
                $query->orderBy('created_at', 'desc');
        }

        $articles = $query->get();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'filters'  => [
                'category' => $category,
                'search'   => $search,
                'sort'     => $sort,
            ],
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
            'specs'           => ['nullable'],
            'vendeur_id'      => ['required', 'exists:users,id'],
        ]);

        if (!empty($validated['main_image_url'])) {
            $path = ltrim($validated['main_image_url'], '/');
            $path = preg_replace('#^storage/#', '', $path);
            $validated['main_image_url'] = $path;
        }

        if (isset($validated['specs']) && is_string($validated['specs'])) {
            $decoded = json_decode($validated['specs'], true);
            $validated['specs'] = is_array($decoded) ? $decoded : null;
        }

        Article::create($validated);

        return redirect()->route('articles.index')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', ['article' => $article]);
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

        if (!empty($validated['main_image_url'])) {
            $path = ltrim($validated['main_image_url'], '/');
            $path = preg_replace('#^storage/#', '', $path);
            $validated['main_image_url'] = $path;
        }

        if (isset($validated['specs']) && is_string($validated['specs'])) {
            $decoded = json_decode($validated['specs'], true);
            $validated['specs'] = is_array($decoded) ? $decoded : null;
        }

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
        $article->load('vendeur');
        return Inertia::render('Articles/Show', ['article' => $article]);
    }
}
