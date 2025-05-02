import React from 'react';

export default function OrderHistorySection() {
  const purchases = [
    {
      id: 1,
      name: 'Script 1',
      price: 24.99,
      date: '2025-04-20',
    },
    {
      id: 2,
      name: 'Script 2',
      price: 59.00,
      date: '2025-04-18',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Historique d’achat</h2>

      {purchases.length === 0 ? (
        <p className="text-gray-500 italic">Aucun achat effectué.</p>
      ) : (
        <div className="space-y-4">
          {purchases.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded shadow-sm bg-white"
            >
              <div>
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-sm text-gray-500">Acheté le : {item.date}</p>
              </div>
              <p className="font-semibold text-right">{item.price.toFixed(2)} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
