import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect'; // Adjust the path as necessary
import Course from '../../../../models/Course';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect(); // Connect to the database

  try {
    const course = await Course.findById(params.id); // Fetch course by ID
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}
