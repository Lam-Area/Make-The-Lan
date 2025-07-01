import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

export default function Index({ users }) {
  return (
    <div className="p-6">
      <Head title="Utilisateurs" />
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      <div className="mb-4">
        <Link
          href="/users/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Ajouter un utilisateur
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.avatar ? (
                    <img
                      src={`/storage/${user.avatar}`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Modifier
                  </Link>
                  <Link
                    href={`/users/${user.id}`}
                    method="delete"
                    as="button"
                    className="text-red-600 hover:underline"
                    onClick={(e) => {
                      if (!confirm('Confirmer la suppression de cet utilisateur ?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Supprimer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        {users.prev_page_url && (
          <Link
            href={users.prev_page_url}
            className="text-blue-500 hover:underline"
          >
            ← Précédent
          </Link>
        )}
        {users.next_page_url && (
          <Link
            href={users.next_page_url}
            className="text-blue-500 hover:underline"
          >
            Suivant →
          </Link>
        )}
      </div>
    </div>
  );
}
