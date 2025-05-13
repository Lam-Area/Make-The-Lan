import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';

export default function Create() {
  const { errors } = usePage().props;

  const { data, setData, post, processing } = useForm({
    title: '',
    description: '',
    price: '',
    file_path: '',
    code_preview: '',
    vendeur_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/articles'); // utilise store() du controller
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer un article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Prix</label>
          <input
            type="number"
            step="0.01"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
        </div>

        <div>
          <label className="block font-medium">Fichier (chemin)</label>
          <input
            type="text"
            value={data.file_path}
            onChange={(e) => setData('file_path', e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Code Preview</label>
          <input
            type="text"
            value={data.code_preview}
            onChange={(e) => setData('code_preview', e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Vendeur ID</label>
          <input
            type="number"
            value={data.vendeur_id}
            onChange={(e) => setData('vendeur_id', e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.vendeur_id && <div className="text-red-500">{errors.vendeur_id}</div>}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Créer
          </button>
          <Link
            href="/articles"
            className="text-gray-700 hover:underline"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
