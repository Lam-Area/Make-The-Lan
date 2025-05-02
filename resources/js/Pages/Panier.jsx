import React from 'react';

export default function CartSection() {
  const cartItems = [
    { id: 1, name: 'Produit A', price: 19.99, quantity: 1 },
    { id: 2, name: 'Produit B', price: 9.49, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Mon panier</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 italic text-center">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
            >
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
              </div>
              <p className="text-right font-bold text-gray-700">
                {(item.price * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}

          <div className="text-right border-t pt-4">
            <p className="text-xl font-bold text-gray-900">Total : {total} €</p>
          </div>
        </div>
      )}
    </div>
  );
}
