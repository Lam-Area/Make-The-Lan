import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function InfoSection() {
  const { user } = usePage().props.auth;

  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    avatar: user.avatar || null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('avatar', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put('/profile/info', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => reset('password'),
    });
  };

  useEffect(() => {
    if (data.avatar && typeof data.avatar !== 'string') {
      const objectUrl = URL.createObjectURL(data.avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof data.avatar === 'string') {
      setPreview(`/storage/${data.avatar}`);
    } else {
      setPreview('/images/mainpdp.png');
    }
  }, [data.avatar]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded">
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
          <label className="block text-sm font-medium text-white">
            Mot de passe (laisser vide pour ne pas changer)
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="mt-1 block w-1/2 rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white">Photo de profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-1/2 text-gray-700"
          />
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-white mb-2">Aperçu actuel :</p>
          <img
            src={preview || '/images/mainpdp.png'}
            alt="Avatar preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
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
