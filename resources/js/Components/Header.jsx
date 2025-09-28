import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
  Menu, X, Search, ShoppingCart, Heart, User, LogIn, UserPlus, LogOut, ChevronDown,
} from 'lucide-react';

export default function Header() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const [search, setSearch] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);    

  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef(null);

  const avatarUrl = user?.avatar ? `/storage/${user.avatar}` : '/images/mainpdp.png';

  const submitSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    router.visit(`/articles?search=${encodeURIComponent(q)}`);
    closeDrawer();
  };

  const openDrawer = () => {
    setDrawerVisible(true);
    requestAnimationFrame(() => setDrawerOpen(true));
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setDrawerVisible(false), 260);
  };

  useEffect(() => {
    function onDocClick(e) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) setUserOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        closeDrawer();
        setUserOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (drawerVisible) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [drawerVisible]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0e10]/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-9 w-9 rounded-lg object-contain" />
            <span className="hidden sm:inline text-lg font-semibold tracking-tight">
              Make <span className="text-emerald-400">The Lan</span>
            </span>
          </Link>
        </div>

        <form
          onSubmit={submitSearch}
          className="relative hidden min-w-[280px] max-w-md flex-1 items-center md:flex"
          role="search"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article…"
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-white/20"
          />
        </form>

        <div className="hidden items-center gap-2 md:flex">
          {!user ? (
            <>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                <UserPlus size={16} /> Inscription
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                <LogIn size={16} /> Connexion
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Souhaits"
              >
                <Heart size={18} />
              </Link>
              <Link
                href="/panier"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-700"
              >
                <ShoppingCart size={18} /> Panier
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Souhaits"
              >
                <Heart size={18} />
              </Link>
              <Link
                href="/panier"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Panier"
              >
                <ShoppingCart size={18} />
              </Link>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 hover:bg-white/10"
                  aria-haspopup="menu"
                  aria-expanded={userOpen}
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border border-white/10 object-cover"
                  />
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                  <ChevronDown size={16} className="hidden sm:inline opacity-70" />
                </button>

                {userOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0b0e10]/95 p-2 shadow-2xl backdrop-blur"
                  >
                    <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                      <User size={16} /> Mon profil
                    </Link>

                    {user.role === 'user' && (
                      <>
                        <Link href="/panier" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                          <ShoppingCart size={16} /> Panier
                        </Link>
                        <Link href="/wishlist" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                          <Heart size={16} /> Souhaits
                        </Link>
                      </>
                    )}

                    {user.role === 'vendeur' && (
                      <Link href="/articles" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                        📦 Articles
                      </Link>
                    )}

                    {user.role === 'admin' && (
                      <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                        🛠️ Dashboard
                      </Link>
                    )}

                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut size={16} /> Déconnexion
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => (drawerVisible ? closeDrawer() : openDrawer())}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 md:hidden"
          aria-label={drawerVisible ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {drawerVisible ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {drawerVisible && (
        <>
          <div
            className={`fixed inset-x-0 top-16 bottom-0 z-[55] bg-black/40 transition-opacity duration-300 md:hidden ${
              drawerOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <div
            className={`
              fixed right-3 top-[4.75rem] z-[60] w-[72%] sm:w-[60%] max-w-[420px]
              overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0e10]/75
              backdrop-blur-lg shadow-2xl p-4 md:hidden
              transition-transform duration-300 ease-out
              ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            style={{
              maxHeight: '75dvh',
              paddingBottom: 'max(env(safe-area-inset-bottom),0.75rem)',
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-3 flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8 rounded-lg" />
              <span className="text-base font-semibold">
                Make <span className="text-emerald-400">The Lan</span>
              </span>
            </div>

            <form onSubmit={submitSearch} className="relative" role="search">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un article…"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-300 focus:border-white/20"
              />
            </form>

            <nav className="mt-5 grid gap-2">
              {!user ? (
                <>
                  <Link href="/register" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                    <UserPlus size={18} /> Inscription
                  </Link>
                  <Link href="/login" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                    <LogIn size={18} /> Connexion
                  </Link>
                  <Link href="/wishlist" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                    <Heart size={18} /> Souhaits
                  </Link>
                  <Link href="/panier" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                    <ShoppingCart size={18} /> Panier
                  </Link>
                </>
              ) : (
                <>
                  <div className="mb-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <img src={avatarUrl} alt="Avatar" className="h-9 w-9 rounded-full border border-white/10 object-cover" />
                    <div className="leading-tight">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>

                  <Link href="/profile" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                    <User size={18} /> Mon profil
                  </Link>

                  {user.role === 'user' && (
                    <>
                      <Link href="/panier" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                        <ShoppingCart size={18} /> Panier
                      </Link>
                      <Link href="/wishlist" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                        <Heart size={18} /> Souhaits
                      </Link>
                    </>
                  )}

                  {user.role === 'vendeur' && (
                    <Link href="/articles" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                      📦 Articles
                    </Link>
                  )}

                  {user.role === 'admin' && (
                    <Link href="/profile" onClick={closeDrawer} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                      🛠️ Dashboard
                    </Link>
                  )}

                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    onClick={closeDrawer}
                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut size={18} /> Déconnexion
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
