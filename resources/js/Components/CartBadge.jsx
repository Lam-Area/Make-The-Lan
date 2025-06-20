import React from 'react';
import { useCart } from '@/Context/CartContext';
import { Link } from '@inertiajs/react';

export default function CartBadge() {
  const { cart } = useCart();

  return (
    <Link
      href="/panier"
      className="text-white hover:underline relative"
    >
      Panier ({cart.length})
    </Link>
  );
}