import React from 'react';
import { useCart } from '@/Context/CartContext'; // ✅

export default function AddToCartButton({ article }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(article)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Ajouter au panier
    </button>
  );
}