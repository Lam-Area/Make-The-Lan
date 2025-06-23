import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === '1';
  });

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
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
