// resources/js/Pages/Articles/Create.jsx
import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';           // ⬅️ import du layout
import {
  ArrowLeft, Save, Image as ImageIcon, FileJson, Tag, Type, Hash, Layers,
  DollarSign, Package, Building, Info, CheckCircle2, AlertTriangle
} from 'lucide-react';

const CATEGORIES = [
  { value: 'router', label: 'Routeur' },
  { value: 'switch', label: 'Switch' },
  { value: 'access_point', label: 'Point d’accès' },
];

const fmtEUR = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
    .format(Number(n || 0));

export default function Create() {
  const { errors, auth } = usePage().props;
  const vendeurId = auth?.user?.id || '';

  const { data, setData, post, processing } = useForm({
    title: '',
    brand: 'Cisco',
    model: '',
    category: 'switch',
    sku: '',
    price: '',
    stock_quantity: 0,
    main_image_url: '',
    description: '',
    specs: '',
    vendeur_id: vendeurId,
  });

  const [specOk, setSpecOk] = React.useState(true);
  const [specMsg, setSpecMsg] = React.useState('');
  const [imgOk, setImgOk] = React.useState(true);

  const setNumber = (key) => (e) =>
    setData(key, e.target.value === '' ? '' : Number(e.target.value));
  const setUpper = (key) => (e) => setData(key, e.target.value.toUpperCase());

  React.useEffect(() => {
    if (!data.specs) { setSpecOk(true); setSpecMsg('Aucune donnée – facultatif.'); return; }
    try {
      const parsed = JSON.parse(data.specs);
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        setSpecOk(false); setSpecMsg('Le JSON doit décrire un objet (clé → valeur).');
      } else { setSpecOk(true); setSpecMsg('JSON valide.'); }
    } catch (e) { setSpecOk(false); setSpecMsg('JSON invalide : ' + e.message); }
  }, [data.specs]);

  const imgSrc = React.useMemo(() => {
    const p = data.main_image_url;
    if (!p) return '/images/product-placeholder.png';
    if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
    return `/storage/${p}`;
  }, [data.main_image_url]);

  const insertSpecTemplate = () => {
    setData('specs', JSON.stringify({ ports: 48, uplinks: '4x SFP+', os: 'IOS XE', stack: 'StackWise' }, null, 2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specOk) return;
    post('/articles');
  };

  return (
    <MainLayout> {/* ⬅️ le fond & le header/footer viennent d’ici */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 text-white">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Créer un article</h1>
            <p className="mt-1 text-sm text-gray-300">Renseigne les caractéristiques principales de l’équipement.</p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Retour
          </Link>
        </div>

        {/* Form + Preview */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            <Section title="Informations produit">
              <Field label="Titre" error={errors.title} icon={<Type size={16} />}>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  placeholder="Cisco Catalyst 9K, ISR 4K, etc."
                  className="w-full bg-transparent outline-none"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Marque" error={errors.brand} icon={<Building size={16} />}>
                  <input
                    type="text"
                    value={data.brand}
                    onChange={(e) => setData('brand', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
                <Field label="Modèle" error={errors.model} icon={<Tag size={16} />}>
                  <input
                    type="text"
                    value={data.model}
                    onChange={(e) => setData('model', e.target.value)}
                    placeholder="ex: C9200L-48P-4X"
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
                <Field label="Catégorie" error={errors.category} icon={<Layers size={16} />}>
                  <select
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option className='text-black' key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="SKU" error={errors.sku} icon={<Hash size={16} />}>
                  <input
                    type="text"
                    value={data.sku}
                    onChange={setUpper('sku')}
                    placeholder="C9200L-48P-4X-E"
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
                <Field label="Prix (€)" error={errors.price} icon={<DollarSign size={16} />}>
                  <input
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={setNumber('price')}
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
                <Field label="Stock" error={errors.stock_quantity} icon={<Package size={16} />}>
                  <input
                    type="number"
                    min="0"
                    value={data.stock_quantity}
                    onChange={setNumber('stock_quantity')}
                    className="w-full bg-transparent outline-none"
                  />
                </Field>
              </div>

              <Field label="Image principale (URL ou /storage/...)" error={errors.main_image_url} icon={<ImageIcon size={16} />}>
                <input
                  type="text"
                  value={data.main_image_url}
                  onChange={(e) => setData('main_image_url', e.target.value)}
                  placeholder="/images/products/catalyst.jpg"
                  className="w-full bg-transparent outline-none"
                  onBlur={() => setImgOk(true)}
                />
              </Field>

              <Field label="Description" error={errors.description} icon={<Info size={16} />}>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Courte présentation et points clés."
                  className="w-full bg-transparent outline-none min-h-28"
                />
              </Field>
            </Section>

            <Section title="Spécifications (JSON)">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <FileJson size={16} />
                    <span className={specOk ? 'text-emerald-300' : 'text-amber-300'}>
                      {specOk ? 'JSON valide' : 'JSON invalide'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={insertSpecTemplate}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs hover:bg-white/10"
                  >
                    Insérer un exemple
                  </button>
                </div>
                <textarea
                  value={data.specs}
                  onChange={(e) => setData('specs', e.target.value)}
                  placeholder='{"ports":48,"uplinks":"4x SFP+","os":"IOS XE"}'
                  className="w-full bg-transparent outline-none font-mono min-h-40"
                />
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                  {specOk ? <CheckCircle2 size={14} className="text-emerald-400" /> : <AlertTriangle size={14} className="text-amber-400" />}
                  {specMsg}
                </div>
                {errors.specs && <div className="mt-2 text-sm text-amber-300">{errors.specs}</div>}
              </div>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-gray-300">Champs hérités (optionnels)</summary>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="file_path" error={errors.file_path}>
                    <input
                      type="text"
                      value={data.file_path || ''}
                      onChange={(e) => setData('file_path', e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  </Field>
                  <Field label="code_preview" error={errors.code_preview}>
                    <input
                      type="text"
                      value={data.code_preview || ''}
                      onChange={(e) => setData('code_preview', e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  </Field>
                </div>
              </details>
            </Section>

            <input type="hidden" name="vendeur_id" value={data.vendeur_id} />

            <div className="sticky bottom-4 z-10 mt-6 flex items-center justify-end gap-3">
              <Link
                href="/articles"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={processing || !specOk}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
              >
                <Save size={16} /> {processing ? 'Création…' : 'Créer'}
              </button>
            </div>
          </div>

          {/* RIGHT: apercu */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                <img
                  src={imgSrc}
                  alt="Aperçu"
                  className="h-full w-full object-contain bg-black/30"
                  onError={() => setImgOk(false)}
                  onLoad={() => setImgOk(true)}
                />
                {!imgOk && (
                  <div className="absolute inset-0 grid place-items-center bg-black/40 text-xs text-amber-200">
                    Impossible de charger l’image (URL invalide ?)
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-400">
                  {data.category || 'catégorie'} • {data.model || 'modèle'}
                </div>
                <h3 className="mt-1 line-clamp-2 text-lg font-semibold">
                  {data.title || 'Titre du produit'}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-300">
                  {data.description || 'Brève description de l’équipement.'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                    {data.price ? fmtEUR(data.price) : '—'}
                  </div>
                  <div className="text-xs text-gray-400">
                    Stock : {data.stock_quantity || 0}
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 text-[11px] text-gray-400">
                *Aperçu visuel — l’affichage réel dépendra de la page produit.
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

/* UI bits */
function Section({ title, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, error, icon, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-300">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-white/20">
        {icon ? <span className="shrink-0 text-gray-400">{icon}</span> : null}
        <div className="flex-1">{children}</div>
      </div>
      {error ? <div className="mt-1 text-xs text-amber-300">{error}</div> : null}
    </div>
  );
}
