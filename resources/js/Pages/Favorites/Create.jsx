import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ users, articles }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    article_id: '',
    created_at: new Date().toISOString().slice(0, 16), // date par défaut
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/favorites');
  };

  return (
    <div className="p-6">
      <Head title="Ajouter un favori" />
      <h1 className="text-2xl font-bold mb-4">Ajouter un favori</h1>

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
          <label className="block mb-1">Article</label>
          <select
            value={data.article_id}
            onChange={(e) => setData('article_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choisir un article --</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>{article.title}</option>
            ))}
          </select>
          {errors.article_id && <div className="text-red-500 text-sm">{errors.article_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Date d’ajout</label>
          <input
            type="datetime-local"
            value={data.created_at}
            onChange={(e) => setData('created_at', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.created_at && <div className="text-red-500 text-sm">{errors.created_at}</div>}
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
          <Link href="/favorites" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
