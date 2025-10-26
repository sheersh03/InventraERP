import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'inventra_mock_session';
const PUBLIC_PATHS = new Set(['/login', '/api/auth/login', '/api/auth/logout', '/api/auth/session', '/favicon.ico']);

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/assets') ||
    pathname === '/robots.txt' ||
    pathname === '/manifest.json'
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  const role = req.cookies.get('role')?.value || 'manager';

  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const isApiRoute = pathname.startsWith('/api');

  if (!session && !isPublicPath && !isApiRoute && !isStaticAsset(pathname)) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const res = NextResponse.next();
  if (!req.cookies.get('role')) {
    res.cookies.set('role', role, { path: '/' });
  }
  return res;
}
