import { usePage } from '@inertiajs/react';

export default function OrderHistorySection() {
  const { orders = [] } = usePage().props;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Historique d’achat</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 italic">Aucun achat effectué.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col p-4 rounded shadow-sm bg-[#272e33] bg-opacity-25 hover:bg-gray-700 transition"
            >
              <div className="flex justify-between">
                <p className="font-medium text-lg">Commande #{order.id}</p>
                <p className="text-sm text-gray-400">
                  {new Date(order.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="mt-2 space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.article?.title ?? 'Article inconnu'}</span>
                    <span>{item.price_at_purchase.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right font-semibold">
                Total : {order.total_price.toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
