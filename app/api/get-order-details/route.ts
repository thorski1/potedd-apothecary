import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json({ orderId: session.metadata?.orderId });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json({ error: 'Error retrieving order details' }, { status: 500 });
  }
}