import React from 'react';
import { useWishlist } from '@/Context/WishlistContext';
import { useCart } from '@/Context/CartContext';
import { Link } from '@inertiajs/react';

export default function WishlistSection() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Liste de souhaits</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 italic text-center">Votre liste est vide.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-[#272e33] bg-opacity-25 hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-sm text-gray-400">Prix : {parseFloat(item.price).toFixed(2)} €</p>
              </div>
              <div className="flex items-center gap-4 ml-2">
                <Link
                  href={`/articles/${item.id}`}
                  className="text-green-400 hover:underline text-sm"
                >
                  Voir
                </Link>
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Ajouter au panier
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
