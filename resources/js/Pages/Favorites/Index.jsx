import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ favorites }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favoris</h1>

      <div className="mb-4">
        <Link
          href="/favorites/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Ajouter un favori
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Article</th>
            <th className="px-4 py-2">Ajouté le</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((fav) => (
            <tr key={fav.id} className="border-t">
              <td className="px-4 py-2">{fav.id}</td>
              <td className="px-4 py-2">{fav.user?.name}</td>
              <td className="px-4 py-2">{fav.article?.title}</td>
              <td className="px-4 py-2">{fav.created_at}</td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/favorites/${fav.id}`}
                  as="button"
                  className="text-red-500 hover:underline"
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
