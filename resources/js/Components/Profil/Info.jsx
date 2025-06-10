import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function InfoSection() {
  const { user } = usePage().props.auth;

  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put('/profile/info');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1E1E21] p-4 rounded">
        <div>
          <label className="block text-sm font-medium text-white">Nom</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white">Mot de passe (laisser vide pour ne pas changer)</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="mt-1 block w-1/2 rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="px-4 py-2 bg-[#2A3740] text-white rounded hover:bg-[#272e33]"
      >
        Enregistrer
      </button>
    </form>
  );
}
