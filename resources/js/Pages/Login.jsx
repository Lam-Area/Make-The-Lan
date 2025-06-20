import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <MainLayout>
    <div className="flex flex-col min-h-screen text-white">
      <Head title="Connexion" />

      <main className="flex-1 flex items-center justify-center">
        <div className="p-8 shadow-md w-full max-w-md bg-opacity-75 bg-[#16171A] rounded">
          <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Entrez votre email"
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-semibold">Mot de passe</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full border rounded px-3 py-2 text-black"
                placeholder="Entrez votre mot de passe"
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-[#2a3740] text-white py-2 rounded hover:bg-[#47525a] transition duration-300"
            >
              Se connecter
            </button>
          </form>
        </div>
      </main>

    </div>
    </MainLayout>
  );
}
