'use client';

import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
	const router = useRouter();
	const { cart, addToCart, removeFromCart, clearCart } = useCart();
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleQuantityChange = (item: any, change: number) => {
		if (item.quantity + change > 0) {
			addToCart({ ...item, quantity: change });
		}
	};

	const handleRemoveItem = (id: string) => {
		removeFromCart(id);
	};

	const handleCheckout = async () => {
		setIsCheckingOut(true);
		try {
			const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

			// Create reservations for each item in the cart
			const reservations = cart.map(item => ({
				product_id: item.id,
				quantity: item.quantity,
				expires_at: expiresAt.toISOString()
			}));

			const { data, error } = await supabase
				.from('reservations')
				.insert(reservations);

			if (error) throw error;

			// Store reservation expiration time in localStorage
			localStorage.setItem('reservationExpires', expiresAt.toISOString());

			router.push('/checkout');
		} catch (error) {
			console.error('Error creating reservations:', error);
			alert('An error occurred. Please try again.');
		} finally {
			setIsCheckingOut(false);
		}
	};

	if (cart.length === 0) {
		return (
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
				<h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
				<p className="mb-8">Looks like you haven't added any items to your cart yet.</p>
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