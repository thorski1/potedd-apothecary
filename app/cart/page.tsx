'use client';

import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock_quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearCart, updateCart } = useCart(); // Add updateCart here
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.stock_quantity) {
      const updatedItem = { ...item, quantity: newQuantity };
      const updatedCart = cart.map(cartItem => 
        cartItem.id === item.id ? updatedItem : cartItem
      );
      updateCart(updatedCart);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      console.log('Starting checkout process');
      console.log('Cart items:', cart);

      const items = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));
      console.log('Prepared items for reservation:', items);

      const { data, error } = await supabase.rpc('create_or_update_reservation', { items });

      if (error) {
        console.error('Error creating reservation:', error);
        console.log('Full error object:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log('Reservation created successfully:', data);

      if (!data || !data.reservation_id || !data.expires_at) {
        console.error('Invalid response from create_or_update_reservation:', data);
        throw new Error('Invalid response from create_or_update_reservation');
      }

      localStorage.setItem('reservationId', data.reservation_id);
      localStorage.setItem('reservationExpires', data.expires_at);

      console.log('Reservation data stored in localStorage');
      console.log('Redirecting to checkout page');

      router.push('/checkout');
    } catch (error) {
      console.error('Error during checkout process:', error);
      console.log('Full error object:', JSON.stringify(error, null, 2));
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b py-4"
            >
              <Image
                src={item.image_url || "/placeholder.png"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">
                  {item.name}
                </h3>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(item, -1)
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(item, 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-4"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full mb-2"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut
                ? "Processing..."
                : "Proceed to Checkout"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}