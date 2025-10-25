import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY;
  try {
    if (!key) {
      return NextResponse.json({ url: 'https://billing.example.com/checkout/session-demo', note: 'Set STRIPE_SECRET_KEY to enable real sessions.' });
    }
    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID || 'price_xxx', quantity: 1 }],
      success_url: 'http://localhost:3000/billing?success=1',
      cancel_url: 'http://localhost:3000/billing?canceled=1',
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
