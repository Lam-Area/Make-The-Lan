// resources/js/Pages/Checkout/Success.jsx
import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useCart } from '@/Context/CartContext';

export default function Success() {
  const { sessionId, session = {}, auth } = usePage().props;
  const { cart, clearCart } = useCart();
  const [finalized, setFinalized] = React.useState(false);
  const [finalizeError, setFinalizeError] = React.useState(null);

  // 🚫 Sans sessionId => on quitte et on va vers /panier
  if (!sessionId) {
    // éviter une boucle : on ne montre rien et on demande une page /panier
    if (typeof window !== 'undefined') {
      router.visit('/panier', { replace: true, preserveState: false });
    }
    return null; // <- rien à afficher
  }

  React.useEffect(() => {
    if (
      session?.payment_status === 'paid' &&
      auth?.user &&
      !finalized
    ) {
      router.post(
        route('checkout.finalize'),
        { session_id: sessionId, items: cart },
        {
          preserveScroll: true,
          onSuccess: () => {
            setFinalized(true);
            setFinalizeError(null);
            clearCart?.();
          },
          onError: () => {
            setFinalizeError('Échec d’enregistrement de l’historique.');
          }
        }
      );
    }
  }, [sessionId, session?.payment_status, auth?.user, finalized, cart]);

  return (
    <MainLayout>
      {/* … ton UI “Paiement traité” … */}
    </MainLayout>
  );
}
