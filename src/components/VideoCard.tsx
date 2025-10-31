interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  author: string;
  videoId: string; // Add videoId to props
  onVideoClick: (videoId: string) => void; // Add click handler
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnailUrl, author, videoId, onVideoClick }) => {
  return (
    <div
      className="border-[var(--border-color)] rounded-lg overflow-hidden shadow-lg bg-[var(--card-background)] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => onVideoClick(videoId)} // Call onVideoClick with videoId
    >
      <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-[var(--foreground)]">{title}</h3>
        <p className="text-[var(--accent)] text-sm">{author}</p>
      </div>
    </div>
  );
};

export default VideoCard;
