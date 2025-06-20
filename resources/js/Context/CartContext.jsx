import React, { createContext, useContext, useEffect, useState } from 'react';

const LOCAL_KEY = 'cart_items';
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCart(parsed);
      }
    } catch {
      localStorage.removeItem(LOCAL_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (article) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === article.id);
      if (exists) return prev;
      return [...prev, article];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}