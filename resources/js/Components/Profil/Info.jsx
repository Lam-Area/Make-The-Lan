import React, { useState } from 'react';

export default function InfoSection() {
  const [formData, setFormData] = useState({
    prenom: 'John',
    nom: 'Doe',
    email: 'john.doe@example.com',
    phone: '06 12 34 56 78',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Données soumises :', formData);
    // plus tard : Inertia.post/put('/profil/infos', formData)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1E1E21]">
        <div>
          <label className="block text-sm font-medium text-white">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Téléphone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm text-gray-700"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-[#2A3740] text-white rounded hover:bg-[#272e33]"
      >
        Enregistrer
      </button>
    </form>
  );
}
