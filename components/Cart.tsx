'use client';

import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { stripePromise } from '@/lib/stripe';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
          <span>Quantity: {item.quantity}</span>
          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
        </div>
      ))}
      <div>Total: ${total.toFixed(2)}</div>
      <Button onClick={handleCheckout} disabled={isCheckingOut}>
        {isCheckingOut ? 'Processing...' : 'Checkout'}
      </Button>
      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
}