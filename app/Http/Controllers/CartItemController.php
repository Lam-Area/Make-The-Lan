<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartItemController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with(['user', 'article'])->get();
        return Inertia::render('CartItems/Index', ['cartItems' => $cartItems]);
    }

    public function create()
    {
        return Inertia::render('CartItems/Create', [
            'users' => User::all(),
            'articles' => Article::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
        ]);

        CartItem::create($validated);

        return redirect()->route('cartitems.index')->with('success', 'Article ajouté au panier.');
    }

    public function edit(CartItem $cartItem)
    {
        return Inertia::render('CartItems/Edit', [
            'cartItem' => $cartItem,
            'users' => User::all(),
            'articles' => Article::all(),
        ]);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
        ]);

        $cartItem->update($validated);

        return redirect()->route('cartitems.index')->with('success', 'Panier mis à jour.');
    }

    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();
        return redirect()->route('cartitems.index')->with('success', 'Article supprimé du panier.');
    }
}
