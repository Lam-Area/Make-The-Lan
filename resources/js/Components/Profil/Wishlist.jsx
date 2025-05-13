import React, { useState } from 'react';

export default function WishlistSection() {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Script 1', price: 39.99 },
    { id: 2, name: 'Script 2', price: 79.0 },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Liste de souhaits</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 italic">Votre liste est vide.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded shadow-sm bg-[#272e33] hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-sm text-gray-400">{item.price.toFixed(2)} €</p>
              </div>

              <div className="flex gap-2">
                <button className="bg-[#495761] text-white px-4 py-2 rounded hover:bg-[#3c4750] transition">
                  Ajouter au panier
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
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
