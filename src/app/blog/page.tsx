'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { getGoogleDriveImageUrl } from '@/utils/imageUtils';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  readTime: string;
  thumbnail: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts);
      
      // Extract unique categories from posts
      const uniqueCategories = ['All', ...new Set(data.posts.map((post: BlogPost) => post.category))] as string[];
      setCategories(uniqueCategories);
    } catch {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

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

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, tips, and trends in education and technology.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-200 rounded-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/5">
                {post.thumbnail && (
                  <div className="relative w-full h-full">
                    <Image
                      src={getGoogleDriveImageUrl(post.thumbnail)}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-primary">{post.category}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post._id}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
