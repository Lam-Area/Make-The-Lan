import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';

export default function ManageOwnArticles() {
  const { articles, auth } = usePage().props;
  const vendeurId = auth?.user?.id;

  const handleDelete = (id) => {
    if (confirm('Supprimer cet article ?')) {
      router.delete(`/articles/${id}`);
    }
  };

  const userArticles = articles.filter(article => article.vendeur_id === vendeurId);

  return (
    <div className="min-h-screen bg-[#1e1e21] bg-opacity-25 p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1></h1>
        <Link
          href="/articles"
          className="text-sm text-gray-300 hover:text-white hover:underline"
        >
          Accéder à tous les articles
        </Link>
      </div>

      {/* Liste articles */}
      <div className="space-y-4">
        {userArticles.map(article => (
          <div
            key={article.id}
            className="p-4 bg-[#272e33] rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold text-white">{article.title}</p>
              <p className="text-sm text-gray-400">
                Créé le : {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-300">Prix : {article.price} €</p>
            </div>
            <div className="space-x-2">
              <Link
                href={`/articles/${article.id}/edit`}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton add */}
      <div className="mt-6">
        <Link
          href="/articles/create"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          + Ajouter un article
        </Link>
      </div>
    </div>
  );
}
