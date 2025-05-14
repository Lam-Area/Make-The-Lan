import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Index({ sessions }) {
  return (
    <div className="p-6">
      <Head title="Sessions Utilisateur" />
      <h1 className="text-2xl font-bold mb-4">Sessions actives</h1>

      <div className="mb-4">
        <Link
          href="/sessions/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter une session
        </Link>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Adresse IP</th>
            <th className="px-4 py-2">Navigateur</th>
            <th className="px-4 py-2">Dernière activité</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-t">
              <td className="px-4 py-2">{session.user?.name}</td>
              <td className="px-4 py-2">{session.ip_address}</td>
              <td className="px-4 py-2">{session.user_agent}</td>
              <td className="px-4 py-2">{session.last_activity}</td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/sessions/${session.id}`}
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
