import { NextResponse } from 'next/server';

// This is a simulated in-memory store for uploaded videos.
// In a real application, this would be a database.
let uploadedVideos: any[] = [
  {
    id: 'uploaded-1',
    title: "My First Guitar Cover",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", // Using a generic thumbnail
    author: "LocalUser1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
    instrument: "Guitar",
    description: "A cover of a classic rock song on acoustic guitar.",
  },
  {
    id: 'uploaded-2',
    title: "Piano Improvisation Session",
    thumbnailUrl: "https://img.youtube.com/vi/yJg-Y5by-Ts/mqdefault.jpg",
    author: "LocalUser2",
    videoUrl: "https://www.youtube.com/embed/yJg-Y5by-Ts",
    instrument: "Piano",
    description: "An impromptu jazz piano session.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const paginatedVideos = uploadedVideos.slice(startIndex, endIndex);
  return NextResponse.json(paginatedVideos);
}

export async function POST(request: Request) {
  const { title, description, videoUrl } = await request.json();

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Basic validation
  if (!title || !videoUrl) {
    return NextResponse.json({ message: 'Title and Video URL are required' }, { status: 400 });
  }

  // Extract videoId from YouTube URL for thumbnail and embed
  let videoId = '';
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = videoUrl.match(youtubeRegex);
  if (match && match[1]) {
    videoId = match[1];
  } else {
    return NextResponse.json({ message: 'Invalid YouTube Video URL' }, { status: 400 });
  }

  const newVideo = {
    id: `uploaded-${uploadedVideos.length + 1}`, // Simple unique ID
    title,
    description,
    videoUrl: `https://www.youtube.com/embed/${videoId}`, // Store embed URL
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    author: "CurrentLoggedInUser", // Placeholder for logged-in user
    instrument: "Unknown", // Could be added to upload form later
  };

  uploadedVideos.push(newVideo);

  return NextResponse.json(newVideo, { status: 201 });
}
