import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function UserLogs({ logs }) {
  const [showAll, setShowAll] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  if (!Array.isArray(logs)) {
    return <div className="text-red-500">Erreur : les logs ne sont pas disponibles.</div>;
  }

  const filteredLogs = logs.filter(log =>
    log.user?.name?.toLowerCase().includes(searchUser.toLowerCase())
  );

  const logsToDisplay = showAll ? filteredLogs : filteredLogs.slice(0, 5);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Logs des utilisateurs</h2>

      <div className="mb-4">
        <label className="text-white mr-2">Rechercher par nom :</label>
        <input
          type="text"
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
            setShowAll(false);
          }}
          placeholder="Input name"
          className="px-2 py-1 rounded border text-black"
        />
      </div>

      <div className="overflow-x-auto bg-white text-black shadow rounded-lg">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Utilisateur</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  Aucun log trouvé.
                </td>
              </tr>
            ) : (
              logsToDisplay.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="px-4 py-2">{log.user?.name || 'Inconnu'}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.ip_address}</td>
                  <td className="px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/userlogs/${log.id}`}
                      method="delete"
                      as="button"
                      className="text-red-600 hover:underline"
                      onClick={(e) => {
                        if (!confirm('Supprimer ce log ?')) e.preventDefault();
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

      {filteredLogs.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showAll ? 'Réduire ▲' : 'Voir plus ▼'}
          </button>
        </div>
      )}
    </div>
  );
}
