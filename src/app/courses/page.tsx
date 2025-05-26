'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { getGoogleDriveImageUrl } from '@/utils/imageUtils';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  image: string;
  slug: string;
}

const categories = ['All', 'Development', 'Data Science', 'Marketing', 'Business', 'Design'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === 'All' || course.category === selectedCategory) &&
      (selectedLevel === 'All' || course.level === selectedLevel)
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Our <span className="text-primary">Courses</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive range of courses designed to help you achieve your learning goals.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex gap-2">
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
          </div>
          <div className="flex gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-gray-400">Test</div>
          ) : (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-200 rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/5">
                  <div className="relative w-full h-full">
                    <Image
                      src={getGoogleDriveImageUrl(course.image)}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-semibold">{course.title}</h3>
                    <span className="text-sm text-primary">{course.level}</span>
                  </div>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <Link href={`/courses/${course._id}`}>
                      <Button>View Course</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 