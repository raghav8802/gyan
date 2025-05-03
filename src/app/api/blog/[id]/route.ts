import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import mongoose, { Document } from 'mongoose';

type BlogDocument = Document & {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: string;
  thumbnail: string;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid blog post ID' },
        { status: 400 }
      );
    }
    
    const post = await Blog.findById(params.id).lean<BlogDocument>();
    
    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Convert _id to string and format dates
    const formattedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
    
    return NextResponse.json(formattedPost, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    const data = await request.json();
    await connectDB();
    
    const post = await Blog.findByIdAndUpdate(
      params.id,
      {
        ...data,
        tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean<BlogDocument>();
    
    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const formattedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
    
    return NextResponse.json(formattedPost, { status: 200 });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const post = await Blog.findByIdAndDelete(params.id).lean<BlogDocument>();
    
    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Blog post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 