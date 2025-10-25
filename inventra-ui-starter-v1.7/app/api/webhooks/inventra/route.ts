import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  await prisma.webhookLog.create({
    data: {
      source: 'inventra',
      event: 'incoming',
      payload: body
    }
  });
  return NextResponse.json({ received: true });
}
