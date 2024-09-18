// app/actions/checkout.ts
"use server";

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2024-06-20",
});

export async function createCheckoutSession(
	products: { id: string; quantity: number }[]
) {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: products.map((product) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: product.id,
				},
				unit_amount: 1000, // Replace with actual price
			},
			quantity: product.quantity,
		})),
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
	});

	return session.id;
}
