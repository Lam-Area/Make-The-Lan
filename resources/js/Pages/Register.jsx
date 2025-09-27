// resources/js/Pages/Register.jsx
import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',          // forcé côté client
    acceptCookies: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.acceptCookies) return alert('Vous devez accepter les cookies pour vous inscrire.');
    post('/register');
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen text-white">
        <Head title="Créer un compte" />

        <main className="flex-1 flex items-center justify-center">
          <div className="p-8 rounded-lg w-full max-w-md bg-[#16171A] bg-opacity-75 shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

            {/* Champ caché role=user */}
            <input type="hidden" name="role" value={data.role} />

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700"
                  placeholder="Entrez votre nom"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700"
                  placeholder="Entrez votre email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700"
                  placeholder="Entrez votre mot de passe"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700"
                  placeholder="Confirmez votre mot de passe"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={data.acceptCookies}
                  onChange={(e) => setData('acceptCookies', e.target.checked)}
                  className="mr-2"
                />
                <span>J'accepte que mes actions soient enregistrées via les cookies.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2a3740] text-white py-2 rounded hover:bg-[#47525a] duration-300 ease-in-out"
                disabled={processing}
              >
                S'inscrire
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Déjà un compte ? <Link href="/login" className="text-blue-600 hover:underline">Se connecter</Link>
            </p>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
