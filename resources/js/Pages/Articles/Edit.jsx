import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

export default function Edit() {
  const { article, errors } = usePage().props;

  const { data, setData, put, processing } = useForm({
    title: article.title,
    description: article.description,
    price: article.price,
    file_path: article.file_path,
    code_preview: article.code_preview,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/articles/${article.id}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Titre" value={data.title} onChange={val => setData('title', val)} error={errors.title} />
        <Textarea label="Description" value={data.description} onChange={val => setData('description', val)} />
        <Input label="Prix" type="number" step="0.01" value={data.price} onChange={val => setData('price', val)} />
        <Input label="Chemin du fichier" value={data.file_path} onChange={val => setData('file_path', val)} />
        <Input label="Code Preview" value={data.code_preview} onChange={val => setData('code_preview', val)} />

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={processing} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Modifier
          </button>
          <Link href="/articles" className="text-gray-700 hover:underline">Annuler</Link>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", step, error }) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
