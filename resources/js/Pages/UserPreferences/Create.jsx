import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    dark_mode: false,
    language: 'fr',
    notification_email: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/userpreferences');
  };

  return (
    <div className="p-6">
      <Head title="Ajouter des préférences" />
      <h1 className="text-2xl font-bold mb-4">Ajouter des préférences</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Utilisateur</label>
          <select
            value={data.user_id}
            onChange={(e) => setData('user_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.user_id && <div className="text-red-500 text-sm">{errors.user_id}</div>}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.dark_mode}
              onChange={(e) => setData('dark_mode', e.target.checked)}
            />
            <span>Mode sombre</span>
          </label>
        </div>

        <div>
          <label className="block mb-1">Langue</label>
          <input
            type="text"
            value={data.language}
            onChange={(e) => setData('language', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.language && <div className="text-red-500 text-sm">{errors.language}</div>}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.notification_email}
              onChange={(e) => setData('notification_email', e.target.checked)}
            />
            <span>Recevoir des emails</span>
          </label>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Enregistrer
          </button>
          <Link href="/userpreferences" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
