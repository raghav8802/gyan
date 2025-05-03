'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts);
    } catch {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete post');
      
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== id));
    } catch {
      setError('Failed to delete blog post');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-100">Blog Posts</h1>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            Add New Post
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="bg-dark-200 shadow overflow-hidden sm:rounded-lg border border-dark-300">
            <ul className="divide-y divide-dark-300">
              {posts.map((post) => (
                <motion.li
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-4 hover:bg-dark-300/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">
                        {post.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-900/50 text-green-200 border border-green-500/50'
                            : 'bg-yellow-900/50 text-yellow-200 border border-yellow-500/50'
                        }`}
                      >
                        {post.status}
                      </span>
                      <Link
                        href={`/admin/blog/${post._id}`}
                        className="text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingId === post._id}
                        className="text-red-500 hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
                      >
                        {deletingId === post._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
              {posts.length === 0 && (
                <li className="px-6 py-8 text-center text-gray-400">
                  No blog posts found. Create your first post!
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
