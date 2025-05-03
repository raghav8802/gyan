import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import mongoose, { Document } from 'mongoose';

type BlogDocument = Document & {
  _id: mongoose.Types.ObjectId;
  title: string;
  category: string;
  status: string;
  createdAt: Date;
  author: string;
  thumbnail: string;
  readTime: string;
};

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find({})
      .select('title category status createdAt author thumbnail readTime')
      .sort({ createdAt: -1 })
      .lean<BlogDocument[]>();
    
    const formattedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
    }));
    
    return NextResponse.json({ posts: formattedPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'author', 'category', 'thumbnail', 'readTime'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    await connectDB();
    const post = new Blog({
      ...data,
      tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
      status: data.status || 'draft',
    });
    
    await post.save();
    
    return NextResponse.json({
      ...post.toObject(),
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 