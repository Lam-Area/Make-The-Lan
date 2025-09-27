// resources/js/Pages/Articles/Index.jsx
import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

const titleByCat = (cat) => {
  if (cat === 'switch') return 'Switches Cisco';
  if (cat === 'router') return 'Routeurs Cisco';
  return 'Catalogue des articles';
};
const subtitleByCat = (cat) => {
  if (cat === 'switch') return 'Empile, trunk, et assure le débit';
  if (cat === 'router') return 'Le cerveau de tes réseaux';
  return 'Tous nos produits réseau';
};

export default function Index() {
  const { articles = [], filters = {} } = usePage().props;
  const { addToCart } = useCart();

  const [q, setQ] = React.useState(filters.search || '');

  const buildUrl = (params = {}) => {
    const p = new URLSearchParams();
    const v = { category: filters.category, search: q.trim(), ...params };
    if (v.category) p.set('category', v.category);
    if (v.search) p.set('search', v.search);
    const qs = p.toString();
    return `/articles${qs ? `?${qs}` : ''}`;
  };

  const submit = (e) => {
    e.preventDefault();
    router.visit(buildUrl());
  };

  const setCategory = (cat) => {
    router.visit(buildUrl({ category: cat, search: q.trim() }));
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">

          {/* Header */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {titleByCat(filters.category)}
              </h1>
              <p className="mt-1 text-sm text-gray-300">{subtitleByCat(filters.category)}</p>
            </div>

            {/* Filtres rapides */}
            <div className="hidden sm:flex items-center gap-2">
              <FilterPill
                active={!filters.category}
                onClick={() => setCategory(undefined)}
                label="Tout"
              />
              <FilterPill
                active={filters.category === 'switch'}
                onClick={() => setCategory('switch')}
                label="Switches"
              />
              <FilterPill
                active={filters.category === 'router'}
                onClick={() => setCategory('router')}
                label="Routeurs"
              />
            </div>
          </div>

          {/* Recherche */}
          <form onSubmit={submit} className="mt-5 mb-6 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un modèle, une réf…"
              className="flex-1 bg-[#0e1012]/60 backdrop-blur rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            {q && (
              <button
                type="button"
                onClick={() => { setQ(''); router.visit(buildUrl({ search: '' })); }}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
              >
                Effacer
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Rechercher
            </button>
          </form>

          {/* Grid */}
          {articles.length ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ProductCard key={a.id} article={a} onAdd={() => addToCart(a)} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
              Aucun article trouvé.
              <div className="mt-3">
                <Link href="/articles" className="text-blue-400 hover:underline">
                  Réinitialiser les filtres
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

function FilterPill({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-full border text-sm transition',
        active
          ? 'bg-white/10 border-white/20'
          : 'bg-white/5 hover:bg-white/10 border-white/10'
      ].join(' ')}
    >
      {label}
    </button>
  );
}

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
        {article.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium ring-1 ring-white/15">
            {article.category}
          </span>
        )}
      </div>

      {/* Content (identique à Home) */}
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
          Publié le {article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR') : '—'}
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

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10" />
      </div>
    </div>
  );
}
