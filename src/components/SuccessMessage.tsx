"use client";

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
  redirectPath?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose, redirectPath }) => {
  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
        <motion.div
          className="bg-[var(--card-background)] text-[var(--foreground)] p-8 rounded-lg shadow-2xl max-w-sm w-full z-10 border-[var(--border-color)]"
          variants={modalVariants}
        >
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)] text-center">Success!</h2>
          <p className="text-center mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-[var(--primary)] text-[var(--background)] p-3 rounded-md font-semibold hover:bg-[var(--accent)] transition-colors duration-300"
          >
            {redirectPath ? "Continue" : "Close"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessMessage;
