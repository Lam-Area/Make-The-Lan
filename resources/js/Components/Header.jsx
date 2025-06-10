import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
  const { auth } = usePage().props;
  const user = auth?.user;

  return (
    <header className="bg-[#2a3740] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo + Recherche */}
        <div className="flex items-center pr-4 pl-12 gap-10 flex-1">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-[#495761] px-3 py-1 rounded focus:outline-none focus:ring w-full max-w-xs"
          />
        </div>

        {/* Logo central */}
        <div className="text-2xl font-bold text-center tracking-wide flex-1 justify-center hidden md:flex">
          <Link href="/">MyScript</Link>
        </div>

        {/* Navigation utilisateur */}
        <div className="flex items-center pl-4 pr-12 gap-6 justify-end flex-1">
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

              {/* Rôle user */}
              {user?.role === 'user' && (
                <Link href="/profile" className="hover:underline">profile</Link>
              )}
              {user?.role === 'user' && (
                <Link href="/panier" className="hover:underline">Panier</Link>
              )}

              {/* Rôle vendeur */}
              {user?.role === 'vendeur' && (
                <Link href="/profile" className="hover:underline">profile</Link>
              )}
              {user?.role === 'vendeur' && (
                <Link href="/articles" className="hover:underline">articles</Link>
              )}

              {/* Rôle admin */}
              {user?.role === 'admin' && (
                <Link href="/profile" className="hover:underline">profile/dashboard</Link>
              )}

              {/* Déconnexion */}
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
    </header>
  );
}
