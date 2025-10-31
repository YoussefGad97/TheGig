import VideoCard from "@/components/VideoCard";

const videos = [
  {
    title: "Acoustic Guitar Lesson for Beginners",
    thumbnailUrl: "/placeholder.svg",
    author: "GuitarMaster",
  },
  {
    title: "How to Play Piano: The Basics",
    thumbnailUrl: "/placeholder.svg",
    author: "PianoPro",
  },
  {
    title: "Drumming Techniques for Rock Music",
    thumbnailUrl: "/placeholder.svg",
    author: "RockDrums",
  },
  {
    title: "Violin for Dummies: Your First Song",
    thumbnailUrl: "/placeholder.svg",
    author: "ViolinVirtuoso",
  },
];

export default function Home() {
  return (
    <div className="text-foreground">
      <h1 className="text-3xl font-bold mb-4">Featured Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            author={video.author}
          />
        ))}
      </div>
    </div>
  );
}
