import React from "react";
import { Link } from "@inertiajs/react";
import {
  Search,
  ShieldCheck,
  Pencil,
  Trash2,
  Mail,
  User2,
} from "lucide-react";

const roleBadge = (role) => {
  switch (role) {
    case "admin":
      return "bg-red-500/15 text-red-300 ring-red-500/30";
    case "vendeur":
      return "bg-amber-500/15 text-amber-300 ring-amber-500/30";
    default:
      return "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30";
  }
};

const Initials = ({ name = "" }) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-sm font-semibold ring-1 ring-white/20">
      {initials || "?"}
    </div>
  );
};

export default function UserList({ users = [] }) {
  const [q, setQ] = React.useState("");
  const [role, setRole] = React.useState("all");

  const isValid = Array.isArray(users);

  const filtered = React.useMemo(() => {
    if (!isValid) return [];
    const query = q.trim().toLowerCase();
    return users
      .filter((u) => (role === "all" ? true : u.role === role))
      .filter((u) =>
        !query
          ? true
          : [u.name, u.email, u.role, String(u.id)]
              .filter(Boolean)
              .some((v) => v.toLowerCase().includes(query))
      );
  }, [users, q, role, isValid]);

  if (!isValid) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        Données utilisateurs introuvables. Vérifiez les props passées à
        <code className="mx-1 rounded bg-black/30 px-1 py-0.5">{"<UserList />"}</code>.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Liste des utilisateurs
          </h2>
          <p className="text-sm text-gray-300">
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""} •{" "}
            {users.length} au total
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
          <label className="relative inline-flex w-full items-center sm:w-72">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher (nom, email, rôle)…"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
            />
          </label>

          <div className="inline-flex overflow-hidden rounded-xl border border-white/10">
            {[
              { v: "all", label: "Tous" },
              { v: "admin", label: "Admin" },
              { v: "vendeur", label: "Vendeur" },
              { v: "user", label: "Client" },
            ].map((opt) => (
              <button
                key={opt.v}
                onClick={() => setRole(opt.v)}
                className={`px-3 py-2 text-sm transition ${
                  role === opt.v
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="px-3 py-2 font-medium">Utilisateur</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Rôle</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-gray-400">
                    Aucun résultat pour cette recherche.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Initials name={u.name} />
                        <div>
                          <div className="font-medium text-white">{u.name}</div>
                          <div className="text-xs text-gray-400">#{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 text-gray-200">
                        <Mail size={14} className="opacity-70" />
                        <span className="break-all">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${roleBadge(
                          u.role
                        )}`}
                      >
                        <ShieldCheck size={12} />
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/users/${u.id}/edit`}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                        >
                          <Pencil size={14} />
                          Modifier
                        </Link>
                        <Link
                          href={`/users/${u.id}`}
                          method="delete"
                          as="button"
                          onClick={(e) => {
                            if (!confirm("Confirmer la suppression ?"))
                              e.preventDefault();
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                        >
                          <Trash2 size={14} />
                          Supprimer
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:hidden">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-gray-300">
              Aucun résultat pour cette recherche.
            </div>
          ) : (
            filtered.map((u) => (
              <div
                key={u.id}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center gap-3">
                  <Initials name={u.name} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-white">{u.name}</div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ring-1 ${roleBadge(
                          u.role
                        )}`}
                      >
                        <ShieldCheck size={12} />
                        {u.role}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-300">
                      <User2 size={12} className="opacity-70" />
                      <span>#{u.id}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-300 break-all">
                      <Mail size={12} className="opacity-70" />
                      <span>{u.email}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-end gap-2">
                  <Link
                    href={`/users/${u.id}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                  >
                    <Pencil size={14} />
                    Modifier
                  </Link>
                  <Link
                    href={`/users/${u.id}`}
                    method="delete"
                    as="button"
                    onClick={(e) => {
                      if (!confirm("Confirmer la suppression ?"))
                        e.preventDefault();
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                    Supprimer
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
