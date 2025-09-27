// resources/js/Pages/Home.jsx
import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import BannerCarousel from '@/Components/BannerCarousel';
import DiscordWidget from '@/Components/DiscordWidget';
import { useCart } from '@/Context/CartContext';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

export default function Home() {
  const { recentArticles = [], switchArticles = [], routerArticles = [] } = usePage().props;
  const { addToCart } = useCart();

  return (
    <MainLayout>
      <div className="min-h-screen text-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Partenaires */}
          <h1 className="text-3xl font-bold mt-12 text-left">Nos partenaires</h1>
          <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
            <div className="w-full lg:w-3/5 mt-14">
              <BannerCarousel />
            </div>
            <div className="w-full lg:w-[350px]">
              <DiscordWidget />
            </div>
          </div>

          {/* Nouveaux articles (max 3) */}
          <Section
            title="Nouveaux articles disponibles"
            items={recentArticles.slice(0, 3)}
            seeMoreHref="/articles?sort=recent"
            seeMoreLabel="Voir tout"
            addToCart={addToCart}
          />

          {/* Switches (max 6) */}
          <Section
            title="Switches Cisco"
            items={switchArticles.slice(0, 6)}
            seeMoreHref="/articles?category=switch"
            seeMoreLabel="Voir tous les switches"
            addToCart={addToCart}
          />

          {/* Routeurs (max 6) */}
          <Section
            title="Routeurs Cisco"
            items={routerArticles.slice(0, 6)}
            seeMoreHref="/articles?category=router"
            seeMoreLabel="Voir tous les routeurs"
            addToCart={addToCart}
          />
        </div>
      </div>
    </MainLayout>
  );
}

function Section({ title, items, seeMoreHref, seeMoreLabel, addToCart }) {
  return (
    <>
      <div className="mt-14 mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link href={seeMoreHref} className="text-blue-400 hover:underline text-sm">
          {seeMoreLabel}
        </Link>
      </div>

      {items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => (
            <Card key={a.id} article={a} onAdd={() => addToCart(a)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun article pour le moment.</p>
      )}
    </>
  );
}

function Card({ article, onAdd }) {
  const img = article.main_image_url ? `/storage/${article.main_image_url}` : '/images/product-placeholder.png';
  return (
    <div className="bg-[#16171A] bg-opacity-90 rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      <div className="bg-[#0e1012] aspect-video w-full flex items-center justify-center border-b border-gray-800">
        <img src={img} alt={article.title} className="w-full h-full object-contain p-3" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{article.title}</h3>
        <p className="text-gray-400 text-xs mb-2">
          Publié le {new Date(article.created_at).toLocaleDateString('fr-FR')}
        </p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{article.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold text-xl">{fmtEUR(article.price)}</div>
          <div className="flex items-center gap-3">
            <Link href={`/articles/${article.id}`} className="text-green-400 hover:underline text-sm">
              Voir
            </Link>
            <button
              onClick={onAdd}
              className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
              title="Ajouter au panier"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
