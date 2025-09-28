import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import {
  ReceiptText, Download, Box, ChevronRight, ExternalLink,
} from 'lucide-react';

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n || 0));

export default function OrderHistorySection() {
  const { orders = [] } = usePage().props;

  if (!orders?.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300 backdrop-blur">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <ReceiptText className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-white">Aucun achat pour le moment</h3>
        <p className="mt-1 text-sm">Quand tu passeras commande, elle apparaîtra ici.</p>
        <Link
          href="/articles"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
        >
          Parcourir le catalogue <ExternalLink size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }) {
  const date = new Date(order.created_at).toLocaleDateString('fr-FR');
  const status = (order.status || 'payée').toLowerCase();
  const total = fmtEUR(order.total_price);
  const items = Array.isArray(order.items) ? order.items : [];
  const totalQty = items.reduce((s, it) => s + Number(it.quantity || 1), 0);
  const invoiceUrl = order.invoice_url || null; // fournis-la côté back si dispo

  const statusTone =
    status.includes('attente') || status.includes('pending')
      ? 'bg-amber-500/20 text-amber-200 ring-amber-500/30'
      : status.includes('annul')
      ? 'bg-red-500/20 text-red-200 ring-red-500/30'
      : 'bg-emerald-500/20 text-emerald-200 ring-emerald-500/30';

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <ReceiptText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm text-gray-300">
              Commande <span className="font-medium text-white">#{order.id}</span>
            </div>
            <div className="text-xs text-gray-400">Passée le {date}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${statusTone}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-300 ring-1 ring-white/10">
            {totalQty} article{totalQty > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {items.map((it) => (
          <OrderItem key={it.id} item={it} />
        ))}
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-sm text-gray-300">
          Total TTC : <span className="text-lg font-semibold text-white">{total}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/orders/${order.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Détails <ChevronRight size={16} />
          </Link>

          {invoiceUrl ? (
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-medium hover:bg-emerald-700"
            >
              Télécharger la facture <Download size={16} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-sm text-gray-400 ring-1 ring-white/10"
              title="Facture indisponible pour cette commande"
            >
              Facture indisponible
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderItem({ item }) {
  const a = item.article || {};
  const title = a.title || 'Article';
  const qty = Number(item.quantity || 1);
  const unit = fmtEUR(item.price_at_purchase ?? item.unit_price ?? 0);
  const line = fmtEUR((item.price_at_purchase ?? item.unit_price ?? 0) * qty);

  const raw = a.main_image_url || '';
  const img =
    raw?.startsWith('http') || raw?.startsWith('/')
      ? raw
      : raw
      ? `/storage/${raw}`
      : '/images/product-placeholder.png';

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="grid h-14 w-20 place-items-center overflow-hidden rounded-lg bg-black/20 ring-1 ring-white/10">
        <img src={img} alt={title} className="h-full w-full object-contain p-1.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-white">{title}</div>
        <div className="mt-0.5 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Box size={14} className="opacity-70" /> Qté {qty}
          </span>
          <span className="mx-2 opacity-40">•</span>
          <span>PU {unit}</span>
        </div>
      </div>

      <div className="whitespace-nowrap text-sm font-semibold">{line}</div>

      {a.id && (
        <Link
          href={`/articles/${a.id}`}
          className="ml-2 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs hover:bg-white/10"
          title="Voir l’article"
        >
          Voir <ExternalLink size={14} />
        </Link>
      )}
    </div>
  );
}
