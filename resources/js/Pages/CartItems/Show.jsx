import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Show() {
  const { cartItem } = usePage().props;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Détail de l’article du panier</h1>

      <div className="bg-white shadow border rounded p-4 space-y-2">
        <div><strong>ID :</strong> {cartItem.id}</div>
        <div><strong>Utilisateur :</strong> {cartItem.user?.name}</div>
        <div><strong>Article :</strong> {cartItem.article?.title}</div>
        <div><strong>Ajouté le :</strong> {cartItem.created_at}</div>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          href={`/cartitems/${cartItem.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Modifier
        </Link>

        <Link
          href="/cartitems"
          className="text-gray-700 hover:underline"
        >
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
