import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserList({ users }) {
  if (!Array.isArray(users)) {
    return (
      <div className="text-red-500">
        Données utilisateurs introuvables. Vérifiez les props passées à &lt;UserList /&gt;.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Liste des utilisateurs</h2>

      <div className="overflow-x-auto bg-white text-black shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{user.id}</td>
                  <td className="px-4 py-2 text-gray-800">{user.name}</td>
                  <td className="px-4 py-2 text-gray-800 break-all">{user.email}</td>
                  <td className="px-4 py-2 text-gray-800 capitalize">{user.role}</td>
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
                        if (!confirm('Confirmer la suppression ?')) e.preventDefault();
                      }}
                    >
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
