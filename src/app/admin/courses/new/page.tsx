'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    price: '',
    duration: '',
    level: 'beginner',
    status: 'draft',
    image: '',
    modules: '',
    yourLearning: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Convert price to number
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        router.push('/admin/courses');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-6">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-200 shadow overflow-hidden sm:rounded-lg border border-dark-300">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-heading font-bold text-gray-100 mb-6">Create New Course</h1>
            
            {error && (
              <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-md">
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
                  className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black font-medium shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-y min-h-[200px]"
                  placeholder="Enter course description..."
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
                  className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black font-medium shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-y min-h-[200px]"
                  placeholder="Enter course content..."
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
                  className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-200">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-200">
                    Duration (hours)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-200">
                    Level
                  </label>
                  <select
                    name="level"
                    id="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
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
                    className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-200">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-dark-300 border-dark-400 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="modules" className="block text-sm font-medium text-gray-200">
                  Modules
                </label>
                <textarea
                  name="modules"
                  id="modules"
                  rows={4}
                  required
                  value={formData.modules}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black font-medium shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-y min-h-[200px]"
                  placeholder="Enter course modules..."
                />
              </div>

              <div>
                <label htmlFor="yourLearning" className="block text-sm font-medium text-gray-200">
                  Your Learning
                </label>
                <textarea
                  name="yourLearning"
                  id="yourLearning"
                  rows={4}
                  required
                  value={formData.yourLearning}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-dark-300 bg-dark-200 text-black font-medium shadow-sm focus:border-primary focus:ring-primary sm:text-sm placeholder-gray-500 transition-all duration-200 ease-in-out resize-y min-h-[200px]"
                  placeholder="What will students learn?"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 border border-dark-400 text-sm font-medium rounded-md text-gray-100 bg-dark-300 hover:bg-dark-400 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 