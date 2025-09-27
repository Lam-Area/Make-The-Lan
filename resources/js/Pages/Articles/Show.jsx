// resources/js/Pages/Articles/Show.jsx
import { usePage, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';
import { useWishlist } from '@/Context/WishlistContext';

export default function Show() {
  const { article = {}, auth } = usePage().props;
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const isVendeur = auth?.user?.role === 'vendeur';
  const inStock = (article.stock_quantity ?? 0) > 0;

  const handleBuyNow = () => {
    addToCart(article);
    if (!auth?.user) router.visit('/login');
    else router.visit('/panier');
  };

  const handleAddToWishlist = () => {
    addToWishlist(article);
    router.visit('/wishlist');
  };

  // ✅ Résout le souci d'image: préfixe /storage si c'est un chemin local
  const imgSrc = (() => {
    const p = article.main_image_url;
    if (!p) return '/images/product-placeholder.png';
    if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
    return `/storage/${p}`;
  })();

  return (
    <MainLayout>
      <div className="w-full text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Fil d’Ariane simple */}
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/articles" className="hover:underline">Catalogue</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400">{article.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Image produit */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden bg-[#0e1012] border border-gray-700 aspect-video flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={article.title || 'Produit'}
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
              </div>

              {/* État du stock */}
              <div className="mt-3">
                {inStock ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-700/30 text-green-300 border border-green-700">
                    En stock ({article.stock_quantity})
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-700/30 text-red-300 border border-red-700">
                    Rupture
                  </span>
                )}
              </div>
            </div>

            {/* Détails + CTA */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
              <p className="text-gray-400 mb-6">{article.description}</p>

              {/* Fiche courte */}
              <div className="space-y-2 mb-6">
                <Info label="Marque" value={article.brand || 'Cisco'} />
                {article.model && <Info label="Modèle" value={article.model} />}
                {article.category && <Info label="Catégorie" value={humanCat(article.category)} />}
                {article.sku && <Info label="SKU" value={article.sku} />}
                <Info label="Ajouté le" value={formatDate(article.created_at)} />
              </div>

              {/* Prix + Boutons */}
              <div className="mb-6">
                <div className="text-3xl font-extrabold whitespace-nowrap">
                  {formatPrice(article.price)}
                </div>
                <div className="text-xs text-gray-400">TTC – Livraison standard</div>

                {!isVendeur && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => { addToCart(article); router.visit('/panier'); }}
                      disabled={!inStock}
                      className={`px-4 py-2 rounded ${inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'} text-white`}
                      title={inStock ? 'Ajouter au panier' : 'Indisponible pour le moment'}
                    >
                      Ajouter au panier
                    </button>

                    <button
                      onClick={handleBuyNow}
                      disabled={!inStock}
                      className={`px-4 py-2 rounded ${inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} text-white`}
                    >
                      Acheter maintenant
                    </button>

                    <button
                      onClick={handleAddToWishlist}
                      className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Ajouter aux favoris
                    </button>
                  </div>
                )}
              </div>

              {/* Specs techniques (JSON) */}
              {article.specs && (
                <div className="mt-6 border border-gray-700 rounded p-4 bg-[#16171A] bg-opacity-95">
                  <h2 className="text-xl font-semibold mb-3">Spécifications techniques</h2>
                  <Specs specs={article.specs} />
                </div>
              )}

              {/* Footer actions */}
              <div className="mt-6 flex justify-between items-center">
                {isVendeur ? (
                  <Link href="/profile" className="text-gray-300 hover:underline">
                    ← Retour au profil vendeur
                  </Link>
                ) : (
                  <button onClick={() => window.history.back()} className="text-gray-300 hover:underline">
                    ← Retour
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Info({ label, value }) {
  if (!value) return null;
  return (
    <div className="text-sm">
      <span className="font-semibold text-gray-300">{label} :</span>{' '}
      <span className="text-white">{value}</span>
    </div>
  );
}

function Specs({ specs }) {
  let data = specs;
  if (typeof specs === 'string') {
    try { data = JSON.parse(specs); } catch { data = null; }
  }
  if (!data || typeof data !== 'object') {
    return <p className="text-gray-400 text-sm">Aucune spécification fournie.</p>;
  }
  const entries = Object.entries(data);
  if (entries.length === 0) return <p className="text-gray-400 text-sm">Aucune spécification fournie.</p>;

  return (
    <div className="overflow-hidden rounded border border-gray-700">
      <dl className="divide-y divide-gray-700">
        {entries.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-4 p-3 bg-[#0e1012]">
            <dt className="text-gray-300">{humanize(k)}</dt>
            <dd className="col-span-2 text-white break-words">
              {renderSpecValue(v)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function renderSpecValue(v) {
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object' && v !== null) return JSON.stringify(v);
  return String(v);
}

/** Format FR officiel : "2 999,99 €" */
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
