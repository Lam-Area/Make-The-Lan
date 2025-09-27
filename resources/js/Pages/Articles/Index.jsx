// resources/js/Pages/Articles/Index.jsx
import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Index() {
  const { articles, filters = {} } = usePage().props;
  const [q, setQ] = React.useState(filters.search || '');

  const submit = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      router.visit(`/articles?search=${encodeURIComponent(query)}`);
    } else {
      router.visit('/articles'); // reset si champ vide
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Titre */}
          <h1 className="text-3xl font-bold mb-6">Catalogue des articles</h1>

          {/* Barre de recherche */}
          <form onSubmit={submit} className="mb-6 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              className="bg-[#495761] px-3 py-2 rounded focus:outline-none focus:ring flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Rechercher
            </button>
          </form>

          {/* Liste des articles */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.id}`}
                  className="block bg-[#16171A] bg-opacity-90 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="bg-[#0e1012] aspect-video w-full flex items-center justify-center border-b border-gray-800">
                    <img
                      src={a.main_image_url ? `/storage/${a.main_image_url}` : '/images/product-placeholder.png'}
                      alt={a.title}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-1">{a.title}</h2>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{a.description}</p>
                    <p className="mt-2 font-semibold text-green-400">
                      {Number(a.price).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aucun article trouvé.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
