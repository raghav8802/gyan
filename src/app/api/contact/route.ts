import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
// import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDB();

    

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 