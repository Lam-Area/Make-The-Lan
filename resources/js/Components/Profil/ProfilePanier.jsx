import React from 'react';
import { useCart } from '@/Context/CartContext';
import { Link, usePage } from '@inertiajs/react';

export default function CartSection() {
  const { cart, removeFromCart } = useCart();
  const { auth } = usePage().props;

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0).toFixed(2);

  const handleCheckout = () => {
    if (!auth.user) {
      window.location.href = '/login';
    } else {
      alert('Paiement initié avec ' + cart.length + ' article(s)');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Mon panier</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 italic text-center">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-[#272e33] hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-sm text-gray-400">Quantité : 1</p>
              </div>
              <div className="flex items-center gap-4 ml-2">
                <Link
                  href={`/articles/${item.id}`}
                  className="text-green-400 hover:underline text-sm"
                >
                  Voir
                </Link>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Supprimer
                </button>
                <p className="text-right font-bold text-white">
                  {parseFloat(item.price).toFixed(2)} €
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center">
            <p className="text-xl font-bold text-white">Total : {total} €</p>

            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Valider l'achat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
