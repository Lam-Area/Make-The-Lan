import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { useTheme, ThemeProvider } from '@/Context/ThemeContext';

function LayoutContent({ children, isfull }) {
  const { darkMode } = useTheme();

  const backgroundUrl = darkMode
    ? "/images/mainbg2.gif"
    : "/images/mainbg.gif";

  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <main className={`flex-1 ${isfull ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-70'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function MainLayout({ children, isfull = false }) {
  return (
    <ThemeProvider>
      <LayoutContent isfull={isfull}>
        {children}
      </LayoutContent>
    </ThemeProvider>
  );
}
