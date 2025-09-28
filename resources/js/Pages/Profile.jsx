// resources/js/Pages/Profile.jsx
import React, { useMemo, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

import Info from '@/Components/Profil/Info';
import Panier from '@/Components/Profil/ProfilePanier';
import Order from '@/Components/Profil/OrderHistory';
import Wishlist from '@/Components/Profil/Wishlist';
import Help from '@/Components/Profil/Help';
import UserList from '@/Components/Profil/UserList';
import UserLogs from '@/Components/Profil/UserLogs';
import ArticleAdmin from '@/Components/Profil/ArticleAdmin';
import RecentUserPurchases from '@/Components/Profil/RecentUserPurchases';
import ManageArticles from '@/Components/Profil/ManageOwnArticles';
import Preference from '@/Components/Profil/Preference';

import {
  User as UserIcon,
  ShoppingCart,
  Heart,
  HelpCircle,
  History,
  SlidersHorizontal,
  Users,
  ListTree,
  FileText,
  PackageSearch,
  Boxes,
} from 'lucide-react';

const SECTION_LABELS = {
  info: 'Informations personnelles',
  panier: 'Mon panier',
  historique: "Historique d'achat",
  souhaits: 'Liste de souhaits',
  aide: 'Aide',
  preference: 'Préférences',
  userlist: 'Utilisateurs',
  userlogs: 'Journaux utilisateurs',
  managearticles: 'Modérer les articles',
  recentpurchases: "Achats récents d'utilisateurs",
  articlemanagement: 'Mes articles',
};

export default function Profile() {
  const { auth, users = [], logs = [] } = usePage().props;
  const user = auth?.user;
  const isAdmin = auth?.isAdmin;
  const isVendeur = auth?.isVendeur;
  const isUser = auth?.isUser;

  const avatarUrl = user?.avatar ? `/storage/${user.avatar}` : '/images/mainpdp.png';

  const nav = useMemo(() => {
    const base = [
      { key: 'info', label: SECTION_LABELS.info, icon: UserIcon },
    ];

    if (isUser) {
      base.push(
        { key: 'panier', label: SECTION_LABELS.panier, icon: ShoppingCart },
        { key: 'historique', label: SECTION_LABELS.historique, icon: History },
        { key: 'souhaits', label: SECTION_LABELS.souhaits, icon: Heart },
        { key: 'aide', label: SECTION_LABELS.aide, icon: HelpCircle },
        { key: 'preference', label: SECTION_LABELS.preference, icon: SlidersHorizontal },
      );
    }

    if (isVendeur) {
      base.push(
        { key: 'recentpurchases', label: SECTION_LABELS.recentpurchases, icon: PackageSearch },
        { key: 'articlemanagement', label: SECTION_LABELS.articlemanagement, icon: Boxes },
        { key: 'preference', label: SECTION_LABELS.preference, icon: SlidersHorizontal },
      );
    }

    if (isAdmin) {
      base.push(
        { key: 'userlist', label: SECTION_LABELS.userlist, icon: Users },
        { key: 'userlogs', label: SECTION_LABELS.userlogs, icon: FileText },
        { key: 'managearticles', label: SECTION_LABELS.managearticles, icon: ListTree },
        { key: 'preference', label: SECTION_LABELS.preference, icon: SlidersHorizontal },
      );
    }

    const seen = new Set();
    return base.filter((i) => (seen.has(i.key) ? false : seen.add(i.key)));
  }, [isAdmin, isVendeur, isUser]);

  const [selected, setSelected] = useState(nav[0]?.key || 'info');

  const roleBadge = isAdmin
    ? { text: 'Admin', cls: 'bg-rose-500/20 text-rose-200 ring-rose-500/30' }
    : isVendeur
    ? { text: 'Vendeur', cls: 'bg-indigo-500/20 text-indigo-200 ring-indigo-500/30' }
    : { text: 'Client', cls: 'bg-emerald-500/20 text-emerald-200 ring-emerald-500/30' };

  return (
    <MainLayout isfull>
      <div className="min-h-screen w-full text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6">
            <aside className="md:sticky md:top-24 h-max">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{user?.name || 'Utilisateur'}</div>
                    <div className="truncate text-xs text-gray-400">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${roleBadge.cls}`}>
                    {roleBadge.text}
                  </span>
                </div>
              </div>

              <nav className="mt-4 hidden md:block">
                <ul className="space-y-2">
                  {nav.map(({ key, label, icon: Icon }) => {
                    const active = selected === key;
                    return (
                      <li key={key}>
                        <button
                          onClick={() => setSelected(key)}
                          className={[
                            'w-full rounded-xl px-3 py-2 text-left text-sm flex items-center gap-2 border transition',
                            active
                              ? 'border-white/20 bg-white/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10',
                          ].join(' ')}
                        >
                          <Icon size={16} className="opacity-80" />
                          <span className="truncate">{label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <div className="text-xs text-gray-400">Actions rapides</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Link
                    href="/"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/articles"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                  >
                    Catalogue
                  </Link>
                  <Link
                    href="/panier"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"
                  >
                    Panier
                  </Link>
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <div className="md:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 sticky top-16 z-10 bg-[#0b0e10]/80 backdrop-blur border-b border-white/10">
                <div className="py-3 overflow-x-auto">
                  <div className="flex gap-2 w-max">
                    {nav.map(({ key, label }) => {
                      const active = selected === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelected(key)}
                          className={[
                            'whitespace-nowrap rounded-full px-3 py-1.5 text-xs ring-1 transition',
                            active
                              ? 'bg-white/10 ring-white/20'
                              : 'bg-white/5 ring-white/10 hover:bg-white/10',
                          ].join(' ')}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {SECTION_LABELS[selected] || 'Profil'}
                </h1>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur">
                  {renderSectionContent(selected, users, logs)}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function renderSectionContent(section, users, logs) {
  switch (section) {
    case 'info':
      return <Info />;
    case 'panier':
      return <Panier />;
    case 'historique':
      return <Order />;
    case 'souhaits':
      return <Wishlist />;
    case 'aide':
      return <Help />;
    case 'preference':
      return <Preference />;
    case 'userlist':
      return <UserList users={users} />;
    case 'userlogs':
      return <UserLogs logs={logs} />;
    case 'managearticles':
      return <ArticleAdmin />;
    case 'recentpurchases':
      return <RecentUserPurchases />;
    case 'articlemanagement':
      return <ManageArticles />;
    default:
      return <p className="text-gray-300 text-sm">Section inconnue.</p>;
  }
}
