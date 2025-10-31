"use client";

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onClose }) => {
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
          className="bg-[var(--card-background)] text-[var(--foreground)] p-4 rounded-lg shadow-2xl max-w-3xl w-full z-10 border-[var(--border-color)]"
          variants={modalVariants}
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300 text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
