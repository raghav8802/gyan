// src/app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect'; // Ensure you have a dbConnect utility
import Job from '../../../models/job';

export async function POST(request: Request) {
  await dbConnect(); // Connect to the database

  const jobData = await request.json();

  try {
    const newJob = new Job(jobData);
    await newJob.save();
    return NextResponse.json({ message: 'Job created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect(); // Connect to the database

  try {
    const jobs = await Job.find(); // Fetch all jobs
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}