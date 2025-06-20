import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { CartProvider } from '@/Context/CartContext';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx'); // supporte tous les sous-dossiers
    return pages[`./Pages/${name}.jsx`]().then(module => module.default);
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <CartProvider> {/* 👈 Wrapping global */}
        <App {...props} />
      </CartProvider>
    );
  },
});
