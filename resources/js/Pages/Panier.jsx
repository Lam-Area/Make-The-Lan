import React from 'react';
import { useCart } from '@/Context/CartContext';
import { usePage, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Panier() {
  const { cart, removeFromCart } = useCart();
  const { auth } = usePage().props;

  const handleCheckout = () => {
    if (!auth.user) {
      window.location.href = '/login';
    } else {
      alert('Paiement initié avec ' + cart.length + ' article(s)');
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />

      <main className="flex-1 bg-[#1a1a1d] px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Aucun article dans le panier.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="border p-4 rounded shadow bg-[#272e33]">
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
                        Voir l'article
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Valider l'achat
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
