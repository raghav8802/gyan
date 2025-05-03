import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

const ADMIN_PASSWORD = '2Vxxssvjag@1978';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    console.log('Login attempt with password:', password);

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      console.log('Password mismatch:', {
        provided: password,
        expected: ADMIN_PASSWORD
      });
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL('/admin', request.url));
    
    // Set the cookie with the same value as the password
    response.cookies.set({
      name: 'admin_token',
      value: ADMIN_PASSWORD,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 