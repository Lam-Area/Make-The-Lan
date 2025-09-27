import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';

export default function Success() {
  const { auth, session = {}, sessionId } = usePage().props;
  const { cart, clearCart } = useCart();

  const [finalized, setFinalized] = useState(false);
  const [finalizeError, setFinalizeError] = useState('');
  const fired = useRef(false);

  useEffect(() => {
        const alreadyPaid = session?.payment_status === 'paid';
        const doFinalize = async () => {
            if (fired.current) return;
            fired.current = true;

            if (!auth?.user) {
            try { localStorage.removeItem('cart_items'); } catch {}
            clearCart?.();
            setFinalized(true);
            return;
            }

            if (!Array.isArray(cart) || cart.length === 0) {
            setFinalized(true);
            return;
            }

            try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/checkout/finalize', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token || '',
                'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                session_id: sessionId || '',                 // ✅ requis
                items: cart,                                  // [{id, price, ...}]
                payment_intent: session?.payment_intent || '',
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data?.success) throw new Error(data?.message || 'Finalize failed');

            try { localStorage.removeItem('cart_items'); } catch {}
            clearCart?.();
            setFinalizeError('');
            setFinalized(true);
            } catch (e) {
            // En dernier recours, si Stripe dit paid, on vide quand même le panier local
            if (alreadyPaid) {
                try { localStorage.removeItem('cart_items'); } catch {}
                clearCart?.();
                setFinalized(true);
            } else {
                setFinalizeError("Échec d'enregistrement de l'historique. Paiement OK, mais l'historique n'a pas été mis à jour.");
            }
            }
        };
        doFinalize();
        }, [auth?.user, cart, clearCart, session?.payment_status, session?.payment_intent, sessionId]);

  const paid = session?.payment_status === 'paid';
  const total =
    typeof session?.amount_total === 'number'
      ? new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: (session?.currency || 'eur').toUpperCase(),
        }).format(session.amount_total / 100)
      : '—';

  return (
    <MainLayout>
      <div className="min-h-[70vh] px-6 py-12 text-white">
        <div className="max-w-3xl mx-auto bg-[#16171A] bg-opacity-95 border border-gray-700 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Paiement {paid ? 'réussi' : 'traité'}
              </h1>
              <p className="text-gray-300">
                Merci pour votre achat{auth?.user ? `, ${auth.user.name}` : ''} !
              </p>
            </div>
            <div className="text-3xl">🎉</div>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            <Row label="Statut paiement" value={session?.payment_status ?? '—'} />
            <Row label="Montant total" value={total} />
            <Row label="Session ID" value={sessionId || '—'} mono />
            <Row label="Payment Intent" value={session?.payment_intent || '—'} mono />
          </div>

          <div className="mt-6">
            {!auth?.user ? (
              <p className="text-yellow-300 text-sm">
                Vous n’êtes pas connecté : le paiement est effectué, mais aucun historique n’a été créé.
              </p>
            ) : finalizeError ? (
              <p className="text-red-400 text-sm">{finalizeError}</p>
            ) : finalized ? (
              <p className="text-green-400 text-sm">Historique mis à jour et panier vidé. ✅</p>
            ) : (
              <p className="text-gray-400 text-sm">Finalisation en cours…</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
              Retour à l’accueil
            </Link>
            {auth?.user && (
              <Link href="/profile" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">
                Voir mon historique d’achat
              </Link>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Row({ label, value, mono = false }) {
  return (
    <div className="flex justify-between items-center gap-4 bg-[#0e1012] rounded p-3 border border-gray-700">
      <div className="text-gray-300">{label}</div>
      <div className={`text-white ${mono ? 'font-mono text-xs' : ''}`}>{value}</div>
    </div>
  );
}
