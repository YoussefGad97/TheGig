"use client";

import { useState, useEffect } from 'react';
import VideoCard from "@/components/VideoCard";
import CategoriesBar from "@/components/CategoriesBar";
import VideoPlayer from "@/components/VideoPlayer"; // Import VideoPlayer
import { motion, AnimatePresence } from 'framer-motion';

export default function Featured() { // Changed function name to Featured
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null); // State for playing video
  const categories = ['All', 'Guitar', 'Piano', 'Drums', 'Violin', 'Bass', 'Flute']; // Added new categories

  useEffect(() => {
    const fetchVideos = async () => {
      const query = selectedCategory === 'All' ? '' : `?searchQuery=${selectedCategory}`;
      const res = await fetch(`/api/youtube/videos${query}`);
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, [selectedCategory]);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  const handleCloseVideoPlayer = () => {
    setPlayingVideoId(null);
  };

  return (
    <div className="text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-4 text-[var(--primary)]">Featured Videos</h1>
      <CategoriesBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {videos.map((video: any) => (
            <motion.div
              key={video.videoId} // Use videoId as key for better stability
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VideoCard
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                author={video.author}
                videoId={video.videoId} // Pass videoId
                onVideoClick={handleVideoClick} // Pass click handler
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {playingVideoId && (
        <VideoPlayer
          videoId={playingVideoId}
          onClose={handleCloseVideoPlayer}
        />
      )}
    </div>
  );
}
