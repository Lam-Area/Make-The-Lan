import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ orders, articles }) {
  const { data, setData, post, processing, errors } = useForm({
    order_id: '',
    article_id: '',
    price_at_purchase: '',
    created_at: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/orderitems');
  };

  return (
    <div className="p-6">
      <Head title="Ajouter un article à une commande" />
      <h1 className="text-2xl font-bold mb-4">Nouvel article commandé</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Commande</label>
          <select
            value={data.order_id}
            onChange={(e) => setData('order_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner une commande --</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                #{order.id} (utilisateur ID: {order.user_id})
              </option>
            ))}
          </select>
          {errors.order_id && <div className="text-red-500 text-sm">{errors.order_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Article</label>
          <select
            value={data.article_id}
            onChange={(e) => setData('article_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Sélectionner un article --</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.title}
              </option>
            ))}
          </select>
          {errors.article_id && <div className="text-red-500 text-sm">{errors.article_id}</div>}
        </div>

        <div>
          <label className="block mb-1">Prix à l’achat (€)</label>
          <input
            type="number"
            step="0.01"
            value={data.price_at_purchase}
            onChange={(e) => setData('price_at_purchase', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price_at_purchase && <div className="text-red-500 text-sm">{errors.price_at_purchase}</div>}
        </div>

        <div>
          <label className="block mb-1">Date d’ajout</label>
          <input
            type="datetime-local"
            value={data.created_at}
            onChange={(e) => setData('created_at', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.created_at && <div className="text-red-500 text-sm">{errors.created_at}</div>}
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
          <Link href="/orderitems" className="text-gray-600 underline hover:text-black">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
