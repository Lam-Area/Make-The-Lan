import React from 'react';
import { useCart } from '@/Context/CartContext';
import { Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

function formatEUR(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n) || 0);
}

export default function Panier() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleCheckout = () => {
    if (!cart.length) return;

    const items = cart.map((it) => ({
      id: it.id,
      title: it.title,
      price: Number(it.price) || 0,
      qty: 1,
      main_image_url: it.main_image_url || '',
    }));

    router.post('/checkout', { items });
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">Votre panier</h1>

          {cart.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white/10 grid place-items-center">🧺</div>
              <p className="text-lg text-gray-300">Aucun article dans le panier.</p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
              >
                Parcourir les articles
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-8 space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center gap-4 p-4 sm:p-5">
                      <div className="relative shrink-0">
                        {item.main_image_url ? (
                          <img
                            src={`/storage/${item.main_image_url}`}
                            alt={item.title}
                            className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover ring-1 ring-white/10"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-white/10 ring-1 ring-white/10 grid place-items-center text-gray-400 text-xs">
                            Aucune image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base sm:text-lg font-medium">
                          <Link
                            href={`/articles/${item.id}`}
                            className="decoration-blue-400/40 hover:underline underline-offset-4"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                          {item.description || '—'}
                        </p>
                        <div className="mt-2 text-sm text-gray-400">Quantité : 1</div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-3">
                        <div className="text-right text-lg font-semibold">{formatEUR(item.price)}</div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/articles/${item.id}`}
                            className="text-emerald-400 hover:text-emerald-300 text-sm"
                          >
                            Voir l’article
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10" />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="sticky bottom-4 mt-8">
                <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <p className="text-xl">
                      Total : <span className="font-semibold">{formatEUR(total)}</span>
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Continuer mes achats
                      </Link>
                      <button
                        onClick={handleCheckout}
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-700 active:scale-[.99] transition shadow-[0_0_0_1px_rgba(255,255,255,.08)]"
                      >
                        Payer avec Stripe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
