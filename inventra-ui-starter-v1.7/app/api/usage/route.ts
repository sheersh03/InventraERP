import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Accept a usage event { kind, amount }
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok: true, stored: body });
}
