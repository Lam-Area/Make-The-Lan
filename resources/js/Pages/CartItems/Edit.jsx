import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ cartItem, users, articles }) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: cartItem.user_id || '',
    article_id: cartItem.article_id || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/cartitems/${cartItem.id}`);
  };

  return (
    <div className="p-6">
      <Head title="Modifier un article du panier" />
      <h1 className="text-2xl font-bold mb-4">Modifier un article du panier</h1>

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
          <label className="block mb-1">Article</label>
          <select
            value={data.article_id}
            onChange={(e) => setData('article_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner un article --</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>{article.title}</option>
            ))}
          </select>
          {errors.article_id && <div className="text-red-500 text-sm">{errors.article_id}</div>}
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Mettre à jour
          </button>

          <Link
            href="/cartitems"
            className="text-gray-600 underline hover:text-black"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
