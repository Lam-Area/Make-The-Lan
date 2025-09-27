// resources/js/Components/Footer.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Github, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0b0e10]/70 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Marque */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Make The Lan"
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="text-lg font-semibold">
                Make <span className="text-emerald-400">The Lan</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-300">
              Toujours mieux que les serveurs d'OVH
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/Lam-Area"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:admin@mtl.com"
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Nous contacter par email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation / Légal */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            <div>
              <h3 className="text-sm font-semibold text-gray-200">Navigation</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/articles" className="text-gray-300 hover:text-white">Catalogue</Link></li>
                <li><Link href="/panier" className="text-gray-300 hover:text-white">Panier</Link></li>
                <li><Link href="/wishlist" className="text-gray-300 hover:text-white">Souhaits</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200">Légal</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/legal" className="text-gray-300 hover:text-white">Informations légales</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Conditions générales</Link></li>
                <li><Link href="/profile" className="text-gray-300 hover:text-white">Gérer mes préférences</Link></li>
              </ul>
            </div>
          </div>

          {/* Callout communauté */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-gray-200"><span className="text-emerald-400">Rejoindre la communauté</span></h3>
            <p className="mt-2 text-sm text-gray-300">
              Ici on parle code ! Viens faire un tour et partager tes configs.
            </p>
            <a
              href="https://discord.com/invite/your-server"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 active:scale-[.99]"
            >
              <MessageCircle size={16} />
              Rejoindre Discord
            </a>
          </div>
        </div>

        {/* Ligne info (sans bande séparée) */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-gray-400 sm:flex-row">
          <p>© Make The Lan {year}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
