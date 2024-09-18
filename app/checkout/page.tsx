'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
	const { cart, clearCart } = useCart();
	const router = useRouter();
	const [isProcessing, setIsProcessing] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
	});

	useEffect(() => {
		const reservationExpires = localStorage.getItem('reservationExpires');
		if (reservationExpires) {
			const updateTimer = () => {
				const now = new Date();
				const expiresAt = new Date(reservationExpires);
				const diff = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
				setTimeLeft(diff);

				if (diff === 0) {
					clearCart();
					router.push('/cart');
				}
			};

			updateTimer();
			const timerId = setInterval(updateTimer, 1000);

			return () => clearInterval(timerId);
		}
	}, [clearCart, router]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		try {
			// 1. Create order in Supabase
			const { data: order, error: orderError } = await supabase
				.from('orders')
				.insert([
					{
						customer_name: formData.name,
						customer_email: formData.email,
						shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
						total_amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
						status: 'pending',
					},
				])
				.select()
				.single();

			if (orderError) throw orderError;

			// 2. Create Stripe Checkout session
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					orderId: order.id,
					items: cart,
					customerEmail: formData.email,
				}),
			});

			const session = await response.json();

			// 3. Redirect to Stripe Checkout
			const stripe = await stripePromise;
			const { error } = await stripe!.redirectToCheckout({
				sessionId: session.id,
			});

			if (error) throw error;

			// Clear cart after successful checkout
			clearCart();
		} catch (error) {
			console.error('Checkout error:', error);
			alert('An error occurred during checkout. Please try again.');
		} finally {
			setIsProcessing(false);
		}
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
			{timeLeft !== null && (
				<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8" role="alert">
					<p className="font-bold">Your items are reserved!</p>
					<p>You have {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} left to complete your purchase.</p>
				</div>
			)}
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							name="name"
							placeholder="Full Name"
							value={formData.name}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Input
							type="text"
							name="address"
							placeholder="Address"
							value={formData.address}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Input
							type="text"
							name="city"
							placeholder="City"
							value={formData.city}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Input
							type="text"
							name="state"
							placeholder="State"
							value={formData.state}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Input
							type="text"
							name="zipCode"
							placeholder="Zip Code"
							value={formData.zipCode}
							onChange={handleInputChange}
							required
							className="mb-4"
						/>
						<Button type="submit" disabled={isProcessing} className="w-full">
							{isProcessing ? 'Processing...' : 'Place Order'}
						</Button>
					</form>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
					<div className="bg-gray-100 p-6 rounded-lg">
						{cart.map((item) => (
							<div key={item.id} className="flex items-center mb-4">
								<Image
									src={item.image_url || "/placeholder.png"}
									alt={item.name}
									width={50}
									height={50}
									className="rounded-md mr-4"
								/>
								<div className="flex-grow">
									<h3 className="font-semibold">{item.name}</h3>
									<p className="text-gray-600">Quantity: {item.quantity}</p>
								</div>
								<p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
							</div>
						))}
						<div className="border-t pt-4 mt-4">
							<div className="flex justify-between mb-2">
								<span>Subtotal</span>
								<span>${total.toFixed(2)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Shipping</span>
								<span>Calculated at next step</span>
							</div>
							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}