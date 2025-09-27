// resources/js/Pages/Page404.jsx
import React from 'react';
import { Link, Head, router } from '@inertiajs/react';

export default function Page404() {
  const [q, setQ] = React.useState('');

  const onSearch = (e) => {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    router.visit(`/articles?search=${encodeURIComponent(s)}`);
  };

  return (
    <>
      <Head title="Page introuvable • 404" />
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0e10] text-white flex items-center justify-center">
        {/* halos décoratifs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        {/* carte centrale */}
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              {/* bloc gauche : code + texte + CTAs */}
              <div>
                <div className="text-[65px] leading-none font-black tracking-tight sm:text-[88px] md:text-[110px]">
                  <span className="bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-transparent">
                    404
                  </span>
                </div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold">
                  Oups… page introuvable.
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  L’URL que tu as saisie n’existe pas (ou plus). Essaie une recherche
                  ou reviens au catalogue.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700 transition"
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/articles"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Voir le catalogue
                  </Link>
                  <button
                    onClick={() => window.history.back()}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Revenir en arrière
                  </button>
                </div>
              </div>

              {/* bloc droit : recherche */}
              <div className="rounded-2xl border border-white/10 bg-[#0b0e10]/60 p-5 backdrop-blur">
                <h2 className="text-lg font-medium">Chercher un article</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Tape un mot-clé (ex. <em>catalyst</em>, <em>routeur</em>, <em>ISR</em>…)
                </p>

                <form onSubmit={onSearch} className="mt-4 flex gap-2">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Rechercher un article…"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700 transition"
                  >
                    Rechercher
                  </button>
                </form>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/articles?category=switch"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                  >
                    #switches
                  </Link>
                  <Link
                    href="/articles?category=router"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                  >
                    #routeurs
                  </Link>
                  <Link
                    href="/articles?sort=recent"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                  >
                    #nouveautés
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl text-center text-xs text-gray-400">
            Code d’erreur : <span className="text-gray-300">404_NOT_FOUND</span>
          </div>
        </div>
      </div>
    </>
  );
}
