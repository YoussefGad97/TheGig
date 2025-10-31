"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CategoriesBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({ selectedCategory, onSelectCategory, categories }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-[var(--card-background)] rounded-lg shadow-md mb-8 border-[var(--border-color)]">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${selectedCategory === category
              ? 'bg-[var(--primary)] text-[var(--background)] shadow-lg'
              : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoriesBar;
