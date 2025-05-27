import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { articles } = usePage().props;

  return (
    <div className="p-6 max-w-5xl mx-auto text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link href="/articles/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Ajouter un article
        </Link>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Titre</th>
            <th className="p-2 border">Prix</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td className="p-2 border">{article.id}</td>
              <td className="p-2 border">{article.title}</td>
              <td className="p-2 border">{article.price} €</td>
              <td className="p-2 border">
                <Link href={`/articles/${article.id}`} className="text-green-600 hover:underline mr-2">Voir</Link>
                <Link href={`/articles/${article.id}/edit`} className="text-blue-600 hover:underline">Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
