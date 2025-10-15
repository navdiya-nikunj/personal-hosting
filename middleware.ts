import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-minimum-32-characters-long'
);

const protectedRoutes = ['/dashboard', '/upload', '/edit', '/api/documents/upload', '/api/documents/delete', '/api/documents/update', '/api/documents/get'];
const authRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  const sessionToken = request.cookies.get('session')?.value;

  // Verify session
  let isAuthenticated = false;
  if (sessionToken) {
    try {
      await jwtVerify(sessionToken, secret);
      isAuthenticated = true;
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth routes while already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

