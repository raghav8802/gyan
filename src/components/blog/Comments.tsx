'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/${slug}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]);
      setFormData({ name: '', email: '', content: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-heading font-bold mb-8">Comments</h2>

      {/* Comment Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-200 p-6 rounded-lg mb-8"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-heading font-semibold mb-4">
          Leave a Comment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </motion.form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : comments.length > 0 ? (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 p-6 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-semibold">
                    {comment.name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
} 