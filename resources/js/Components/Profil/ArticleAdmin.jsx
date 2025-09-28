import React, { useMemo, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Plus, Search, Filter, Edit3, Trash2, Package, Layers, Tag } from "lucide-react";

const fmtEUR = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(Number(n || 0));

function resolveImg(src) {
  if (!src) return "/images/product-placeholder.png";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/storage/")) return src;
  if (src.startsWith("storage/")) return `/${src}`;
  if (src.startsWith("/")) return src;
  return `/storage/${src}`;
}

export default function ArticleAdmin() {
  const { articles = [] } = usePage().props;

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("date_desc");

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [articles]);

  const stats = useMemo(
    () => ({
      total: articles.length,
      stock: articles.reduce((s, a) => s + Number(a.stock_quantity || 0), 0),
      avg:
        articles.length > 0
          ? articles.reduce((s, a) => s + Number(a.price || 0), 0) / articles.length
          : 0,
    }),
    [articles]
  );

  const filtered = useMemo(() => {
    let rows = [...articles];

    if (q.trim()) {
      const needle = q.toLowerCase();
      rows = rows.filter(
        (a) =>
          (a.title || "").toLowerCase().includes(needle) ||
          (a.sku || "").toLowerCase().includes(needle) ||
          (a.model || "").toLowerCase().includes(needle) ||
          (a.brand || "").toLowerCase().includes(needle)
      );
    }
    if (cat !== "all") rows = rows.filter((a) => a.category === cat);

    switch (sort) {
      case "price_asc":
        rows.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case "price_desc":
        rows.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case "stock_desc":
        rows.sort((a, b) => Number(b.stock_quantity || 0) - Number(a.stock_quantity || 0));
        break;
      case "date_asc":
        rows.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        break;
      default:
      case "date_desc":
        rows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        break;
    }
    return rows;
  }, [articles, q, cat, sort]);

  const handleDelete = (id) => {
    if (confirm("Confirmer la suppression de cet article ?")) {
      router.delete(`/articles/${id}`);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Gestion des articles</h2>
          <p className="text-sm text-gray-300">Recherchez, filtrez et mettez à jour vos fiches produits.</p>
        </div>
        <Link
          href="/articles/create"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium hover:bg-emerald-700 active:scale-[.99]"
        >
          <Plus size={16} /> Nouvel article
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={<Layers size={18} />} label="Articles" value={stats.total} />
        <StatCard icon={<Package size={18} />} label="Stock total" value={stats.stock} />
        <StatCard icon={<Tag size={18} />} label="Prix moyen" value={fmtEUR(stats.avg)} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <label className="mb-1 block text-xs text-gray-400">Recherche</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Titre, SKU, modèle, marque…"
              className="w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <label className="mb-1 block text-xs text-gray-400">Catégorie</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Toutes" : humanCat(c)}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <label className="mb-1 block text-xs text-gray-400">Trier par</label>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none focus:border-white/20"
            >
              <option className="text-black" value="date_desc">Date (récent → ancien)</option>
              <option className="text-black" value="date_asc">Date (ancien → récent)</option>
              <option className="text-black" value="price_desc">Prix (élevé → bas)</option>
              <option className="text-black" value="price_asc">Prix (bas → élevé)</option>
              <option className="text-black" value="stock_desc">Stock (élevé → bas)</option>
            </select>
          </div>
        </div>
      </div>

      <ul className="lg:hidden space-y-3">
        {filtered.length === 0 ? (
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-gray-300">
            Aucun article ne correspond aux filtres.
          </li>
        ) : (
          filtered.map((a) => (
            <li key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <Thumb src={a.main_image_url} alt={a.title} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-medium">{a.title}</h3>
                    <div className="shrink-0 text-sm font-semibold">{fmtEUR(a.price)}</div>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-gray-400">
                    {(a.sku || "—")} · {a.created_at ? new Date(a.created_at).toLocaleDateString("fr-FR") : "—"}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <CategoryPill value={a.category} compact />
                    <StockBadge qty={Number(a.stock_quantity || 0)} compact />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <Link
                  href={`/articles/${a.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                  aria-label="Modifier l’article"
                >
                  <Edit3 size={14} /> Modifier
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                  aria-label="Supprimer l’article"
                >
                  <Trash2 size={14} /> Supprimer
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-3 hidden lg:block overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="min-w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-300">
              <Th className="w-12">ID</Th>
              <Th className="w-[40%]">Article</Th>
              <Th className="w-[14%]">Catégorie</Th>
              <Th className="w-[14%]">Prix</Th>
              <Th className="w-[16%]">Stock</Th>
              <Th className="w-[16%]">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-300">
                  Aucun article ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="border-b border-white/5 hover:bg-white/5">
                  <Td>{a.id}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Thumb src={a.main_image_url} alt={a.title} />
                      <div className="min-w-0">
                        <div className="truncate font-medium">{a.title}</div>
                        <div className="truncate text-xs text-gray-400">
                          {(a.sku || "—")} · {a.created_at ? new Date(a.created_at).toLocaleDateString("fr-FR") : "—"}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td><CategoryPill value={a.category} /></Td>
                  <Td className="font-medium">{fmtEUR(a.price)}</Td>
                  <Td className="whitespace-nowrap"><StockBadge qty={Number(a.stock_quantity || 0)} /></Td>
                  <Td>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/articles/${a.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                      >
                        <Edit3 size={14} /> Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                      >
                        <Trash2 size={14} /> Supprimer
                      </button>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        {icon} {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Thumb({ src, alt }) {
  const url = resolveImg(src);
  return (
    <div className="h-12 w-16 overflow-hidden rounded-lg border border-white/10 bg-black/20 shrink-0">
      <img src={url} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function CategoryPill({ value, compact = false }) {
  if (!value) return <span className="text-gray-400">—</span>;
  const label = humanCat(value);
  const map = {
    router: "bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-300/30",
    switch: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-300/30",
    access_point: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-300/30",
  };
  const base = map[value] || "bg-white/10 text-gray-200 ring-1 ring-white/20";
  const size = compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return <span className={`inline-flex items-center rounded-full ${size} ${base}`}>{label}</span>;
}

function StockBadge({ qty, compact = false }) {
  const size = compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  if (qty <= 0)
    return <span className={`rounded-full bg-red-500/15 ${size} text-red-200 ring-1 ring-red-300/30`}>Rupture</span>;
  if (qty < 5)
    return <span className={`rounded-full bg-amber-500/15 ${size} text-amber-200 ring-1 ring-amber-300/30`}>Faible ({qty})</span>;
  return <span className={`rounded-full bg-emerald-500/15 ${size} text-emerald-200 ring-1 ring-emerald-300/30`}>{qty} en stock</span>;
}

function humanCat(cat) {
  switch (cat) {
    case "router": return "Routeur";
    case "switch": return "Switch";
    case "access_point": return "Point d’accès";
    default: return cat || "—";
  }
}
