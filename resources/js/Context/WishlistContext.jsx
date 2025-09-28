import React, { createContext, useContext, useEffect, useState } from 'react';

const LOCAL_KEY = 'wishlist_items';
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setWishlist(parsed);
      }
    } catch {
      localStorage.removeItem(LOCAL_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (article) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === article.id)) return prev;
      return [...prev, article];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
