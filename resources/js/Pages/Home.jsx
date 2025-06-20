import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import BannerCarousel from '@/Components/BannerCarousel';
import DiscordWidget from '@/Components/DiscordWidget';
import { useCart } from '@/Context/CartContext'; // 👈 Ajout du hook panier

export default function Home() {
  const { recentArticles } = usePage().props;
  const { addToCart } = useCart(); // 👈 Hook panier

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#1e1e21] text-white p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mt-12 text-left">Nos partenaires</h1>

          <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
            <div className="w-full lg:w-3/5 mt-14">
              <BannerCarousel />
            </div>
            <div className="w-full lg:w-[350px]">
              <DiscordWidget />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-left">Nouveaux articles disponibles</h1>

          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-[#272e33] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-blue-400">{article.title}</h2>
                    <p className="text-gray-400 text-sm mb-2">
                      Publié le {new Date(article.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 text-sm mb-4">{article.description.slice(0, 80)}...</p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      href={`/articles/${article.id}`}
                      className="text-green-400 hover:underline text-sm"
                    >
                      Voir l’article
                    </Link>
                    <button
                      onClick={() => addToCart(article)}
                      className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Aucun article récent pour le moment.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
