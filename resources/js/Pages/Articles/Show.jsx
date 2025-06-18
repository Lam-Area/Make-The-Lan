import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Show() {
  const { article, auth } = usePage().props;

  const isVendeur = auth?.user?.role === 'vendeur';

  return (
    <MainLayout>
      <div className="w-full bg-[#1e1e21] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

          <div className="space-y-4 border border-gray-700 rounded p-6 bg-[#272e33] shadow">
            <Info label="Description" value={article.description} />
            <Info label="Prix" value={`${article.price} €`} />
            <Info label="Chemin du fichier" value={article.file_path} />
            <Info label="Code Preview" value={article.code_preview} />
            <Info label="Ajouté le" value={new Date(article.created_at).toLocaleDateString()} />
          </div>

          <div className="mt-6 text-right">
            {isVendeur ? (
              <Link
                href="/profile"
                className="text-gray-300 hover:underline"
              >
                ← Retour au profil vendeur
              </Link>
            ) : (
              <button
                onClick={() => window.history.back()}
                className="text-gray-300 hover:underline"
              >
                ← Retour
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span className="font-semibold text-gray-300">{label} :</span>{' '}
      <span className="text-white">{value}</span>
    </div>
  );
}
