import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#2a3740] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center relative">
        
        {/* Logo + Recherche */}
        <div className="flex items-center gap-4 flex-1 pl-4">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-[#495761] px-3 py-1 rounded focus:outline-none focus:ring w-full max-w-xs"
          />
        </div>

        {/* Logo central */}
        <div className="text-2xl font-bold text-center tracking-wide hidden md:flex flex-1 justify-center">
          <Link href="/">MyScript</Link>
        </div>

        {/* Bouton hamburger (mobile uniquement) */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-6 justify-end flex-1 pr-12">
          {!user && (
            <>
              <Link href="/register" className="hover:underline">Inscription</Link>
              <Link href="/login" className="hover:underline">Connexion</Link>
              <Link href="/panier" className="hover:underline">Panier</Link>
            </>
          )}

          {user && (
            <>
              <span className="text-sm italic">Bienvenue, {user.name}</span>
              {user?.role === 'user' && (
                <>
                  <Link href="/profile" className="hover:underline">profile</Link>
                  <Link href="/panier" className="hover:underline">Panier</Link>
                </>
              )}
              {user?.role === 'vendeur' && (
                <>
                  <Link href="/profile" className="hover:underline">profile</Link>
                  <Link href="/articles" className="hover:underline">articles</Link>
                </>
              )}
              {user?.role === 'admin' && (
                <Link href="/profile" className="hover:underline">profile/dashboard</Link>
              )}
              <Link
                href="/logout"
                method="post"
                as="button"
                className="hover:underline text-red-400"
              >
                Déconnexion
              </Link>
            </>
          )}
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-[#2a3740] border border-gray-700 rounded shadow-md z-50 p-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link href="/register" className="hover:underline">Inscription</Link>
                  <Link href="/login" className="hover:underline">Connexion</Link>
                  <Link href="/panier" className="hover:underline">Panier</Link>
                </>
              ) : (
                <>
                  <span className="text-sm italic">Bienvenue, {user.name}</span>
                  {user.role === 'user' && (
                    <>
                      <Link href="/profile" className="hover:underline">profile</Link>
                      <Link href="/panier" className="hover:underline">Panier</Link>
                    </>
                  )}
                  {user.role === 'vendeur' && (
                    <>
                      <Link href="/profile" className="hover:underline">profile</Link>
                      <Link href="/articles" className="hover:underline">articles</Link>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/profile" className="hover:underline">dashboard</Link>
                  )}
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="hover:underline text-red-400"
                  >
                    Déconnexion
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
