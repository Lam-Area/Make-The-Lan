import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { Search, Filter, Trash2, Globe, Clock, Activity, User as UserIcon } from "lucide-react";

export default function UserLogs({ logs }) {
  const rows = Array.isArray(logs) ? logs : [];

  const [q, setQ] = useState("");
  const [action, setAction] = useState("all");
  const [limit, setLimit] = useState(10);

  const actions = useMemo(() => {
    const set = new Set(rows.map((l) => l.action).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = [...rows];

    if (needle) {
      out = out.filter((l) =>
        [l.user?.name, l.user?.email, l.action, l.ip_address]
          .filter(Boolean)
          .some((s) => String(s).toLowerCase().includes(needle))
      );
    }
    if (action !== "all") {
      out = out.filter((l) => l.action === action);
    }
    out.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return out;
  }, [rows, q, action]);

  const visible = filtered.slice(0, limit);

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Logs des utilisateurs</h2>
          <p className="text-sm text-gray-300">Suivi des actions, connexions et événements.</p>
        </div>
        <div className="text-sm text-gray-300">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <label className="mb-1 block text-xs text-gray-400">Recherche</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLimit(10);
              }}
              placeholder="Nom, email, IP, action…"
              className="w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <label className="mb-1 block text-xs text-gray-400">Action</label>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={action}
              onChange={(e) => {
                setAction(e.target.value);
                setLimit(10);
              }}
              className="w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 py-2 text-sm outline-none focus:border-white/20"
            >
              {actions.map((a) => (
                <option className="text-black" key={a} value={a}>
                  {a === "all" ? "Toutes" : a}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setQ("");
              setAction("all");
              setLimit(10);
            }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-300">
              <Th>Utilisateur</Th>
              <Th>Action</Th>
              <Th className="hidden sm:table-cell">IP</Th>
              <Th>Date</Th>
              <Th>Supprimer</Th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-300">
                  Aucun log ne correspond à vos filtres.
                </td>
              </tr>
            ) : (
              visible.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                  <Td>
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar src={log.user?.avatar} />
                      <div className="min-w-0">
                        <div className="truncate font-medium">
                          {log.user?.name || "Inconnu"}
                        </div>
                        <div className="truncate text-xs text-gray-400">
                          {log.user?.email || "—"}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <ActionBadge value={log.action} />
                  </Td>
                  <Td className="hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-300">
                      <Globe size={14} /> {log.ip_address || "—"}
                    </span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-300">
                      <Clock size={14} />
                      {formatDateTime(log.created_at)}
                    </span>
                  </Td>
                  <Td>
                    <Link
                      href={`/userlogs/${log.id}`}
                      method="delete"
                      as="button"
                      className="inline-flex items-center gap-1 rounded-lg bg-red-600/90 px-2.5 py-1.5 text-xs hover:bg-red-600"
                      onClick={(e) => {
                        if (!confirm("Supprimer ce log ?")) e.preventDefault();
                      }}
                    >
                      <Trash2 size={14} /> Supprimer
                    </Link>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > limit && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setLimit((n) => n + 10)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Voir plus ({filtered.length - limit} restants)
          </button>
        </div>
      )}
      {limit > 10 && (
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setLimit(10)}
            className="text-xs text-gray-300 hover:underline"
          >
            Réduire
          </button>
        </div>
      )}
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function Avatar({ src }) {
  const url = src ? `/storage/${src}` : "/images/mainpdp.png";
  return (
    <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-black/20">
      <img src={url} alt="avatar" className="h-full w-full object-cover" />
    </div>
  );
}

function ActionBadge({ value }) {
  if (!value)
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-200 ring-1 ring-white/20">
        <Activity size={14} /> —
      </span>
    );

  const map = {
    login: "bg-emerald-500/15 text-emerald-200 ring-emerald-300/30",
    logout: "bg-slate-500/15 text-slate-200 ring-slate-300/30",
    register: "bg-indigo-500/15 text-indigo-200 ring-indigo-300/30",
    purchase: "bg-amber-500/15 text-amber-200 ring-amber-300/30",
    update: "bg-blue-500/15 text-blue-200 ring-blue-300/30",
    delete: "bg-red-500/15 text-red-200 ring-red-300/30",
  };
  const cls = map[value] || "bg-white/10 text-gray-200 ring-white/20";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${cls}`}>
      <Activity size={14} /> {value}
    </span>
  );
}

function formatDateTime(d) {
  try {
    return new Date(d).toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}
