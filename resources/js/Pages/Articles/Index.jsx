import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';
import { Search, Filter, X } from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

function Highlight({ title, highlight }) {
  if (!highlight) return title;
  const i = title.indexOf(highlight);
  if (i === -1) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="text-emerald-400">{highlight}</span>
      {title.slice(i + highlight.length)}
    </>
  );
}

const titleByCat = (cat) => {
  if (cat === 'switch') return { full: 'Switches Cisco', hi: 'Switches' };
  if (cat === 'router') return { full: 'Routeurs Cisco', hi: 'Routeurs' };
  return { full: 'Catalogue des articles', hi: 'Catalogue' };
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
  const [sort, setSort] = React.useState(filters.sort || 'recent');

  const buildUrl = (params = {}) => {
    const p = new URLSearchParams();
    const v = {
      category: filters.category,
      search: (params.search ?? q).trim(),
      sort: params.sort ?? sort,
      ...params,
    };
    if (v.category) p.set('category', v.category);
    if (v.search) p.set('search', v.search);
    if (v.sort) p.set('sort', v.sort);
    const qs = p.toString();
    return `/articles${qs ? `?${qs}` : ''}`;
  };

  const submit = (e) => {
    e.preventDefault();
    router.visit(buildUrl());
  };

  const setCategory = (cat) => {
    const next = buildUrl({ category: cat || undefined });
    router.visit(next);
  };

  const changeSort = (value) => {
    setSort(value);
    router.visit(buildUrl({ sort: value }));
  };

  const { full: pageTitle, hi: hiWord } = titleByCat(filters.category);

  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">

          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                <Highlight title={pageTitle} highlight={hiWord} />
              </h1>
              <p className="mt-1 text-sm text-gray-300">{subtitleByCat(filters.category)}</p>
            </div>

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

          <div className="mt-5 mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <form onSubmit={submit} className="sm:col-span-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher un modèle, une réf…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-12 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
                />
                {q && (
                  <button
                    type="button"
                    onClick={() => { setQ(''); router.visit(buildUrl({ search: '' })); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 hover:bg-white/10"
                    aria-label="Effacer la recherche"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
              <label className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                <Filter size={14} /> Trier par
              </label>
              <select
                value={sort}
                onChange={(e) => changeSort(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
              >
                <option className="text-black" value="recent">Plus récents</option>
                <option className="text-black" value="price_asc">Prix (bas → élevé)</option>
                <option className="text-black" value="price_desc">Prix (élevé → bas)</option>
                <option className="text-black" value="stock_desc">Stock (élevé → bas)</option>
              </select>
            </div>
          </div>

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
    ? (article.main_image_url.startsWith('http') || article.main_image_url.startsWith('/'))
        ? article.main_image_url
        : `/storage/${article.main_image_url}`
    : '/images/product-placeholder.png';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/30">
        <img
          src={img}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
        />
        {article.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium ring-1 ring-white/15">
            {humanCat(article.category)}
          </span>
        )}
      </div>

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

        <div className="mt-4">
          <div className="text-xl font-semibold">{fmtEUR(article.price)}</div>
          <div className="mt-2 flex items-center gap-2">
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

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10" />
      </div>
    </div>
  );
}

function humanCat(cat) {
  switch (cat) {
    case 'router': return 'Routeur';
    case 'switch': return 'Switch';
    case 'access_point': return 'Point d’accès';
    default: return cat || '—';
  }
}
