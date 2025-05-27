import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Show() {
  const { article } = usePage().props;

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Détail de l'article</h1>

      <div className="space-y-2 border border-gray-200 rounded p-4 bg-white shadow">
        <Info label="ID" value={article.id} />
        <Info label="Titre" value={article.title} />
        <Info label="Description" value={article.description} />
        <Info label="Prix" value={`${article.price} €`} />
        <Info label="Chemin fichier" value={article.file_path} />
        <Info label="Code Preview" value={article.code_preview} />
        <Info label="Vendeur ID" value={article.vendeur_id} />
        <Info label="Créé le" value={article.created_at} />
      </div>

      <div className="mt-6 flex justify-between">
        <Link href={`/articles/${article.id}/edit`} className="text-blue-600 hover:underline">Modifier</Link>
        <Link href="/articles" className="text-gray-700 hover:underline">Retour à la liste</Link>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return <div><strong>{label} :</strong> {value}</div>;
}
