import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token) {
      return NextResponse.json(
        { message: 'No token found' },
        { status: 401 }
      );
    }

    // Verify the token
    verify(token.value, JWT_SECRET);

    return NextResponse.json(
      { success: true, message: 'Token is valid' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }
} 