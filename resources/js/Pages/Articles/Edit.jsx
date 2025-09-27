import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

const CATEGORIES = [
  { value: 'router', label: 'Routeur' },
  { value: 'switch', label: 'Switch' },
  { value: 'access_point', label: 'Point d’accès' },
];

export default function Edit() {
  const { article, errors } = usePage().props;

  const { data, setData, put, processing } = useForm({
    title: article.title || '',
    brand: article.brand || 'Cisco',
    model: article.model || '',
    category: article.category || 'switch',
    sku: article.sku || '',
    price: article.price ?? '',
    stock_quantity: article.stock_quantity ?? 0,
    main_image_url: article.main_image_url || '',
    description: article.description || '',
    specs: typeof article.specs === 'object' && article.specs !== null
      ? JSON.stringify(article.specs)
      : (article.specs || ''),

    // hérités (optionnels)
    file_path: article.file_path || '',
    code_preview: article.code_preview || '',
    vendeur_id: article.vendeur_id || '',
  });

  const setNumber = (key) => (e) => setData(key, e.target.value === '' ? '' : Number(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/articles/${article.id}`);
  };

  return (
    <div className="min-h-screen bg-[#1e1e21]">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl text-white font-bold mb-6">Modifier l'article</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Titre" error={errors.title}>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full border p-2 rounded"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Marque" error={errors.brand}>
              <input
                type="text"
                value={data.brand}
                onChange={(e) => setData('brand', e.target.value)}
                className="w-full border p-2 rounded"
              />
            </Field>

            <Field label="Modèle" error={errors.model}>
              <input
                type="text"
                value={data.model}
                onChange={(e) => setData('model', e.target.value)}
                className="w-full border p-2 rounded"
              />
            </Field>

            <Field label="Catégorie" error={errors.category}>
              <select
                value={data.category}
                onChange={(e) => setData('category', e.target.value)}
                className="w-full border p-2 rounded"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="SKU" error={errors.sku}>
              <input
                type="text"
                value={data.sku}
                onChange={(e) => setData('sku', e.target.value)}
                className="w-full border p-2 rounded"
              />
            </Field>

            <Field label="Prix (€)" error={errors.price}>
              <input
                type="number"
                step="0.01"
                value={data.price}
                onChange={setNumber('price')}
                className="w-full border p-2 rounded"
              />
            </Field>

            <Field label="Stock" error={errors.stock_quantity}>
              <input
                type="number"
                min="0"
                value={data.stock_quantity}
                onChange={setNumber('stock_quantity')}
                className="w-full border p-2 rounded"
              />
            </Field>
          </div>

          <Field label="Image principale (URL)" error={errors.main_image_url}>
            <input
              type="text"
              value={data.main_image_url}
              onChange={(e) => setData('main_image_url', e.target.value)}
              className="w-full border p-2 rounded"
            />
          </Field>

          <Field label="Description" error={errors.description}>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="w-full border p-2 rounded min-h-28"
            />
          </Field>

          <Field label="Spécifications (JSON)" error={errors.specs}>
            <textarea
              value={data.specs}
              onChange={(e) => setData('specs', e.target.value)}
              className="w-full border p-2 rounded font-mono min-h-28"
            />
          </Field>

          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-gray-300">Champs hérités (optionnels)</summary>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="file_path" error={errors.file_path}>
                <input
                  type="text"
                  value={data.file_path}
                  onChange={(e) => setData('file_path', e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </Field>
              <Field label="code_preview" error={errors.code_preview}>
                <input
                  type="text"
                  value={data.code_preview}
                  onChange={(e) => setData('code_preview', e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </Field>
            </div>
          </details>

          <input type="hidden" name="vendeur_id" value={data.vendeur_id} />

          <div className="flex items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Modifier
            </button>
            <Link href="/articles" className="text-gray-300 hover:underline">Annuler</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-white font-medium mb-1">{label}</label>
      {children}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
