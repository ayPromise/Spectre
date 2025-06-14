import { Lecture } from "@shared/types/Lecture";

type Props = {
  lecture: Lecture;
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const LectureView = ({ lecture }: Props) => {
  return (
    <div className="space-y-4">
      <p className="text-lg">{lecture.description}</p>
      <div className="aspect-video w-full">
        <video controls className="w-full h-full">
          <source src={`${SERVER_URL}${lecture.videoURL}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LectureView;
