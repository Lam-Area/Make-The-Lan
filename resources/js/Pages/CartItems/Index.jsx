import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ cartItems }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles dans le Panier</h1>

      <div className="mb-4">
        <Link
          href="/cartitems/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Ajouter au Panier
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Article</th>
            <th className="px-4 py-2">Ajouté le</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.user?.name}</td>
              <td className="px-4 py-2">{item.article?.title}</td>
              <td className="px-4 py-2">{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
