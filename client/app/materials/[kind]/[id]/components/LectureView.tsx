import { Lecture } from "@shared/types/Lecture";

type Props = {
  lecture: Lecture;
};

const LectureView = ({ lecture }: Props) => {
  return (
    <div className="space-y-4">
      <p className="text-lg">{lecture.description}</p>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={lecture.videoURL}
          title={lecture.title}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default LectureView;
