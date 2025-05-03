'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Course {
  _id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  price: number;
  duration: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch  {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-100">Courses</h1>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            Add Course
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-dark-200 shadow overflow-hidden sm:rounded-lg border border-dark-300">
          <table className="min-w-full divide-y divide-dark-300">
            <thead className="bg-dark-300/50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                >
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No courses found
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <motion.tr
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-dark-300/50 transition-colors duration-200"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-200 sm:pl-6">
                      {course.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {course.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {course.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      {course.duration}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status === 'published'
                            ? 'bg-green-900/50 text-green-200 border border-green-500/50'
                            : 'bg-yellow-900/50 text-yellow-200 border border-yellow-500/50'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href={`/admin/courses/${course._id}`}
                        className="text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        Edit
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
