import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';


const strengthOf = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};
const strengthLabel = ['Très faible', 'Faible', 'Moyenne', 'Bonne', 'Excellente'];

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
    acceptCookies: false,
  });

  const [showPwd, setShowPwd] = React.useState(false);
  const [showPwd2, setShowPwd2] = React.useState(false);
  const [clientError, setClientError] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setClientError('');

    if (!data.acceptCookies) {
      setClientError('Vous devez accepter l’utilisation des cookies pour créer un compte.');
      return;
    }
    if (data.password !== data.password_confirmation) {
      setClientError('Les mots de passe ne correspondent pas.');
      return;
    }

    post('/register', {
      onError: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    });
  };

  const s = strengthOf(data.password);

  return (
    <MainLayout>
      <Head title="Créer un compte" />

      <div className="min-h-screen text-white">

        <div className="min-h-[calc(100vh-8rem)] flex items-center">

          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 lg:py-0">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-semibold leading-tight">
                  Rejoins <span className="text-emerald-400">Make The Lan</span>
                </h1>
                <p className="mt-3 text-gray-300">
                  Crée un compte pour gérer tes achats, ton panier et tes favoris. Tu pourras aussi
                  recevoir des actualités produit.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                  <ul className="space-y-3 text-sm text-gray-200">
                    <li>• Paiements sécurisés</li>
                    <li>• Historique d’achats et factures</li>
                    <li>• Support & communauté</li>
                  </ul>
                </div>
              </div>


              <div className="relative">
                <div className="absolute -inset-0.5 rounded-[22px] bg-gradient-to-tr from-white/15 via-transparent to-white/15 blur-sm" />
                <div className="relative rounded-[20px] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
                  <h2 className="text-2xl font-semibold">Créer un compte</h2>
                  <p className="mt-1 text-sm text-gray-300">
                    Déjà un compte ?{' '}
                    <Link className="text-blue-400 hover:underline" href="/login">
                      Se connecter
                    </Link>
                  </p>


                  <input type="hidden" name="role" value={data.role} />


                  {(clientError || errors?.message) && (
                    <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-amber-200 text-sm">
                      {clientError || errors.message}
                    </div>
                  )}

                  <form onSubmit={onSubmit} className="mt-6 space-y-4">

                    <Field
                      label="Nom"
                      error={errors.name}
                      icon={<User size={18} className="text-gray-400" />}
                    >
                      <input
                        type="text"
                        autoComplete="name"
                        className="w-full bg-transparent outline-none"
                        placeholder="Nom et prénom"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                      />
                    </Field>


                    <Field
                      label="Email"
                      error={errors.email}
                      icon={<Mail size={18} className="text-gray-400" />}
                    >
                      <input
                        type="email"
                        autoComplete="email"
                        className="w-full bg-transparent outline-none"
                        placeholder="adresse@email.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                      />
                    </Field>


                    <Field
                      label="Mot de passe"
                      error={errors.password}
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
                        autoComplete="new-password"
                        className="w-full bg-transparent outline-none"
                        placeholder="Au moins 8 caractères"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                      />
                    </Field>


                    <div className="mt-1">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded ${i < s ? 'bg-emerald-400' : 'bg-white/15'}`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Force : {strengthLabel[s] || strengthLabel[0]}
                      </div>
                    </div>


                    <Field
                      label="Confirmer le mot de passe"
                      icon={<Lock size={18} className="text-gray-400" />}
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPwd2((v) => !v)}
                          className="rounded-md p-1 hover:bg-white/10"
                          aria-label={showPwd2 ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                        >
                          {showPwd2 ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      }
                    >
                      <input
                        type={showPwd2 ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="w-full bg-transparent outline-none"
                        placeholder="Retape ton mot de passe"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                      />
                    </Field>


                    <label className="mt-3 flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={data.acceptCookies}
                        onChange={(e) => setData('acceptCookies', e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-500"
                      />
                      <span className="text-gray-300">
                        J’accepte l’utilisation des cookies. Voir{' '}
                        <Link href="/legal" className="text-blue-400 hover:underline">
                          Informations légales
                        </Link>{' '}
                        et{' '}
                        <Link href="/terms" className="text-blue-400 hover:underline">
                          conditions générales
                        </Link>
                        .
                      </span>
                    </label>


                    <button
                      type="submit"
                      disabled={processing}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[.99] disabled:opacity-60"
                    >
                      {processing ? 'Inscription…' : 'Créer mon compte'}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-sm text-gray-300">
                    Déjà un compte ?{' '}
                    <Link href="/login" className="text-blue-400 hover:underline">
                      Se connecter
                    </Link>
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


function Field({ label, error, icon, trailing, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-300">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur focus-within:border-white/20">
        {icon}
        <div className="flex-1">{children}</div>
        {trailing}
      </div>
      {error && <div className="mt-1 text-xs text-amber-300">{error}</div>}
    </div>
  );
}
