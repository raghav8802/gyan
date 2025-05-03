import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_TOKEN = '2Vxxssvjag@1978';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Get the admin token from cookies
    const adminToken = request.cookies.get('admin_token');

    // If no token is present, redirect to login
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Simple token verification
    if (adminToken.value !== ADMIN_TOKEN) {
      // Clear the invalid token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 