"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import VideoPlayer from "@/components/VideoPlayer";

const VIDEOS_PER_PAGE = 5; // Define how many videos to fetch per page

export default function Home() {
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([] as any[]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();

  const fetchUploadedVideos = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/videos?page=${pageNumber}&limit=${VIDEOS_PER_PAGE}`);
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setUploadedVideos(prevVideos => [...prevVideos, ...data]);
        setHasMore(data.length === VIDEOS_PER_PAGE);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploadedVideos(page);
  }, [page, fetchUploadedVideos]);

  const lastVideoElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {uploadedVideos.length === 0 && !loading ? (
        <p className="text-center text-lg text-[var(--foreground)]">No videos uploaded yet. Be the first to upload!</p>
      ) : (
        <div className="flex flex-col items-center w-full">
            {uploadedVideos.map((video: any, index: number) => {
              if (uploadedVideos.length === index + 1) {
                return (
                  <div ref={lastVideoElementRef} key={video.id} className="w-full max-w-2xl mb-4">
                    <VideoPlayer
                      videoId={video.videoId}
                      onClose={() => {}}
                      autoPlay={true}
                    />
                    <div className="text-[var(--foreground)] mt-2">
                      <h2 className="text-xl font-bold">{video.title}</h2>
                      <p className="text-sm text-[var(--text-secondary)]">{video.author}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={video.id} className="w-full max-w-2xl mb-4">
                    <VideoPlayer
                      videoId={video.videoId}
                      onClose={() => {}}
                      autoPlay={true}
                    />
                    <div className="text-[var(--foreground)] mt-2">
                      <h2 className="text-xl font-bold">{video.title}</h2>
                      <p className="text-sm text-[var(--text-secondary)]">{video.author}</p>
                    </div>
                  </div>
                );
              }
            })}
            {loading && <p className="text-center text-lg text-[var(--foreground)]">Loading more videos...</p>}
        </div>
      )}
    </div>
  );
}
