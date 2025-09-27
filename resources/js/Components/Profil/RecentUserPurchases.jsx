import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ShoppingCart, User, Package, Clock, Search } from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
    .format(Number(n || 0));

const fmtDateTime = (d) => {
  try {
    return new Date(d).toLocaleString('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return d ?? '';
  }
};

export default function PurchaseLogs() {
  // ⚠️ Attendu depuis le contrôleur: purchaseLogs = [...]
  const { purchaseLogs = [] } = usePage().props;

  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return purchaseLogs;
    const pick = (s) => (s ?? '').toString().toLowerCase();
    return purchaseLogs.filter((l) =>
      pick(l?.user?.name).includes(needle) ||
      pick(l?.user?.email).includes(needle) ||
      pick(l?.article?.title).includes(needle) ||
      pick(l?.order_id).includes(needle)
    );
  }, [purchaseLogs, q]);

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Logs d’achat
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            {purchaseLogs.length} enregistrements • {filtered.length !== purchaseLogs.length ? `${filtered.length} affichés` : 'tout affiché'}
          </p>
        </div>

        {/* Recherche */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (user, article, #commande)…"
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
          />
        </div>
      </div>

      {/* Liste */}
      {filtered.length ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <ul className="divide-y divide-white/10">
            {filtered.map((log) => {
              const qty = Number(log.quantity || 1);
              const unit = Number(log.price || 0);
              const total = unit * qty;

              // avatar initial
              const initial =
                (log?.user?.name?.trim()?.[0] || log?.user?.email?.trim()?.[0] || '?')
                  .toUpperCase();

              return (
                <li key={log.id} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-12 hover:bg-white/5 transition">
                  {/* Acheteur */}
                  <div className="sm:col-span-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <User size={16} className="opacity-70" />
                        <span className="truncate">{log?.user?.name || 'Utilisateur'}</span>
                      </div>
                      <div className="truncate text-xs text-gray-400">{log?.user?.email || '—'}</div>
                    </div>
                  </div>

                  {/* Article */}
                  <div className="sm:col-span-4 min-w-0">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Package size={16} className="opacity-70" />
                      {log?.article?.id ? (
                        <Link
                          href={`/articles/${log.article.id}`}
                          className="truncate decoration-blue-400/40 hover:underline underline-offset-4"
                          title={log?.article?.title}
                        >
                          {log?.article?.title || 'Article'}
                        </Link>
                      ) : (
                        <span className="truncate">{log?.article?.title || 'Article'}</span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <span className="rounded-full bg-black/40 px-2 py-0.5 ring-1 ring-white/10">
                        #CMD {log?.order_id ?? '—'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="opacity-70" />
                        {fmtDateTime(log?.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Montants */}
                  <div className="sm:col-span-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Prix unitaire</div>
                      <div className="font-semibold">{fmtEUR(unit)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Quantité</div>
                      <div className="font-semibold">× {qty}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Total</div>
                      <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                        <ShoppingCart size={16} /> {fmtEUR(total)}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
          Aucun log d’achat pour le moment.
        </div>
      )}
    </section>
  );
}
