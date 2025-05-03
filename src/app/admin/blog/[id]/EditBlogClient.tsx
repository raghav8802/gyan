'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
}

interface EditBlogClientProps {
  id: string;
}

export default function EditBlogClient({ id }: EditBlogClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPost>({
    _id: '',
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: [],
    status: 'draft',
    thumbnail: '',
    readTime: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const post = await response.json();
      setFormData({
        ...post,
        tags: Array.isArray(post.tags) ? post.tags : post.tags?.split(',') || [],
      });
    } catch {
      setError('Failed to load blog post');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update blog post');
      }
    } catch {
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete blog post');
      }
    } catch {
      setError('Failed to delete blog post. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }

  if (previewMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">{formData.title}</h1>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Edit
          </button>
        </div>
        
        {formData.thumbnail && (
          <div className="relative w-full h-64 mb-8">
            <Image
              src={formData.thumbnail}
              alt={formData.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <span>{formData.author}</span>
          <span className="mx-2">•</span>
          <span>{formData.readTime}</span>
          <span className="mx-2">•</span>
          <span>{formData.category}</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">{formData.excerpt}</p>
          <div className="whitespace-pre-wrap text-gray-200">{formData.content}</div>
        </div>
        
        <div className="mt-8 flex gap-2">
          {formData.tags.map((tag: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-dark-200 text-gray-300 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Edit Blog Post</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setPreviewMode(true)}
            className="px-4 py-2 text-sm bg-dark-200 text-gray-300 rounded-md hover:bg-dark-300"
          >
            Preview
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-200">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            rows={3}
            required
            value={formData.excerpt}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-none"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-200">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            required
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-y min-h-[200px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="readTime" className="block text-sm font-medium text-gray-200">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              id="readTime"
              required
              value={formData.readTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-200">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-200">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => {
              const tags = e.target.value.split(',').map(tag => tag.trim());
              setFormData(prev => ({ ...prev, tags }));
            }}
            className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-200">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-200">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            id="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 