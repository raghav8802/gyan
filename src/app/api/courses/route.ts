import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect'; // Ensure you have a dbConnect utility
import Course from '../../../models/Course';

export async function POST(request: Request) {
  await dbConnect(); // Connect to the database

  const courseData = await request.json();

  try {
    const newCourse = new Course(courseData);
    await newCourse.save();
    return NextResponse.json({ message: 'Course created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params?: { id: string } }) {
  await dbConnect(); // Connect to the database

  try {
    if (params?.id) {
      // Fetch a specific course by ID
      const course = await Course.findById(params.id);
      if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      return NextResponse.json(course, { status: 200 });
    } else {
      // Fetch all courses
      const courses = await Course.find();
      return NextResponse.json(courses, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
} 