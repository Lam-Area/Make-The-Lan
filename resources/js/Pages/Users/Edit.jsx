// resources/js/Pages/Users/Edit.jsx

import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    role: user.role || 'user',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/users/${user.id}`);
  };

  return (
    <div className="p-6">
      <Head title="Modifier un utilisateur" />
      <h1 className="text-2xl font-bold mb-4">Modifier un utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Nom</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        <div>
          <label className="block mb-1">Mot de passe (laisser vide pour ne pas changer)</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        <div>
          <label className="block mb-1">Rôle</label>
          <select
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">Utilisateur</option>
            <option value="vendeur">Vendeur</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Mettre à jour
          </button>

          <Link href="/users" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
