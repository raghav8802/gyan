'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  slug: string;
  thumbnail: string;
  date: string;
}

const BlogCard = ({
  title,
  excerpt,
  category,
  readTime,
  slug,
  thumbnail,
  date,
}: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-dark-200 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent opacity-60" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {category}
            </span>
            <span className="text-gray-400 text-sm flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readTime}
            </span>
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{date}</span>
            <span className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1">
              Read More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard; 