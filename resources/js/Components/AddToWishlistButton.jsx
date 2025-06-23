import React from 'react';
import { useWishlist } from '@/Context/WishlistContext';

export default function AddToWishlistButton({ article }) {
  const { addToWishlist } = useWishlist();

  return (
    <button
      onClick={() => addToWishlist(article)}
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
    >
      Ajouter aux favoris
    </button>
  );
}
