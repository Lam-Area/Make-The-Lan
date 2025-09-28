import React, { useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Plus, Search, Shield, Users as UsersIcon } from "lucide-react";

export default function UsersIndex({ users }) {
  const { props } = usePage();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");

  const rows = Array.isArray(users?.data) ? users.data : [];

  const filtered = useMemo(() => {
    return rows.filter((u) => {
      const matchQ =
        !q ||
        (u.name ?? "").toLowerCase().includes(q.toLowerCase()) ||
        (u.email ?? "").toLowerCase().includes(q.toLowerCase());
      const matchRole = role === "all" || (u.role ?? "") === role;
      return matchQ && matchRole;
    });
  }, [rows, q, role]);

  const total = rows.length;
  const counts = useMemo(
    () => ({
      user: rows.filter((x) => x.role === "user").length,
      vendeur: rows.filter((x) => x.role === "vendeur").length,
      admin: rows.filter((x) => x.role === "admin").length,
    }),
    [rows]
  );

  return (
    <MainLayout>
      <Head title="Utilisateurs" />
      <div className="min-h-screen text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
                <UsersIcon size={22} className="opacity-80" />
                Utilisateurs
              </h1>
              <p className="text-sm text-gray-300">
                Gérez les comptes et rôles des membres.
              </p>
            </div>

            <Link
              href="/users/create"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium hover:bg-emerald-700 active:scale-[.99]"
            >
              <Plus size={16} /> Ajouter un utilisateur
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-sm text-gray-300">Total</div>
              <div className="mt-1 text-2xl font-semibold">{total}</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <BadgeCount label="Users" value={counts.user} />
                <BadgeCount label="Vendeurs" value={counts.vendeur} />
                <BadgeCount label="Admins" value={counts.admin} />
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <label className="mb-2 block text-sm text-gray-300">
                Recherche
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Nom ou email…"
                  className="w-full rounded-xl border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <label className="mb-2 block text-sm text-gray-300">Rôle</label>
              <div className="inline-flex overflow-hidden rounded-xl border border-white/10">
                {[
                  { v: "all", label: "Tous" },
                  { v: "user", label: "User" },
                  { v: "vendeur", label: "Vendeur" },
                  { v: "admin", label: "Admin" },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
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

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-300">
                  <Th>ID</Th>
                  <Th>Utilisateur</Th>
                  <Th>Email</Th>
                  <Th>Rôle</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-300"
                    >
                      Aucun résultat pour cette recherche.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <Td>{u.id}</Td>
                      <Td>
                        <div className="flex items-center gap-3">
                          <AvatarCell user={u} />
                          <div className="leading-tight">
                            <div className="font-medium">{u.name}</div>
                            {u.created_at && (
                              <div className="text-xs text-gray-400">
                                Depuis{" "}
                                {new Date(u.created_at).toLocaleDateString(
                                  "fr-FR"
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <span className="break-all text-gray-200">
                          {u.email}
                        </span>
                      </Td>
                      <Td>
                        <RoleBadge role={u.role} />
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/users/${u.id}/edit`}
                            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                          >
                            Modifier
                          </Link>
                          <Link
                            href={`/users/${u.id}`}
                            method="delete"
                            as="button"
                            onClick={(e) => {
                              if (
                                !confirm(
                                  "Confirmer la suppression de cet utilisateur ?"
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                            className="rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                          >
                            Supprimer
                          </Link>
                        </div>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-gray-300">
              Page {users?.current_page} / {users?.last_page}
            </div>
            <Pagination users={users} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3">{children}</th>;
}
function Td({ children }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}

function BadgeCount({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-center">
      <div className="text-gray-400">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function AvatarCell({ user }) {
  const src = user?.avatar ? `/storage/${user.avatar}` : null;
  const initials = (user?.name || "?")
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  return src ? (
    <img
      src={src}
      alt={user?.name}
      className="h-9 w-9 rounded-full border border-white/10 object-cover"
    />
  ) : (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-medium">
      {initials}
    </div>
  );
}

function RoleBadge({ role }) {
  const map = {
    admin:
      "bg-pink-500/15 text-pink-200 ring-1 ring-pink-300/30",
    vendeur:
      "bg-amber-500/15 text-amber-200 ring-1 ring-amber-300/30",
    user:
      "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-300/30",
  };
  const cls = map[role] || "bg-white/10 text-gray-200 ring-1 ring-white/20";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${cls}`}>
      <Shield size={12} /> <span className="capitalize">{role || "—"}</span>
    </span>
  );
}

function Pagination({ users }) {
  const links = users?.links;
  if (Array.isArray(links) && links.length) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {links.map((l, i) => {
          const label = l.label
            .replace("&laquo;", "«")
            .replace("&raquo;", "»");
        return l.url ? (
            <Link
              key={i}
              href={l.url}
              preserveScroll
              className={`rounded-lg border border-white/10 px-2.5 py-1.5 text-sm hover:bg-white/10 ${
                l.active ? "bg-white/15" : "bg-white/5"
              }`}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          ) : (
            <span
              key={i}
              className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-sm text-gray-400"
              dangerouslySetInnerHTML={{ __html: label }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {users?.prev_page_url && (
        <Link
          href={users.prev_page_url}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          ← Précédent
        </Link>
      )}
      {users?.next_page_url && (
        <Link
          href={users.next_page_url}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Suivant →
        </Link>
      )}
    </div>
  );
}
