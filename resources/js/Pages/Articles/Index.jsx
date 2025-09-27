import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

function money(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value ?? '';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

export default function Index() {
  const { articles } = usePage().props;

  return (
    <MainLayout>
      <div className="w-full bg-[#1e1e21] text-white py-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4 px-4">
            <h1 className="text-2xl font-bold">Articles</h1>
            <Link
              href="/articles/create"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Ajouter un article
            </Link>
          </div>

          <div className="overflow-x-auto px-4">
            <table className="min-w-full bg-[#272e33] border border-gray-700 rounded shadow text-sm">
              <thead>
                <tr className="bg-[#1e1e21] text-left">
                  <th className="p-3 border border-gray-600">ID</th>
                  <th className="p-3 border border-gray-600">Titre</th>
                  <th className="p-3 border border-gray-600">Marque</th>
                  <th className="p-3 border border-gray-600">Modèle</th>
                  <th className="p-3 border border-gray-600">Catégorie</th>
                  <th className="p-3 border border-gray-600">SKU</th>
                  <th className="p-3 border border-gray-600">Stock</th>
                  <th className="p-3 border border-gray-600">Prix</th>
                  <th className="p-3 border border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-[#2f2f32] transition">
                    <td className="p-3 border border-gray-700">{article.id}</td>
                    <td className="p-3 border border-gray-700">{article.title}</td>
                    <td className="p-3 border border-gray-700">{article.brand || '—'}</td>
                    <td className="p-3 border border-gray-700">{article.model || '—'}</td>
                    <td className="p-3 border border-gray-700">{article.category || '—'}</td>
                    <td className="p-3 border border-gray-700">{article.sku || '—'}</td>
                    <td className="p-3 border border-gray-700">{article.stock_quantity ?? 0}</td>
                    <td className="p-3 border border-gray-700">{money(article.price)}</td>
                    <td className="p-3 border border-gray-700 space-x-2">
                      <Link href={`/articles/${article.id}`} className="text-green-400 hover:underline">Voir</Link>
                      <Link href={`/articles/${article.id}/edit`} className="text-blue-400 hover:underline">Modifier</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
