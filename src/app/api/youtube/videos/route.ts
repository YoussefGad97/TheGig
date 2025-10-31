import { NextResponse } from 'next/server';

// This is a simulated API route for fetching YouTube videos.
// In a real application, you would integrate with the YouTube Data API here.

const dummyVideos = [
  {
    title: "Acoustic Guitar Lesson for Beginners",
    description: "Learn the basics of acoustic guitar with this easy-to-follow lesson.",
    videoId: "dQw4w9WgXcQ", // Unique YouTube Video ID 1
    author: "GuitarMaster",
    instrument: "Guitar",
  },
  {
    title: "How to Play Piano: The Basics",
    description: "A comprehensive guide for new piano players, covering chords and scales.",
    videoId: "yJg-Y5by-Ts", // Unique YouTube Video ID 2
    author: "PianoPro",
    instrument: "Piano",
  },
  {
    title: "Drumming Techniques for Rock Music",
    description: "Master powerful drumming techniques essential for rock and metal genres.",
    videoId: "nu5_x-23_00", // Unique YouTube Video ID 3
    author: "RockDrums",
    instrument: "Drums",
  },
  {
    title: "Violin for Dummies: Your First Song",
    description: "Start your violin journey with simple songs and fundamental techniques.",
    videoId: "K6g01_20000", // Unique YouTube Video ID 4
    author: "ViolinVirtuoso",
    instrument: "Violin",
  },
  {
    title: "Mastering the Electric Guitar Solo",
    description: "Advanced lessons on shredding and creating memorable electric guitar solos.",
    videoId: "g_gX_Y-Ts00", // Unique YouTube Video ID 5
    author: "ShredderX",
    instrument: "Guitar",
  },
  {
    title: "Jazz Piano Improvisation",
    description: "Unlock the secrets of jazz improvisation on the piano with these tutorials.",
    videoId: "P_gX_Y-Ts01", // Unique YouTube Video ID 6
    author: "JazzKeys",
    instrument: "Piano",
  },
  {
    title: "Advanced Drumming Rhythms",
    description: "Explore complex rhythms and polyrhythms to elevate your drumming skills.",
    videoId: "Q_gX_Y-Ts02", // Unique YouTube Video ID 7
    author: "BeatKeeper",
    instrument: "Drums",
  },
  {
    title: "Classical Violin Concertos",
    description: "Dive into the world of classical violin with performances and lessons on concertos.",
    videoId: "R_gX_Y-Ts03", // Unique YouTube Video ID 8
    author: "OrchestraLead",
    instrument: "Violin",
  },
  {
    title: "Beginner Bass Guitar Lessons",
    description: "Learn the fundamentals of bass guitar, including grooves and rhythm.",
    videoId: "S_gX_Y-Ts04", // Unique YouTube Video ID 9
    author: "BassGrooves",
    instrument: "Bass",
  },
  {
    title: "Flute Melodies for Relaxation",
    description: "Soothing flute melodies and techniques for relaxation and meditation.",
    videoId: "T_gX_Y-Ts05", // Unique YouTube Video ID 10
    author: "WindWhisperer",
    instrument: "Flute",
  },
];

// Function to generate YouTube thumbnail URL
const getThumbnailUrl = (videoId: string) => `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

// Add thumbnailUrl to each video object
dummyVideos.forEach(video => {
  (video as any).thumbnailUrl = getThumbnailUrl(video.videoId);
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('searchQuery') || '';
  const lowerCaseSearchQuery = searchQuery.toLowerCase();

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredVideos = dummyVideos;

  if (searchQuery && searchQuery !== 'All') {
    filteredVideos = dummyVideos.filter(video =>
      video.instrument.toLowerCase().includes(lowerCaseSearchQuery) ||
      video.title.toLowerCase().includes(lowerCaseSearchQuery) ||
      video.description.toLowerCase().includes(lowerCaseSearchQuery) ||
      video.author.toLowerCase().includes(lowerCaseSearchQuery)
    );
  }

  return NextResponse.json(filteredVideos);
}
