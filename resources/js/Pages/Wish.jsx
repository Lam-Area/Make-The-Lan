import React from 'react';
import { useWishlist } from '@/Context/WishlistContext';
import { useCart } from '@/Context/CartContext';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Wish() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { auth } = usePage().props;

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen text-white">
        <main className="flex-1 px-6 py-10">
          <h1 className="text-2xl font-bold mb-6">Votre liste de souhaits</h1>

          {wishlist.length === 0 ? (
            <p className="text-gray-400">Aucun article dans la liste.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {wishlist.map((item) => (
                  <li key={item.id} className="border p-4 rounded shadow bg-[#16171A] bg-opacity-90">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-400">{item.price} €</p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Link
                          href={`/articles/${item.id}`}
                          className="text-green-400 hover:underline"
                        >
                          Voir l'article :
                        </Link>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="text-blue-500 hover:underline"
                        >
                          Ajouter au panier
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-500 hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </MainLayout>
  );
}