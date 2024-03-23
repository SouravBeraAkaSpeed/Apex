import Video from "next-video";

interface VideoPlayerProps {
  className?: string;
  videoUrl: string;
}

const VideoPlayer = ({ className, videoUrl }: VideoPlayerProps) => {
  return <Video src={videoUrl} className={className ?? ""} />;
};

export default VideoPlayer;