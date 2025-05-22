import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Info from '@/Components/Profil/Info';
import Panier from '@/Components/Profil/Panier';
import Order from '@/Components/Profil/OrderHistory';
import Wishlist from '@/Components/Profil/Wishlist';
import Message from '@/Components/Profil/Message';
import Help from '@/Components/Profil/Help';
import UserList from '@/Components/Profil/UserList';
import UserLogs from '@/Components/Profil/UserLogs';
import ArticleAdmin from '@/Components/Profil/ArticleAdmin';

const sections = {
  info: 'Informations personnelles',
  messages: 'Mes messages',
  panier : 'Mon panier',
  historique: "Historique d'achat",
  souhaits: 'Liste de souhaits',
  aide: 'Aide',
  preferences: 'Préférences',
  userlist: 'Voir la liste des utilisateurs',
  userlogs: "Voir les logs d'un utilisateur",
  managearticles: 'Modifier/supprimer un article'
};

export default function Profile() {
  const [selected, setSelected] = useState('panier'); // default

  return (
    <MainLayout>
      <div className="flex w-full min-h-full text-white">

        <div className="w-64 bg-[#1e1e21] p-4">
          <h2 className="text-lg font-semibold mb-4">Username</h2>
          <ul className="space-y-2">
            {Object.entries(sections).map(([key, label]) => (
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
          <h1 className="text-2xl font-bold mb-4">{sections[selected]}</h1>
          <div className="bg-[#1E1E21] p-4 rounded shadow">
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
    case 'messages': return <Message />;
    case 'panier': return <Panier />;
    case 'historique': return <Order />;
    case 'souhaits': return <Wishlist />;
    case 'aide': return <Help />;
    case 'preferences': return <p>Réglages du compte.</p>;
    case 'userlist': return <UserList />;
    case 'userlogs': return <UserLogs />;
    case 'managearticles': return <ArticleAdmin />;
    default: return <p>Section inconnue.</p>;
  }
}
