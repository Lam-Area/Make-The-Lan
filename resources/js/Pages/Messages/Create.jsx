import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    sender_id: '',
    receiver_id: '',
    content: '',
    created_at: new Date().toISOString().slice(0, 16),
    read_at: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/messages');
  };

  return (
    <div className="p-6">
      <Head title="Envoyer un message" />
      <h1 className="text-2xl font-bold mb-4">Envoyer un nouveau message</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Expéditeur</label>
          <select
            value={data.sender_id}
            onChange={(e) => setData('sender_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.sender_id && <div className="text-red-500 text-sm">{errors.sender_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Destinataire</label>
          <select
            value={data.receiver_id}
            onChange={(e) => setData('receiver_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.receiver_id && <div className="text-red-500 text-sm">{errors.receiver_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Contenu</label>
          <textarea
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="5"
          />
          {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
        </div>

        <div>
          <label className="block mb-1">Date d’envoi</label>
          <input
            type="datetime-local"
            value={data.created_at}
            onChange={(e) => setData('created_at', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.created_at && <div className="text-red-500 text-sm">{errors.created_at}</div>}
        </div>

        <div>
          <label className="block mb-1">Lu le (optionnel)</label>
          <input
            type="datetime-local"
            value={data.read_at}
            onChange={(e) => setData('read_at', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.read_at && <div className="text-red-500 text-sm">{errors.read_at}</div>}
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Envoyer
          </button>
          <Link href="/messages" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
