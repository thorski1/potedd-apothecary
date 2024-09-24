import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-06-20",
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const { orderId, items, customerEmail } =
		await request.json();

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: items.map((item: any) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
						images: [item.image_url],
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
			customer_email: customerEmail,
			metadata: {
				orderId: orderId,
			},
		});

		return NextResponse.json({ sessionUrl: session.url });
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message },
			{ status: 500 }
		);
	}
}
