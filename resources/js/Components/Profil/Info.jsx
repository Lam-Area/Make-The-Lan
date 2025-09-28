import React, { useEffect, useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { User, Mail, Lock, Upload, Image as ImageIcon, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function InfoSection() {
  const { user } = usePage().props.auth;

  const { data, setData, post, processing, errors, reset } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    avatar: null,
  });

  const [preview, setPreview] = useState('/images/mainpdp.png');
  const [showPwd, setShowPwd] = useState(false);
  const fileRef = useRef(null);

  const onChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setData(name, files?.[0] ?? null);
    } else {
      setData(name, value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post('/profile/info?_method=PUT', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => reset('password'),
    });
  };

  useEffect(() => {
    if (data.avatar instanceof File) {
      const url = URL.createObjectURL(data.avatar);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof user?.avatar === 'string' && user.avatar) {
      setPreview(`/storage/${user.avatar}`);
    } else {
      setPreview('/images/mainpdp.png');
    }
  }, [data.avatar, user?.avatar]);

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-white">
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-[22px] bg-gradient-to-tr from-white/15 via-transparent to-white/15 blur-sm" />
        <div className="relative rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h3 className="text-lg font-semibold">Photo de profil</h3>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-[#0b0e10]">
                {preview ? (
                  <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-gray-400">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-300 leading-5">
                PNG/JPG • max ~2 Mo (recommandé) <br />
                Astuce : vise un cadrage carré pour un rendu net.
              </div>
            </div>

            <div className="sm:ml-auto">
              <input
                ref={fileRef}
                type="file"
                name="avatar"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                <Upload size={16} /> Choisir une image
              </button>
            </div>
          </div>

          {errors.avatar && (
            <p className="mt-2 text-xs text-amber-300" aria-live="polite">{errors.avatar}</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <h3 className="text-lg font-semibold">Informations personnelles</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nom" error={errors.name} icon={<User size={18} className="text-gray-400" />}>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChange}
              autoComplete="name"
              className="w-full bg-transparent outline-none"
              placeholder="Nom et prénom"
            />
          </Field>

          <Field label="Email" error={errors.email} icon={<Mail size={18} className="text-gray-400" />}>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              autoComplete="email"
              className="w-full bg-transparent outline-none"
              placeholder="adresse@email.com"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field
              label="Mot de passe (laisser vide pour ne pas changer)"
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
                name="password"
                value={data.password}
                onChange={onChange}
                autoComplete="new-password"
                className="w-full bg-transparent outline-none"
                placeholder="Au moins 8 caractères"
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[.99] disabled:opacity-60"
          >
            {processing ? <Loader2 className="animate-spin" size={16} /> : null}
            Enregistrer
          </button>

          <button
            type="button"
            onClick={() => reset('password')}
            className="text-sm text-gray-300 hover:underline"
          >
            Effacer le mot de passe saisi
          </button>
        </div>
      </div>
    </form>
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
      {error && <div className="mt-1 text-xs text-amber-300" aria-live="polite">{error}</div>}
    </div>
  );
}
