'use client';

import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';

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
  const { cart, removeFromCart, clearCart, updateQuantity, isLoading } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Your Cart
        </h2>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4 mb-4"
          >
            <div>
              <span className="font-semibold">
                {item.name}
              </span>
              <span className="block text-sm text-gray-500">
                ${item.price.toFixed(2)}
              </span>
              <div className="flex items-center mt-2">
                <span className="mr-2">Quantity:</span>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-16"
                  min="1"
                />
              </div>
            </div>
            <Button
              onClick={() => removeFromCart(item.id)}
              variant="outline"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Order Summary
          </h2>
          <div className="text-xl font-bold mb-4">
            Total: ${total.toFixed(2)}
          </div>
          <div className="space-y-4">
            <Link href="/checkout" passHref>
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
            <Button
              onClick={clearCart}
              variant="outline"
              className="w-full"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6"></div>
    </div>
  );
}