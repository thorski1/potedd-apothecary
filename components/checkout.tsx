"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
	const handleCheckout = async () => {
		const products = [{ id: "product_id", quantity: 1 }];
		const sessionId = await createCheckoutSession(products);

		const stripe = await stripePromise;
		if (stripe) {
			await stripe.redirectToCheckout({ sessionId });
		}
	};

	return (
		<div>
			<button onClick={handleCheckout}>
				Proceed to Checkout
			</button>
		</div>
	);
}
