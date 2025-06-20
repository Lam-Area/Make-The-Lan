import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children, isfull = false }) {
  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{
        backgroundImage: "url('/images/mainbg.gif')",
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
