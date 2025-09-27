// resources/js/Components/Profil/Preference.jsx
import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTheme } from '@/Context/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function Preference() {
  const { auth } = usePage().props;
  const { darkMode, toggleDarkMode } = useTheme();

  const setMode = (val) => {
    if (val !== darkMode) toggleDarkMode();
    if (auth?.user) {
      router.post('/userpreferences/toggle', { dark_mode: val });
    }
  };

  const handleToggle = () => setMode(!darkMode);

  // utilitaire de style pour les deux boutons
  const btn = (active) =>
    active
      ? 'inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-medium hover:bg-emerald-700'
      : 'inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10';

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold tracking-tight">Préférences</h2>
      <p className="mt-1 text-sm text-gray-300">
        Personnalise l’apparence de l’interface. Ton choix est sauvegardé pour tes prochaines visites.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {darkMode ? <Sun size={18} className="text-emerald-300" /> : <Moon size={18} className="text-emerald-300" />}
              <h3 className="text-lg font-medium">Thème</h3>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Bascule entre le mode clair et le mode sombre.
            </p>
          </div>

          {/* Switch animé */}
          <button
            role="switch"
            aria-checked={darkMode}
            onClick={handleToggle}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
            className={`relative inline-flex h-9 w-[64px] items-center rounded-full transition
              ${darkMode ? 'bg-emerald-600' : 'bg-white/10 border border-white/15'}
            `}
            title={darkMode ? 'Désactiver le mode sombre' : 'Activer le mode sombre'}
          >
            <span
              className={`absolute left-1 h-7 w-7 transform rounded-full bg-white shadow transition
                ${darkMode ? 'translate-x-[34px]' : 'translate-x-0'}
              `}
            />
            <span className="pointer-events-none absolute left-2 text-[10px] text-black/50">
              <Moon size={14} />
            </span>
            <span className="pointer-events-none absolute right-2 text-[10px] text-white/70">
              <Sun size={14} />
            </span>
          </button>
        </div>

        {/* Actions rapides (désormais dynamiques) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode(false)}
            className={btn(!darkMode)}     // actif si on est en clair
          >
            <Moon size={16} /> Mode sombre
          </button>
          <button
            onClick={() => setMode(true)}
            className={btn(darkMode)}       // actif si on est en sombre
          >
            <Sun size={16} /> Mode clair
          </button>
          <span className="ml-1 text-xs text-gray-400">— actuel : {darkMode ? 'Clair' : 'Sombre'}</span>
        </div>

        {/* Aperçu */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium">Aperçu</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs">
                {darkMode ? 'Clair' : 'Sombre'}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0b0e10]/60 p-3">
              <div className="text-sm font-semibold">Carte / Titre</div>
              <p className="mt-1 text-xs text-gray-400">Exemple de texte secondaire dans une carte.</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs">Bouton</span>
                <span className="rounded-lg bg-emerald-600 px-2 py-1 text-xs">Action</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Monitor size={16} className="text-emerald-300" />
              <div className="text-sm font-medium">Conseil</div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Le mode sombre améliore le confort visuel dans les environnements peu éclairés.
              Utilise le bouton ci-dessus pour basculer instantanément.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
