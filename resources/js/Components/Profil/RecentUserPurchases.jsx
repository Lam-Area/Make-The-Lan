import React from 'react';

export default function RecentUserPurchases() {
  // seeders temp
  const purchases = [
    {
      id: 1,
      user: 'User Test',
      article: 'Script Pro 2.0',
      date: '2025-05-22 14:32',
      price: '39.99€'
    },
    {
      id: 2,
      user: 'Client A',
      article: 'Plugin MagicTool',
      date: '2025-05-20 11:15',
      price: '19.00€'
    },
  ];

  return (
    <div className="space-y-4">
      {purchases.map(p => (
        <div key={p.id} className="p-4 bg-[#272e33] bg-opacity-25 rounded shadow">
          <p><strong>Acheteur :</strong> {p.user}</p>
          <p><strong>Article :</strong> {p.article}</p>
          <p><strong>Prix :</strong> {p.price}</p>
          <p><strong>Date :</strong> {p.date}</p>
        </div>
      ))}
    </div>
  );
}
