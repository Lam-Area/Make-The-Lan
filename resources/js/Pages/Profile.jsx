import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
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

const allSections = {
  info: 'Informations personnelles',
  panier: 'Mon panier',
  historique: "Historique d'achat",
  souhaits: 'Liste de souhaits',
  aide: 'Aide',
  preference: 'Préférence',
  userlist: 'Voir la liste des utilisateurs',
  userlogs: "Voir les logs d'un utilisateur",
  managearticles: 'Modifier/supprimer un article',
  recentpurchases: "Achats récents d'utilisateurs",
  articlemanagement: "Gérer mes articles"
};

export default function Profile() {
  const { auth } = usePage().props;
  const isAdmin = auth?.isAdmin;
  const isVendeur = auth?.isVendeur;
  const isUser = auth?.isUser;

  let visibleSections = Object.entries(allSections).filter(([key]) => {
    const vendeurOnly = ['info', 'recentpurchases', 'articlemanagement', 'preference'];
    if (vendeurOnly.includes(key)) return isVendeur;
    return false;
  });

  if (isAdmin) {
    visibleSections = Object.entries(allSections).filter(([key]) => {
    const adminOnly = ['info', 'userlist', 'userlogs', 'managearticles', 'preference'];
    if (adminOnly.includes(key)) return isAdmin;
    return false;
  });
  }

  else if (isUser) {
    visibleSections = Object.entries(allSections).filter(([key]) => {
    const userOnly = ['info', 'panier', 'historique', 'souhaits', 'aide', 'preference'];
    if (userOnly.includes(key)) return isUser;
    return false;
  });
  }

  const [selected, setSelected] = useState('panier'); // default

  return (
    <MainLayout isfull>
      <div className="flex w-full min-h-full text-white">

        <div className="w-64 bg-[#16171A] bg-opacity-70 p-4">
          <h2 className="text-lg font-semibold mb-4">Username</h2>
          <ul className="space-y-2">
            {visibleSections.map(([key, label]) => (
              <li key={key}>
                <button
                  onClick={() => setSelected(key)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                    selected === key ? 'bg-[#272e33] font-semibold' : ''
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">{allSections[selected]}</h1>
          <div className="bg-[#16171A] bg-opacity-70 p-4 rounded shadow">
            {renderSectionContent(selected)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function renderSectionContent(section) {
  switch (section) {
    case 'info': return <Info />;
    case 'panier': return <Panier />;
    case 'historique': return <Order />;
    case 'souhaits': return <Wishlist />;
    case 'aide': return <Help />;
    case 'preference': return <Preference />;
    case 'userlist': return <UserList />;
    case 'userlogs': return <UserLogs />;
    case 'managearticles': return <ArticleAdmin />;
    case 'recentpurchases': return <RecentUserPurchases />;
    case 'articlemanagement': return <ManageArticles />;
    default: return <p>Section inconnue.</p>;
  }
}
