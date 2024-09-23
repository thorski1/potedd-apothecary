'use client';

import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { stripePromise } from '@/lib/stripe';

/**
 * Cart component for displaying and managing the user's shopping cart.
 * 
 * This component shows the items in the cart, allows for item removal,
 * displays the total price, and provides options to clear the cart or
 * proceed to checkout.
 *
 * @returns {JSX.Element} The rendered Cart component.
 */
export default function Cart(): JSX.Element {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /**
   * Handles the checkout process, creating a Stripe checkout session.
   */
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }

    setIsCheckingOut(false);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <span className="font-semibold">{item.name}</span>
            <span className="block text-sm text-gray-500">${item.price.toFixed(2)}</span>
            <span className="block text-sm">Quantity: {item.quantity}</span>
          </div>
          <Button onClick={() => removeFromCart(item.id)} variant="outline" size="sm">Remove</Button>
        </div>
      ))}
      <div className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</div>
      <div className="space-y-4">
        <Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full">
          {isCheckingOut ? 'Processing...' : 'Checkout'}
        </Button>
        <Button onClick={clearCart} variant="outline" className="w-full">Clear Cart</Button>
      </div>
    </div>
  );
}