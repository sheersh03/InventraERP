import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '../login/route';

export async function GET() {
  const sessionCookie = cookies().get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  try {
    const decoded = JSON.parse(Buffer.from(sessionCookie, 'base64url').toString('utf-8'));
    return NextResponse.json({ authenticated: true, session: decoded }, { status: 200 });
  } catch (error) {
    console.warn('Unable to decode mock session', error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
