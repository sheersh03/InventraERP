import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '../login/route';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Session cleared.' });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });

  return response;
}
