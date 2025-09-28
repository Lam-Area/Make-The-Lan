import React, { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { User as UserIcon, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";

export default function Edit({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "user",
  });

  const [showPwd, setShowPwd] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    put(`/users/${user.id}`);
  };

  return (
    <MainLayout>
      <Head title={`Modifier ${user?.name ?? "un utilisateur"}`} />

      <div className="min-h-screen text-white">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Modifier l’utilisateur
              </h1>
              <p className="text-sm text-gray-300">ID #{user?.id}</p>
            </div>

            <Link
              href="/users"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              ← Retour
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative lg:col-span-2">
              <div className="absolute -inset-0.5 rounded-[22px] bg-gradient-to-tr from-white/15 via-transparent to-white/15 blur-sm" />
              <form
                onSubmit={submit}
                className="relative rounded-[20px] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur space-y-5"
              >
                <Field label="Nom" error={errors.name} icon={<UserIcon size={18} className="text-gray-400" />}>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="Nom prénom"
                    autoComplete="name"
                  />
                </Field>

                <Field label="Email" error={errors.email} icon={<Mail size={18} className="text-gray-400" />}>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="adresse@email.com"
                    autoComplete="email"
                  />
                </Field>

                <Field label="Mot de passe (laisser vide pour ne pas changer)" error={errors.password} icon={<Lock size={18} className="text-gray-400" />}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      className="rounded-md p-1 hover:bg-white/10"
                      aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                >
                  <input
                    type={showPwd ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="Nouveau mot de passe"
                    autoComplete="new-password"
                  />
                </Field>

                <div>
                  <label className="mb-1 block text-sm text-gray-300">Rôle</label>
                  <div className="inline-flex overflow-hidden rounded-xl border border-white/10">
                    {[
                      { v: "user", label: "Utilisateur" },
                      { v: "vendeur", label: "Vendeur" },
                      { v: "admin", label: "Admin" },
                    ].map((opt) => (
                      <button
                        key={opt.v}
                        type="button"
                        onClick={() => setData("role", opt.v)}
                        className={`inline-flex items-center gap-2 px-3 py-2 text-sm transition ${
                          data.role === opt.v
                            ? "bg-white/15 text-white"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <Shield size={14} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.role && (
                    <div className="mt-1 text-xs text-amber-300">{errors.role}</div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[.99] disabled:opacity-60"
                  >
                    Mettre à jour
                  </button>
                  <Link
                    href="/users"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                  >
                    Annuler
                  </Link>
                </div>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-base font-semibold ring-1 ring-white/20">
                    {(user?.name || "?")
                      .split(" ")
                      .map((w) => w[0]?.toUpperCase())
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-300 break-all">{user?.email}</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Rôle actuel :</span>{" "}
                    <span className="capitalize">{user?.role}</span>
                  </p>
                  {user?.created_at && (
                    <p className="mt-1 text-gray-400">
                      Créé le {new Date(user.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
                <div className="text-sm text-red-200 mb-3 font-medium">
                  Zone sensible
                </div>
                <Link
                  href={`/users/${user?.id}`}
                  method="delete"
                  as="button"
                  onClick={(e) => {
                    if (!confirm("Confirmer la suppression de cet utilisateur ?")) {
                      e.preventDefault();
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600/90 px-3 py-2 text-sm font-medium hover:bg-red-600"
                >
                  Supprimer l’utilisateur
                </Link>
              </div>
            </aside>
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
