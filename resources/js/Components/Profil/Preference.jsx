import React from 'react';
import { useTheme } from '@/Context/ThemeContext';
import { usePage, router } from '@inertiajs/react';

export default function Preference() {
  const { auth } = usePage().props;
  const { darkMode, toggleDarkMode } = useTheme();

  const handleToggle = () => {
    toggleDarkMode();

    if (auth?.user) {
      router.post('/userpreferences/toggle', {
        dark_mode: !darkMode,
      });
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-4">Thème</h2>
      <div className="flex items-center gap-4">
        <span>Mode sombre :</span>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-yellow-500' : 'bg-gray-600'} hover:opacity-90 transition`}
        >
          {darkMode ? 'Désactiver' : 'Activer'}
        </button>
      </div>
    </div>
  );
}
