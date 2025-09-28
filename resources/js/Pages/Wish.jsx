import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { useWishlist } from "@/Context/WishlistContext";
import { useCart } from "@/Context/CartContext";
import { Link } from "@inertiajs/react";

const fmtEUR = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(Number(n) || 0);

function resolveImg(src) {
  if (!src) return "/images/product-placeholder.png";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/storage/${src}`;
}

export default function Wish() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const handleAddAll = () => {
    if (!wishlist.length) return;
    wishlist.forEach((it) => addToCart(it));
  };

  const handleClearAll = () => {
    if (!wishlist.length) return;
    if (!confirm("Supprimer tous les articles de la liste de souhaits ?")) return;
    wishlist.forEach((it) => removeFromWishlist(it.id));
  };

  const potentialTotal = wishlist.reduce((s, it) => s + (Number(it.price) || 0), 0);

  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Votre liste de souhaits</h1>
              <p className="text-sm text-gray-300">
                {wishlist.length} article{wishlist.length > 1 ? "s" : ""} enregistré
                {wishlist.length > 1 ? "s" : ""}.
              </p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearAll}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Tout supprimer
                </button>
                <Link
                  href="/"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Continuer mes achats
                </Link>
              </div>
            )}
          </div>


          {wishlist.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white/10 grid place-items-center">
                💚
              </div>
              <p className="text-lg text-gray-300">Aucun article dans la liste.</p>
              <Link
                href="/articles"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
              >
                Parcourir les articles
              </Link>
            </div>
          ) : (
            <>

              <ul className="mt-8 space-y-4">
                {wishlist.map((item) => {
                  const img = resolveImg(item.main_image_url || "");
                  return (
                    <li
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center gap-4 p-4 sm:p-5">

                        <div className="relative shrink-0">
                          <img
                            src={img}
                            alt={item.title}
                            className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover ring-1 ring-white/10"
                            loading="lazy"
                          />
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
                            {item.description || "—"}
                          </p>
                          <div className="mt-2 text-sm text-gray-400">Prix indicatif : {fmtEUR(item.price)}</div>
                        </div>


                        <div className="flex shrink-0 flex-col items-end gap-3">
                          <div className="text-right text-lg font-semibold">{fmtEUR(item.price)}</div>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/articles/${item.id}`}
                              className="text-emerald-400 hover:text-emerald-300 text-sm"
                            >
                              Voir l’article
                            </Link>
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              Ajouter au panier
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
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
                  );
                })}
              </ul>

 
              <div className="sticky bottom-4 mt-8">
                <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur px-4 sm:px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <p className="text-lg sm:text-xl">
                      Sous-total potentiel :{" "}
                      <span className="font-semibold">{fmtEUR(potentialTotal)}</span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleAddAll}
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-700 active:scale-[.99] transition shadow-[0_0_0_1px_rgba(255,255,255,.08)]"
                      >
                        Tout ajouter au panier
                      </button>
                      <Link
                        href="/panier"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Aller au panier
                      </Link>
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
