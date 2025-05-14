// resources/js/Pages/Orders/Index.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ orders }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Commandes</h1>

      <div className="mb-4">
        <Link
          href="/orders/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Nouvelle commande
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Prix total</th>
            <th className="px-4 py-2">Créée le</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.user?.name}</td>
              <td className="px-4 py-2">{order.total_price} €</td>
              <td className="px-4 py-2">{order.created_at}</td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/orders/${order.id}`}
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
