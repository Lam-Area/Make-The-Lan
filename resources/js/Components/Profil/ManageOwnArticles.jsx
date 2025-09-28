import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import {
  Plus, Edit, Trash2, Eye, Search, Package, Tag, Layers,
  CalendarClock, CircleDollarSign,
} from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
    .format(Number(n || 0));

const imgOf = (a) => {
  const p = a?.main_image_url;
  if (!p) return '/images/product-placeholder.png';
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
  return `/storage/${p}`;
};

export default function ManageOwnArticles() {
  const { articles = [], auth } = usePage().props;
  const me = auth?.user;

  const mine = React.useMemo(
    () => articles.filter((a) => a.vendeur_id === me?.id),
    [articles, me?.id]
  );

  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('all');
  const [sort, setSort] = React.useState('created_desc');

  const categories = React.useMemo(() => {
    const s = new Set();
    mine.forEach((a) => a.category && s.add(a.category));
    return ['all', ...Array.from(s)];
  }, [mine]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = mine.filter((a) => {
      const match =
        !needle ||
        (a.title || '').toLowerCase().includes(needle) ||
        (a.model || '').toLowerCase().includes(needle) ||
        String(a.id).includes(needle);
      const okCat = cat === 'all' || a.category === cat;
      return match && okCat;
    });

    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_desc':
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'created_asc':
        list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default:
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return list;
  }, [mine, q, cat, sort]);

  const onDelete = (id) => {
    if (!confirm('Supprimer cet article ?')) return;
    router.delete(`/articles/${id}`, { preserveScroll: true });
  };

  return (
    <section className="text-white">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Mes articles</h2>
          <p className="mt-1 text-sm text-gray-300">
            {mine.length} créé(s) • {filtered.length !== mine.length ? `${filtered.length} affiché(s)` : 'tout affiché'}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher (titre, modèle, #ID)…"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
            />
          </div>

          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/20"
          >
            {categories.map((c) => (
              <option className='text-black' key={c} value={c}>
                {c === 'all' ? 'Toutes catégories' : c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/20"
          >
            <option className='text-black' value="created_desc">Plus récents</option>
            <option className='text-black' value="created_asc">Plus anciens</option>
            <option className='text-black' value="price_desc">Prix décroissant</option>
            <option className='text-black' value="price_asc">Prix croissant</option>
          </select>

          <Link
            href="/articles/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-700 active:scale-[.99]"
          >
            <Plus size={16} /> Ajouter
          </Link>
        </div>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={imgOf(a)}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                {a.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium ring-1 ring-white/15">
                    {a.category}
                  </span>
                )}
                <button
                  onClick={() => onDelete(a.id)}
                  title="Supprimer"
                  className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/50 p-2 text-white ring-1 ring-white/10 hover:bg-red-600/80"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  <Link
                    href={`/articles/${a.id}`}
                    className="decoration-blue-400/40 hover:underline underline-offset-4"
                  >
                    {a.title}
                  </Link>
                </h3>

                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Tag size={14} /> {a.model || '—'}
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <CalendarClock size={14} />{' '}
                    {new Date(a.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers size={14} /> Stock : {a.stock_quantity ?? 0}
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Package size={14} /> SKU : {a.sku || '—'}
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                    <CircleDollarSign size={16} /> {fmtEUR(a.price)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/articles/${a.id}/edit`}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 transition"
                    >
                      <Edit size={16} /> Modifier
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-items-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold">Aucun article</h3>
            <p className="mt-1 text-sm text-gray-300">
              Commence par créer ton premier produit.
            </p>
            <Link
              href="/articles/create"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700"
            >
              <Plus size={16} /> Ajouter un article
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
