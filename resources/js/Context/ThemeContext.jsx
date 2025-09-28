import React, { createContext, useContext, useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { auth, userPreference } = usePage().props;

  const getInitialDarkMode = () => {
    if (auth?.user && userPreference) {
      return userPreference.dark_mode;
    }

    return localStorage.getItem('darkMode') === '1';
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundImage = darkMode
      ? "url('/images/dark-background.gif')"
      : "url('/images/light-background.gif')";
  }, [darkMode]);

  const toggleDarkMode = () => {
    const updated = !darkMode;
    setDarkMode(updated);
    localStorage.setItem('darkMode', updated ? '1' : '0');

    if (auth?.user) {
      router.post('/userpreferences/toggle', {
        dark_mode: updated,
      }, {
        preserveScroll: true,
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
