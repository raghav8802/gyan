'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const cards = [
    {
      title: 'Blog Posts',
      description: 'Manage your blog posts',
      href: '/admin/blog',
      icon: '📝',
    },
    {
      title: 'Courses',
      description: 'Manage your courses',
      href: '/admin/courses',
      icon: '🎓',
    },
    {
      title: 'Jobs',
      description: 'Manage job postings',
      href: '/admin/jobs',
      icon: '💼',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-heading font-bold text-gray-100 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mb-8">
          Welcome to your admin dashboard. Manage your content from here.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={card.href}
                className="block p-6 bg-dark-200 rounded-lg border border-dark-300 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </span>
                  <div>
                    <h2 className="text-lg font-medium text-gray-100 group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 