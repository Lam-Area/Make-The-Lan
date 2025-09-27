import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Cancel() {
  return (
    <MainLayout>
      <div className="min-h-[70vh] px-6 py-12 text-white">
        <div className="max-w-2xl mx-auto bg-[#16171A] bg-opacity-95 border border-gray-700 rounded-xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold">Paiement annulé</h1>
          <p className="mt-2 text-gray-300">
            Votre paiement a été annulé. Vous pouvez retourner au panier pour réessayer.
          </p>

          <div className="mt-6 flex gap-3">
            <Link href="/panier" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
              Retour au panier
            </Link>
            <Link href="/" className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
