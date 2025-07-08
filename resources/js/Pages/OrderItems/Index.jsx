import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ orderItems }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles des commandes</h1>

      <div className="mb-4">
        <Link
          href="/orderitems/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter un article à une commande
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Commande</th>
            <th className="px-4 py-2">Article</th>
            <th className="px-4 py-2">Prix à l’achat (€)</th>
            <th className="px-4 py-2">Ajouté le</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">#{item.order?.id}</td>
              <td className="px-4 py-2">{item.article?.title}</td>
              <td className="px-4 py-2">{item.price_at_purchase} €</td>
              <td className="px-4 py-2">{item.created_at}</td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/orderitems/${item.id}`}
                  as="button"
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
