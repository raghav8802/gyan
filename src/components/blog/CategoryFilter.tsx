'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'all'
            ? 'bg-primary text-dark'
            : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
        }`}
      >
        All Posts
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-primary text-dark'
              : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter; 