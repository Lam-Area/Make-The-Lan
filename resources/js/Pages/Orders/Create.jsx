import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    total_price: '',
    created_at: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/orders');
  };

  return (
    <div className="p-6">
      <Head title="Créer une commande" />
      <h1 className="text-2xl font-bold mb-4">Nouvelle commande</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Utilisateur</label>
          <select
            value={data.user_id}
            onChange={(e) => setData('user_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choisir un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.user_id && <div className="text-red-500 text-sm">{errors.user_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Prix total (€)</label>
          <input
            type="number"
            step="0.01"
            value={data.total_price}
            onChange={(e) => setData('total_price', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.total_price && <div className="text-red-500 text-sm">{errors.total_price}</div>}
        </div>

        <div>
          <label className="block mb-1">Date de création</label>
          <input
            type="datetime-local"
            value={data.created_at}
            onChange={(e) => setData('created_at', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.created_at && <div className="text-red-500 text-sm">{errors.created_at}</div>}
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Créer
          </button>
          <Link href="/orders" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
