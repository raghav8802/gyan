'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaClock, FaBookOpen, FaUserGraduate, FaTag } from 'react-icons/fa'; // Importing icons

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  image: string;
  eligibility: string; // Added eligibility field
}

export default function CoursePage() {
  const router = useRouter();
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await fetch(`/api/courses/${id}`); // Fetch course by ID
      if (!response.ok) throw new Error('Failed to fetch course');
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="text-center text-gray-400">Course not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-200 shadow-md rounded-lg p-6 mt-8"
      >
        <h1 className="text-3xl font-semibold text-gray-500 mb-4">{course.title}</h1>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <p className="text-gray-400 mb-4">{course.description}</p>

        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex items-center">
            <FaTag className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Category: {course.category}</span>
          </div>
          <div className="flex items-center">
            <FaUserGraduate className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Level: {course.level}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Duration: {course.duration}</span>
          </div>
          <div className="flex items-center">
            <FaBookOpen className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Eligibility: {course.eligibility}</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-100 bg-dark-300 hover:bg-dark-400 transition-colors duration-200"
          >
            Back to Courses
          </button>
        </div>
      </motion.div>
    </div>
  );
}
