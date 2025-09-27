// resources/js/Pages/Home.jsx
import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import BannerCarousel from '@/Components/BannerCarousel';
import DiscordWidget from '@/Components/DiscordWidget';
import { useCart } from '@/Context/CartContext';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

export default function Home() {
  const {
    recentArticles = [],
    switchArticles = [],
    routerArticles = [],
  } = usePage().props;

  const { addToCart } = useCart();

  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
          {/* HERO / PARTENAIRES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Nos partenaires</h1>
              <div className="mt-6">
                <BannerCarousel />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <h2 className="text-xl font-semibold">Rejoindre la communauté</h2>
                <p className="mt-2 text-sm text-gray-300">
                  Ici on parle code !
                  Viens faire un tour et partager tes configs.
                </p>
                <div className="mt-4">
                  <DiscordWidget />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: Nouveaux articles */}
          <Section
            title="Nouveaux articles disponibles"
            subtitle="Sélection fraîchement ajoutée"
            items={[...recentArticles]
              .sort((a, b) => {
                if (a.category === 'router' && b.category !== 'router') return -1;
                if (b.category === 'router' && a.category !== 'router') return 1;
                return 0;
              })
              .slice(0, 3)}
            cta={{ href: '/articles?sort=recent', label: 'Voir tout' }}
            onAdd={addToCart}
          />

          {/* SECTION: Switches */}
          <Section
            title="Switches Cisco"
            subtitle="Empile, trunk, et assure le débit"
            items={switchArticles.slice(0, 6)}
            cta={{ href: '/articles?category=switch', label: 'Tous les switches' }}
            onAdd={addToCart}
          />

          {/* SECTION: Routeurs */}
          <Section
            title="Routeurs Cisco"
            subtitle="Le cerveau de tes réseaux"
            items={routerArticles.slice(0, 6)}
            cta={{ href: '/articles?category=router', label: 'Tous les routeurs' }}
            onAdd={addToCart}
          />
        </div>
      </div>
    </MainLayout>
  );
}

/* =========================
   Section block
========================= */
function Section({ title, subtitle, items = [], cta, onAdd }) {
  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-300">{subtitle}</p>}
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {items.length ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => (
            <ProductCard key={a.id} article={a} onAdd={() => onAdd(a)} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
          Aucun article pour le moment.
        </div>
      )}
    </section>
  );
}

/* =========================
   Product card
========================= */
function ProductCard({ article, onAdd }) {
  const img = article.main_image_url
    ? `/storage/${article.main_image_url}`
    : '/images/product-placeholder.png';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={img}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {/* Category pill */}
        {article.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium ring-1 ring-white/15">
            {article.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">
          <Link
            href={`/articles/${article.id}`}
            className="decoration-blue-400/40 hover:underline underline-offset-4"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Publié le {new Date(article.created_at).toLocaleDateString('fr-FR')}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-gray-300">
          {article.description || '—'}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-semibold">{fmtEUR(article.price)}</div>
          <div className="flex items-center gap-2">
            <Link
              href={`/articles/${article.id}`}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 transition"
            >
              Voir
            </Link>
            <button
              onClick={onAdd}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium hover:bg-emerald-700 active:scale-[.99] transition"
              title="Ajouter au panier"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10" />
      </div>
    </div>
  );
}
