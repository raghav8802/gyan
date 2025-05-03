'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full max-w-2xl mx-auto ${
        isFocused ? 'shadow-lg' : ''
      }`}
    >
      <div
        className={`relative flex items-center transition-all duration-300 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}
      >
        <input
          type="text"
          placeholder="Search articles..."
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-3 pl-12 bg-dark-200 border-2 border-dark-300 focus:border-primary rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none transition-all duration-300"
        />
        <motion.span
          animate={{
            scale: isFocused ? 1.1 : 1,
          }}
          className="absolute left-3 text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.span>
      </div>
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.8 }}
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary rounded-full transform -translate-y-1"
        />
      )}
    </motion.div>
  );
};

export default SearchBar; 