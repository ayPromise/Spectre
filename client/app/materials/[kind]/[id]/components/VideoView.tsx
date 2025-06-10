import { Video } from "@shared/types";
import CompleteButton from "./CompleteButton";

type Props = {
  video: Video;
};

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  const videoId = match?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

const VideoView = ({ video }: Props) => {
  const embedUrl = getYouTubeEmbedUrl(video.videoURL);

  return (
    <div className="space-y-4">
      <p className="text-lg">{video.description}</p>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full rounded-md"
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="mt-[20px] flex w-full flex-row-reverse">
          <CompleteButton type={video.kind} videoId={video._id} />
        </div>
      </div>
    </div>
  );
};

export default VideoView;
