'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft',
    slug: '',
    thumbnail: '',
    readTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-heading font-bold text-gray-100 mb-6">Create New Blog Post</h1>
        
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
              placeholder="Enter post title"
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
              placeholder="Write a brief summary of your blog post (max 160 characters)..."
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
              placeholder="Start writing your blog post content here... You can use markdown for formatting."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-200">
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
                placeholder="Author name"
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
                placeholder="Post category"
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
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
              placeholder="tag1, tag2, tag3"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-200">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
                placeholder="url-friendly-title"
              />
            </div>

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
                placeholder="e.g. 5 min read"
              />
            </div>
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-200">
              Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnail"
              id="thumbnail"
              required
              value={formData.thumbnail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-dark-300 bg-dark-200 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex flex-col space-y-3">
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-dark-300 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-dark-200 hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Blog Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}