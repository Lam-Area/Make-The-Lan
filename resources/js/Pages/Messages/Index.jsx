import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ messages }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Boîte de réception</h1>

      <div className="mb-4">
        <Link
          href="/messages/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nouveau message
        </Link>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Expéditeur</th>
            <th className="px-4 py-2">Destinataire</th>
            <th className="px-4 py-2">Contenu</th>
            <th className="px-4 py-2">Envoyé le</th>
            <th className="px-4 py-2">Lu le</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-t">
              <td className="px-4 py-2">{message.id}</td>
              <td className="px-4 py-2">{message.sender?.name}</td>
              <td className="px-4 py-2">{message.receiver?.name}</td>
              <td className="px-4 py-2">{message.content}</td>
              <td className="px-4 py-2">{message.created_at}</td>
              <td className="px-4 py-2">
                {message.read_at ? message.read_at : <em className="text-gray-400">Non lu</em>}
              </td>
              <td className="px-4 py-2">
                <Link
                  method="delete"
                  href={`/messages/${message.id}`}
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
