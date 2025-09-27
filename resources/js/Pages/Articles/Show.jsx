// resources/js/Pages/Articles/Show.jsx
import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';
import { useWishlist } from '@/Context/WishlistContext';

export default function Show() {
  const { article = {}, auth } = usePage().props;
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const isVendeur = auth?.user?.role === 'vendeur';
  const stock = Number(article.stock_quantity ?? 0);
  const inStock = stock > 0;

  // Image src robuste (/storage si chemin local)
  const imgSrc = (() => {
    const p = article.main_image_url;
    if (!p) return '/images/product-placeholder.png';
    if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
    return `/storage/${p}`;
  })();

  // Quantité
  const [qty, setQty] = React.useState(1);
  const clampQty = (n) => {
    if (!inStock) return 0;
    const v = Math.max(1, Math.min(stock, Number.isFinite(n) ? n : 1));
    return v;
  };
  const onQtyChange = (e) => setQty(clampQty(parseInt(e.target.value, 10)));
  const inc = () => setQty((q) => clampQty(q + 1));
  const dec = () => setQty((q) => clampQty(q - 1));

  // Actions
  const handleAddToCart = () => {
    const item = { ...article, quantity: qty };
    addToCart(item);
    router.visit('/panier');
  };
  const handleBuyNow = () => {
    const item = { ...article, quantity: qty };
    addToCart(item);
    if (!auth?.user) router.visit('/login');
    else router.visit('/panier');
  };
  const handleAddToWishlist = () => {
    addToWishlist(article);
    router.visit('/wishlist');
  };

  return (
    <MainLayout>
      <div className="px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          {/* Top nav actions */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <button onClick={() => window.history.back()} className="text-gray-300 hover:underline">
                ← Retour
              </button>
              <span className="opacity-40">/</span>
              <Link href="/articles" className="text-blue-400 hover:underline">
                Voir d’autres articles
              </Link>
            </div>
            <div className="text-gray-400">
              Publié le {formatDate(article.created_at)}
              {article.sku ? <span className="ml-2 opacity-70">• SKU {article.sku}</span> : null}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e10]">
                <div className="aspect-video grid place-items-center p-4">
                  <img src={imgSrc} alt={article.title || 'Produit'} className="h-full w-full object-contain" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                {article.category && <Badge tone="indigo">{humanCat(article.category)}</Badge>}
                <Badge tone={inStock ? 'green' : 'red'}>
                  {inStock ? `En stock (${stock})` : 'Rupture'}
                </Badge>
              </div>

              <h1 className="mb-3 text-3xl font-bold leading-tight">{article.title}</h1>

              {/* Prix + Quantité + Actions (glass) */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-[#0b0e10]/70 p-4">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  {/* Prix */}
                  <div>
                    <div className="text-[2rem] font-extrabold leading-none">
                      {formatPrice(article.price)}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">TTC — Livraison standard</div>
                  </div>

                  {/* Quantité + Boutons */}
                  {!isVendeur && (
                    <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-3">
                      {/* Quantité au-dessus */}
                      <QtyStepper
                        qty={qty}
                        setQty={setQty}
                        dec={dec}
                        inc={inc}
                        onChange={onQtyChange}
                        max={stock}
                        disabled={!inStock}
                      />

                      {/* Boutons alignés */}
                      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                        <Btn onClick={handleAddToCart} disabled={!inStock} tone={inStock ? 'green' : 'muted'}>
                          Ajouter au panier
                        </Btn>
                        <Btn onClick={handleBuyNow} disabled={!inStock} tone={inStock ? 'blue' : 'muted'}>
                          Acheter maintenant
                        </Btn>
                        <Btn onClick={handleAddToWishlist} tone="amber" variant="soft">
                          Favoris
                        </Btn>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {article.description && (
                <section className="mb-6">
                  <h2 className="mb-2 text-xl font-semibold">Description</h2>
                  <p className="rounded-xl border border-white/10 bg-black/30 p-4 text-gray-200 leading-relaxed">
                    {article.description}
                  </p>
                </section>
              )}

              {/* Infos courtes */}
              <section className="mb-6 grid gap-3 sm:grid-cols-2">
                <Fact label="Marque" value={article.brand || 'Cisco'} />
                {article.model && <Fact label="Modèle" value={article.model} />}
                {article.category && <Fact label="Catégorie" value={humanCat(article.category)} />}
                {article.warranty_months && <Fact label="Garantie" value={`${article.warranty_months} mois`} />}
              </section>

              {/* Spécifications */}
              <section>
                <h2 className="mb-3 text-xl font-semibold">Spécifications</h2>
                <Specs specs={article.specs} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

/* ====== UI helpers ====== */
function Badge({ children, tone = 'slate' }) {
  const cls = {
    green: 'bg-green-500/18 text-green-300 border-green-500/30',
    red: 'bg-red-500/18 text-red-300 border-red-500/30',
    indigo: 'bg-indigo-500/18 text-indigo-300 border-indigo-500/30',
    slate: 'bg-white/10 text-gray-200 border-white/20',
  }[tone];
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}>{children}</span>;
}

function Btn({ children, onClick, disabled, tone = 'blue', variant = 'solid' }) {
  const tones = {
    blue:   { solid: 'bg-blue-600 hover:bg-blue-700 text-white', soft: 'bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30' },
    green:  { solid: 'bg-green-600 hover:bg-green-700 text-white', soft: 'bg-green-500/15 hover:bg-green-500/25 text-green-300 border border-green-500/30' },
    amber:  { solid: 'bg-amber-500 hover:bg-amber-600 text-black', soft: 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30' },
    muted:  { solid: 'bg-gray-600 text-white cursor-not-allowed',  soft: 'bg-gray-600/20 text-gray-300 border border-gray-500/30 cursor-not-allowed' },
  };
  const cls = tones[tone]?.[variant] || tones.blue.solid;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm transition disabled:opacity-60 ${cls}`}
    >
      {children}
    </button>
  );
}

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}

function QtyStepper({ qty, setQty, dec, inc, onChange, max, disabled }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs text-gray-400">Quantité</div>
      <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <button
          type="button"
          onClick={dec}
          disabled={disabled || qty <= 1}
          className="px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          max={Math.max(1, max || 1)}
          value={disabled ? 0 : qty}
          onChange={onChange}
          disabled={disabled}
          className="w-16 bg-transparent text-center outline-none py-1.5"
        />
        <button
          type="button"
          onClick={inc}
          disabled={disabled || qty >= max}
          className="px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
        >
          +
        </button>
      </div>
      <div className="text-xs text-gray-400">/ {max ?? 0} en stock</div>
    </div>
  );
}

/* ====== Specs ====== */
function Specs({ specs }) {
  let data = specs;
  if (typeof specs === 'string') {
    try { data = JSON.parse(specs); } catch { data = null; }
  }
  if (!data || typeof data !== 'object') {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-gray-400">
        Aucune spécification fournie.
      </div>
    );
  }
  const entries = Object.entries(data);
  if (!entries.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-gray-400">
        Aucune spécification fournie.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="divide-y divide-white/10">
        {entries.map(([k, v]) => (
          <div key={k} className="grid grid-cols-1 gap-3 bg-[#0b0e10]/70 p-4 sm:grid-cols-3">
            <div className="text-sm text-gray-300">{humanize(k)}</div>
            <div className="sm:col-span-2 break-words text-sm text-white/95">
              {renderSpecValue(v)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function renderSpecValue(v) {
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object' && v !== null) return JSON.stringify(v);
  return String(v);
}

/* ====== utils ====== */
function formatPrice(p) {
  const n = Number(p);
  if (Number.isNaN(n)) return p ?? '';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}
function formatDate(d) {
  try { return new Date(d).toLocaleDateString('fr-FR'); } catch { return ''; }
}
function humanize(s) {
  if (!s) return '';
  return String(s).replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}
function humanCat(cat) {
  switch (cat) {
    case 'router': return 'Routeur';
    case 'switch': return 'Switch';
    case 'access_point': return 'Point d’accès';
    default: return cat;
  }
}
