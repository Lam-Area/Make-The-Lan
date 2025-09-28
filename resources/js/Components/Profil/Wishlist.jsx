import React from 'react';
import { Link } from '@inertiajs/react';
import { useWishlist } from '@/Context/WishlistContext';
import { useCart } from '@/Context/CartContext';
import { Trash2, Eye, ShoppingCart, HeartOff } from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

const imgSrcOf = (a) => {
  const p = a?.main_image_url;
  if (!p) return '/images/product-placeholder.png';
  if (p.startsWith('http') || p.startsWith('/')) return p;
  return `/storage/${p}`;
};

export default function WishlistSection() {
  const { wishlist = [], removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="text-white">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Liste de <span className="text-emerald-400">souhaits</span>
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            {wishlist.length ? `${wishlist.length} article${wishlist.length > 1 ? 's' : ''}` : 'Aucun article pour le moment.'}
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            title="Tout supprimer"
          >
            <Trash2 size={16} /> Tout supprimer
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <HeartOff size={20} />
          </div>
          <h3 className="text-lg font-medium">Ta wishlist est vide</h3>
          <p className="mt-1 text-sm text-gray-300">Parcours le catalogue et ajoute tes coups de cœur.</p>
          <Link
            href="/articles"
            className="mt-4 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700"
          >
            Voir le catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((a) => (
            <SmallProductCard
              key={a.id}
              article={a}
              onAdd={() => moveToCart(a)}
              onRemove={() => removeFromWishlist(a.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SmallProductCard({ article, onAdd, onRemove }) {
  const img = imgSrcOf(article);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <img
          src={img}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {article.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium ring-1 ring-white/15">
            {article.category}
          </span>
        )}
        <button
          onClick={onRemove}
          className="absolute right-3 top-3 rounded-lg bg-black/40 p-1.5 backdrop-blur ring-1 ring-white/20 hover:bg-black/60"
          title="Retirer"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 text-base font-semibold">
          <Link
            href={`/articles/${article.id}`}
            className="decoration-blue-400/40 hover:underline underline-offset-4"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-1 text-[11px] text-gray-400">
          Publié le {new Date(article.created_at).toLocaleDateString('fr-FR')}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-gray-300">
          {article.description || '—'}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-semibold">{fmtEUR(article.price)}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={onAdd}
              className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium hover:bg-emerald-700 active:scale-[.99] transition"
              title="Ajouter au panier"
            >
              <div className="inline-flex items-center gap-1.5">
                <ShoppingCart size={14} /> Add
              </div>
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
