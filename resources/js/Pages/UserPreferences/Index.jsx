import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Index({ preferences }) {
  return (
    <div className="p-6">
      <Head title="Préférences Utilisateurs" />
      <h1 className="text-2xl font-bold mb-4">Préférences des utilisateurs</h1>

      <div className="mb-4">
        <Link
          href="/userpreferences/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter des préférences
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Dark Mode</th>
            <th className="px-4 py-2">Langue</th>
            <th className="px-4 py-2">Notifications Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {preferences.map((pref) => (
            <tr key={pref.id} className="border-t">
              <td className="px-4 py-2">{pref.user?.name}</td>
              <td className="px-4 py-2">{pref.dark_mode ? 'Oui' : 'Non'}</td>
              <td className="px-4 py-2">{pref.language}</td>
              <td className="px-4 py-2">{pref.notification_email ? 'Oui' : 'Non'}</td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  href={`/userpreferences/${pref.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Modifier
                </Link>
                <Link
                  method="delete"
                  href={`/userpreferences/${pref.id}`}
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
