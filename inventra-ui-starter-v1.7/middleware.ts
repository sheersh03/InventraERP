import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Demo-only: Ensure a default role cookie exists
  const role = req.cookies.get('role')?.value || 'manager';
  const res = NextResponse.next();
  if (!req.cookies.get('role')) {
    res.cookies.set('role', role, { path: '/' });
  }
  return res;
}
