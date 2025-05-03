'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: string;
  thumbnail: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Blog post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Button
            variant="outline"
            className="mb-8"
            onClick={() => router.back()}
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Button>

          {/* Blog Post Header */}
          <div className="mb-12">
            <div className="h-96 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg overflow-hidden mb-8">
              <div className="relative w-full h-full">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-primary">{post.category}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-400 mb-8">{post.excerpt}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/20" />
                  <div>
                    <h4 className="font-semibold text-gray-200">{post.author}</h4>
                    <p className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-heading font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-dark-300 text-gray-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 