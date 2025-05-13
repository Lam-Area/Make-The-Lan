import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Show() {
  const { article } = usePage().props;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Détail de l'article</h1>

      <div className="space-y-2 border border-gray-200 rounded p-4 bg-white shadow">
        <div><strong>ID :</strong> {article.id}</div>
        <div><strong>Titre :</strong> {article.title}</div>
        <div><strong>Description :</strong> {article.description}</div>
        <div><strong>Prix :</strong> {article.price} €</div>
        <div><strong>Fichier :</strong> {article.file_path}</div>
        <div><strong>Code Preview :</strong> {article.code_preview}</div>
        <div><strong>Vendeur ID :</strong> {article.vendeur_id}</div>
        <div><strong>Créé le :</strong> {article.created_at}</div>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href={`/articles/${article.id}/edit`} className="text-blue-600 hover:underline">
          Modifier
        </Link>
        <Link href="/articles" className="text-gray-700 hover:underline">
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
