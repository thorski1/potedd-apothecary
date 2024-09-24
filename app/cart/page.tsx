'use client';

import Cart from '@/components/Cart';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useCart } from '@/lib/cartContext';
import { useEffect, useState } from 'react';

/**
 * CartPage component for displaying the shopping cart.
 * 
 * This page renders the Cart component, which shows the user's
 * selected items and provides options for checkout.
 *
 * @returns {JSX.Element} The rendered CartPage component.
 */
export default function CartPage(): JSX.Element {
  const { cart, isLoading } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <Cart />
    </div>
  );
}