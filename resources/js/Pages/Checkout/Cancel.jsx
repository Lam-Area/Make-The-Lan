import React, { useMemo, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';

export default function Cancel() {
  const { cart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const lineItems = useMemo(
    () =>
      (cart || []).map((item) => ({
        id: item.id,
        title: item.title,
        price: parseFloat(item.price || 0),
        quantity: 1,
        // main_image_url: item.main_image_url ?? undefined,
      })),
    [cart]
  );

  const handleRetry = () => {
    setError('');
    if (!Array.isArray(cart) || cart.length === 0) return;

    setProcessing(true);
    router.post(
      '/checkout',
      { items: lineItems },
      {
        preserveScroll: true,
        onError: () => {
          setProcessing(false);
          setError("Impossible de relancer le paiement.");
        },
        onSuccess: () => setProcessing(false),
        onFinish: () => setProcessing(false),
      }
    );
  };

  const empty = !cart || cart.length === 0;

  return (
    <MainLayout>
      <div className="min-h-[70vh] px-6 py-12 text-white">
        <div className="max-w-2xl mx-auto bg-[#16171A] bg-opacity-95 border border-gray-700 rounded-xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold">Paiement annulé</h1>
          <p className="mt-2 text-gray-300">
            Votre paiement a été annulé. {empty ? "Votre panier est vide." : "Vous pouvez réessayer."}
          </p>

          {error && (
            <div className="mt-4 rounded bg-red-900/40 border border-red-700 text-red-200 px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/panier" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
              Retour au panier
            </Link>
            <Link href="/" className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700">
              Accueil
            </Link>

            {!empty && (
              <button
                onClick={handleRetry}
                disabled={processing}
                className={`px-4 py-2 rounded ${
                  processing
                    ? 'bg-green-800 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {processing ? 'Redirection…' : 'Réessayer le paiement'}
              </button>
            )}
          </div>

          {!empty && (
            <p className="mt-3 text-xs text-gray-400">
              Astuce : vérifiez que les articles sont toujours valides avant de réessayer.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
