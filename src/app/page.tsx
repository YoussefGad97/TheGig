"use client";

import { useState, useEffect } from 'react';
import VideoCard from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer"; // Import VideoPlayer
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null); // State for playing video

  useEffect(() => {
    const fetchUploadedVideos = async () => {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setUploadedVideos(data);
    };

    fetchUploadedVideos();
  }, []); // Empty dependency array to fetch once on mount

  const handleVideoClick = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  const handleCloseVideoPlayer = () => {
    setPlayingVideoId(null);
  };

  return (
    <div className="text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-4 text-[var(--primary)]">Uploaded Videos</h1>
      {uploadedVideos.length === 0 ? (
        <p className="text-center text-lg">No videos uploaded yet. Be the first to upload!</p>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {uploadedVideos.map((video: any) => (
              <motion.div
                key={video.id} // Use unique ID for uploaded videos
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
      )}

      {playingVideoId && (
        <VideoPlayer
          videoId={playingVideoId}
          onClose={handleCloseVideoPlayer}
        />
      )}
    </div>
  );
}
