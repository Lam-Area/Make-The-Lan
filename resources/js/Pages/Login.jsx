// resources/js/Pages/Login.jsx
import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const [showPwd, setShowPwd] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      onError: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    });
  };

  return (
    <MainLayout>
      <Head title="Connexion" />
      <div className="min-h-screen text-white">
        {/* This wrapper centers the content vertically in the body */}
        <div className="min-h-[calc(100vh-8rem)] flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 lg:py-0">
            {/* Mobile: 1 col (pitch above form). Desktop: 2 cols side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Pitch (kept above the form on mobile) */}
              <div>
                <h1 className="text-4xl font-semibold leading-tight text-emerald-400">
                  Heureux de te revoir
                </h1>
                <p className="mt-3 text-gray-300">
                  Connecte-toi pour accéder à ton panier, ton historique d’achats et tes favoris.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                  <ul className="space-y-3 text-sm text-gray-200">
                    <li>• Connexion sécurisée</li>
                    <li>• Accès rapide à tes commandes</li>
                    <li>
                      • Pas encore de compte ?{' '}
                      <Link href="/register" className="text-blue-400 hover:underline">
                        Inscription
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Glass card with form */}
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-[22px] bg-gradient-to-tr from-white/15 via-transparent to-white/15 blur-sm" />
                <div className="relative rounded-[20px] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
                  <h2 className="text-2xl font-semibold">Connexion</h2>
                  <p className="mt-1 text-sm text-gray-300">
                    Nouveau ici ?{' '}
                    <Link href="/register" className="text-blue-400 hover:underline">
                      Créer un compte
                    </Link>
                  </p>

                  {(errors?.message || errors?.email || errors?.password) && (
                    <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-amber-200 text-sm">
                      {errors.message || errors.email || errors.password}
                    </div>
                  )}

                  <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    {/* Email */}
                    <Field label="Email" icon={<Mail size={18} className="text-gray-400" />}>
                      <input
                        type="email"
                        autoComplete="email"
                        className="w-full bg-transparent outline-none"
                        placeholder="adresse@email.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                      />
                    </Field>

                    {/* Password */}
                    <Field
                      label="Mot de passe"
                      icon={<Lock size={18} className="text-gray-400" />}
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPwd((v) => !v)}
                          className="rounded-md p-1 hover:bg-white/10"
                          aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        >
                          {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      }
                    >
                      <input
                        type={showPwd ? 'text' : 'password'}
                        autoComplete="current-password"
                        className="w-full bg-transparent outline-none"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={processing}
                      className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[.99] disabled:opacity-60"
                    >
                      {processing ? 'Connexion…' : 'Se connecter'}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-sm text-gray-300">
                    Mot de passe oublié ? <span className="opacity-60">Bientôt disponible.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </MainLayout>
  );
}

/* Reusable field with glass + icon */
function Field({ label, icon, trailing, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-300">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur focus-within:border-white/20">
        {icon}
        <div className="flex-1">{children}</div>
        {trailing}
      </div>
    </div>
  );
}
