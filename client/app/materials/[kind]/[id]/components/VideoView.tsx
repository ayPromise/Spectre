import { Video } from "@shared/types/Video";

type Props = {
  video: Video;
};

const VideoView = ({ video }: Props) => {
  return (
    <div className="space-y-4">
      <p className="text-lg">{video.description}</p>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={video.videoURL}
          title={video.title}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoView;
