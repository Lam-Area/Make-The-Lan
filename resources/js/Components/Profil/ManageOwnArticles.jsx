import React from 'react';

export default function ManageOwnArticles() {
  // Articles simulés pour l’affichage de base
  const articles = [
    {
      id: 1,
      title: 'Script Avancé 1.2',
      price: '29.99€',
      created_at: '2025-05-10'
    },
    {
      id: 2,
      title: 'Extension Boost',
      price: '49.00€',
      created_at: '2025-05-18'
    }
  ];

  return (
    <div className="space-y-4">
      {articles.map(article => (
        <div key={article.id} className="p-4 bg-[#272e33] rounded shadow flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{article.title}</p>
            <p className="text-sm text-gray-400">Créé le : {article.created_at}</p>
            <p className="text-sm text-gray-300">Prix : {article.price}</p>
          </div>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white">Modifier</button>
            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Supprimer</button>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
          + Ajouter un article
        </button>
      </div>
    </div>
  );
}
