'use client';

import Cart from '@/components/Cart';

/**
 * CartPage component for displaying the shopping cart.
 * 
 * This page renders the Cart component, which shows the user's
 * selected items and provides options for checkout.
 *
 * @returns {JSX.Element} The rendered CartPage component.
 */
export default function CartPage(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <Cart />
    </div>
  );
}