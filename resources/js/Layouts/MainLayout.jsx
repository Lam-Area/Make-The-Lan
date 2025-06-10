import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children, isfull = false }) {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className={`flex-1 full ${isfull ? '' : 'bg-[#1e1e21]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}