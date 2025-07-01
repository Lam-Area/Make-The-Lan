import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function ArticleAdmin() {
  const { articles = [] } = usePage().props;
  const [search, setSearch] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm('Confirmer la suppression de cet article ?')) {
      router.delete(`/articles/${id}`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Gestion des articles</h2>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre..."
          className="w-full max-w-md px-4 py-2 border rounded shadow-sm"
        />
      </div>

      <div className="overflow-x-auto bg-white text-black shadow rounded-lg">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                  Aucun article trouvé.
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr key={article.id} className="border-t">
                  <td className="px-4 py-2">{article.id}</td>
                  <td className="px-4 py-2">{article.title}</td>
                  <td className="px-4 py-2">{article.price} €</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/articles/${article.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
