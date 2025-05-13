// resources/js/Pages/Articles/Edit.jsx

import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

export default function Edit() {
  const { article, errors } = usePage().props;

  const { data, setData, put, processing } = useForm({
    title: article.title || '',
    description: article.description || '',
    price: article.price || '',
    file_path: article.file_path || '',
    code_preview: article.code_preview || '',
    vendeur_id: article.vendeur_id || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/articles/${article.id}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>

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
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            type="submit"
            disabled={processing}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Modifier
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
