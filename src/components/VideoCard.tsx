interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  author: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnailUrl, author }) => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-gray-800">
      <div className="w-full h-48 bg-gray-700" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-gray-400">{author}</p>
      </div>
    </div>
  );
};

export default VideoCard;
