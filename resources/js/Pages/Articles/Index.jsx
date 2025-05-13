// resources/js/Pages/Articles/Index.jsx

import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { articles } = usePage().props;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Titre</th>
            <th className="p-2 border">Prix</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="p-2 border">{article.id}</td>
              <td className="p-2 border">{article.title}</td>
              <td className="p-2 border">{article.price} €</td>
              <td className="p-2 border">
                <Link
                  href={`/articles/${article.id}/edit`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Modifier
                </Link>
                <Link
                  href={`/articles/${article.id}`}
                  className="text-green-600 hover:underline"
                >
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
