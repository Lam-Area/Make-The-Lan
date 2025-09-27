// resources/js/Pages/Articles/Edit.jsx
import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
  BadgePercent, Tag, Package2, Layers, Hash, DollarSign,
  Images, Info, CheckCircle2, XCircle
} from 'lucide-react';

const CATEGORIES = [
  { value: 'router', label: 'Routeur' },
  { value: 'switch', label: 'Switch' },
  { value: 'access_point', label: 'Point d’accès' },
];

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
    .format(Number(n || 0));

const isValidJson = (s) => {
  if (!s?.trim()) return true;
  try { JSON.parse(s); return true; } catch { return false; }
};

const normalizeImg = (p) => {
  if (!p) return '';
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
  return `/storage/${p}`;
};

export default function Edit() {
  const { article, errors = {} } = usePage().props;

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

  const handleNumber = (key) => (e) => {
    const v = e.target.value;
    setData(key, v === '' ? '' : Number(v));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/articles/${article.id}`);
  };

  const jsonOk = isValidJson(data.specs);
  const imgSrc = normalizeImg(data.main_image_url);
  const specsObj = (() => {
    try { return data.specs ? JSON.parse(data.specs) : null; } catch { return null; }
  })();

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 text-white">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Modifier l’article
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Mets à jour les caractéristiques de l’équipement.
            </p>
          </div>
          <Link
            href="/articles"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            ← Revenir au catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            <Section title="Caractéristiques principales">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Titre" error={errors.title} icon={<Tag size={16} className="opacity-70" />}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Cisco Catalyst 9K, ISR 4K, etc."
                  />
                </Field>

                <Field label="Marque" error={errors.brand} icon={<BadgePercent size={16} className="opacity-70" />}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.brand}
                    onChange={(e) => setData('brand', e.target.value)}
                    placeholder="Cisco"
                  />
                </Field>

                <Field label="Modèle" error={errors.model} icon={<Package2 size={16} className="opacity-70" />}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.model}
                    onChange={(e) => setData('model', e.target.value)}
                    placeholder="ex: C9200L-48P-4X"
                  />
                </Field>

                <Field label="Catégorie" error={errors.category} icon={<Layers size={16} className="opacity-70" />}>
                  <select
                    className="w-full bg-transparent outline-none"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#0b0e10]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="SKU" error={errors.sku} icon={<Hash size={16} className="opacity-70" />}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.sku}
                    onChange={(e) => setData('sku', e.target.value)}
                    placeholder="ex: C9200L-48P-4X-E"
                  />
                </Field>

                <Field label="Prix (€)" error={errors.price} icon={<DollarSign size={16} className="opacity-70" />}>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-transparent outline-none"
                    value={data.price}
                    onChange={handleNumber('price')}
                    placeholder="1999.99"
                  />
                </Field>

                <Field label="Stock" error={errors.stock_quantity} icon={<Layers size={16} className="opacity-70" />}>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-transparent outline-none"
                    value={data.stock_quantity}
                    onChange={handleNumber('stock_quantity')}
                    placeholder="0"
                  />
                </Field>

                <Field label="Image principale (URL)" error={errors.main_image_url} icon={<Images size={16} className="opacity-70" />}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.main_image_url}
                    onChange={(e) => setData('main_image_url', e.target.value)}
                    placeholder="/images/products/catalyst.jpg ou https://..."
                  />
                </Field>
              </div>
            </Section>

            <Section title="Description & Spécifications">
              <Field label="Description" error={errors.description} icon={<Info size={16} className="opacity-70" />}>
                <textarea
                  className="w-full bg-transparent outline-none min-h-28"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Courte présentation et points clés."
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Field
                    label="Spécifications (JSON)"
                    error={errors.specs}
                    icon={jsonOk ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-red-400" />}
                  >
                    <textarea
                      className="w-full bg-transparent outline-none min-h-28 font-mono"
                      value={data.specs}
                      onChange={(e) => setData('specs', e.target.value)}
                      placeholder='{"ports":48,"uplinks":"4x SFP+","os":"IOS XE"}'
                    />
                  </Field>
                  <div className="mt-1 text-xs">
                    {jsonOk ? (
                      <span className="text-emerald-300">JSON valide</span>
                    ) : (
                      <span className="text-red-300">JSON invalide</span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
                  <div className="mb-1 font-medium text-white">Aide</div>
                  <p>Liste de paires clé → valeur. Exemple :</p>
                  <pre className="mt-2 rounded-lg bg-black/30 p-2 text-xs">
{`{
  "ports": 48,
  "uplinks": "4x SFP+",
  "os": "IOS XE"
}`}
                  </pre>
                </div>
              </div>
            </Section>

            <details className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-sm text-gray-300">Champs hérités (optionnels)</summary>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="file_path" error={errors.file_path}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.file_path}
                    onChange={(e) => setData('file_path', e.target.value)}
                  />
                </Field>
                <Field label="code_preview" error={errors.code_preview}>
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={data.code_preview}
                    onChange={(e) => setData('code_preview', e.target.value)}
                  />
                </Field>
              </div>
              <input type="hidden" name="vendeur_id" value={data.vendeur_id} />
            </details>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {processing ? 'Enregistrement…' : 'Enregistrer les modifications'}
              </button>
              <Link
                href={`/articles/${article.id}`}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10"
              >
                Annuler
              </Link>
            </div>
          </form>

          {/* Aperçu */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="mb-3 text-sm text-gray-300">Aperçu</div>

              <div className="overflow-hidden rounded-xl border border-white/10">
                <div className="aspect-[16/9] grid place-items-center bg-black/30">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={data.title || 'Aperçu image'}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="py-10 text-sm text-gray-400">Aucune image</div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-1 text-lg font-semibold">{data.title || '—'}</div>
                  <div className="text-xs text-gray-400">
                    {data.category || '—'} • {data.model || 'modèle'}
                  </div>

                  {data.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-300">{data.description}</p>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-base font-semibold">{fmtEUR(data.price)}</div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
                      Stock : {Number.isFinite(Number(data.stock_quantity)) ? data.stock_quantity : 0}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                *Aperçu visuel — l’affichage réel dépendra de la page produit.
              </p>
            </div>

            {specsObj && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 text-sm text-gray-300">Spécifications (résumé)</div>
                <ul className="space-y-1 text-sm">
                  {Object.entries(specsObj).slice(0, 6).map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-3">
                      <span className="text-gray-300">{k}</span>
                      <span className="text-white/90">{String(v)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}

/* ---------- UI helpers ---------- */
function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, error, icon, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-300">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/5 backdrop-blur focus-within:border-white/20 ${error ? 'border-red-500/40' : 'border-white/10'}`}>
        {icon}
        <div className="flex-1">{children}</div>
      </div>
      {error && <div className="mt-1 text-xs text-amber-300">{error}</div>}
    </div>
  );
}
