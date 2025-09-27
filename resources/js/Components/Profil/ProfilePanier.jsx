// resources/js/Components/Profil/ProfilePanier.jsx (ou ta page Panier)
import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';
import { Trash2 } from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

export default function CartSection() {
  const { cart, removeFromCart } = useCart();
  const { auth } = usePage().props;

  // Sous-total = somme des (prix * quantité)
  const subtotal = cart.reduce(
    (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1),
    0
  );

  // Mode import : pas de TVA au panier
  const total = subtotal; // Total (hors taxes d’import)

  const goCheckout = () => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }
    // On envoie les items à Stripe via /checkout
    const items = cart.map((it) => ({
      id: it.id,
      title: it.title,
      price: Number(it.price || 0),
      quantity: Number(it.quantity || 1),
      main_image_url: it.main_image_url || '',
    }));
    router.post('/checkout', { items });
  };

  if (!cart.length) {
    return (
      <div className="mx-auto w-full max-w-4xl p-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
          <h2 className="text-2xl font-semibold">Mon panier</h2>
          <p className="mt-2 text-gray-300">Votre panier est vide.</p>
          <Link
            href="/articles"
            className="mt-4 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Parcourir les articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-6 text-white">
      <h2 className="text-2xl sm:text-3xl font-semibold">Mon panier</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Liste des items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const qty = Number(item.quantity || 1);
            const unit = Number(item.price || 0);
            const lineTotal = unit * qty;
            const img =
              item.main_image_url
                ? `/storage/${item.main_image_url}`
                : '/images/product-placeholder.png';

            return (
              <div
                key={item.id}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0b0e10]">
                  <img
                    src={img}
                    alt={item.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/articles/${item.id}`}
                    className="line-clamp-2 text-base font-semibold hover:underline decoration-blue-400/40"
                  >
                    {item.title}
                  </Link>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      Qté : {qty}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                    <div className="text-sm text-gray-300">
                      <div>Prix unitaire : <span className="text-white font-medium">{fmtEUR(unit)}</span></div>
                      <div>Total ligne : <span className="text-white font-semibold">{fmtEUR(lineTotal)}</span></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/articles/${item.id}`}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                      >
                        Voir
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/20"
                        title="Supprimer"
                      >
                        <Trash2 size={16} /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Récapitulatif */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h3 className="text-lg font-semibold">Récapitulatif</h3>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Sous-total</span>
                <span>{fmtEUR(subtotal)}</span>
              </div>

              {/* Taxes import : texte uniquement */}
              <div className="flex items-start justify-between text-gray-300">
                <span className="pr-4">Taxes</span>
                <span className="text-right italic">Calculées à l’import</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Livraison</span>
                <span>Offerte</span>
              </div>

              <div className="my-2 h-px bg-white/10" />

              <div className="flex justify-between">
                <span className="font-medium">
                  Total <span className="text-gray-300">(hors taxes d’import)</span>
                </span>
                <span className="text-xl font-semibold">{fmtEUR(total)}</span>
              </div>
            </div>

            <button
              onClick={goCheckout}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[.99]"
            >
              Valider l’achat
            </button>

            <p className="mt-3 text-xs text-gray-400">
              Les taxes et droits de douane, le cas échéant, seront perçus par le transporteur lors
              de l’importation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
