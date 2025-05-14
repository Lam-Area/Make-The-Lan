import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Index({ logs }) {
  return (
    <div className="p-6">
      <Head title="Historique Utilisateur" />
      <h1 className="text-2xl font-bold mb-4">Historique des actions utilisateur</h1>

      <div className="mb-4">
        <Link
          href="/userlogs/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter un log
        </Link>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">IP</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.user?.name}</td>
              <td className="px-4 py-2">{log.action}</td>
              <td className="px-4 py-2">{log.ip_address}</td>
              <td className="px-4 py-2">{log.created_at}</td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/userlogs/${log.id}`}
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
