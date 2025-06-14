import { useSchedule } from "@/context/ScheduleContext";
import { Schedule } from "@shared/types";
import { MeetingType, MeetingTypeNameUA } from "@shared/types/Enums";
import React from "react";

interface LessonProps {
  schedule: Schedule;
  handleOnClick: () => void;
}

const typeColors: Record<MeetingType, string> = {
  [MeetingType.Offline]: "bg-blue-100 text-blue-800",
  [MeetingType.Online]: "bg-green-100 text-green-800",
};

const typeHoverColors: Record<MeetingType, string> = {
  [MeetingType.Offline]: "hover:bg-blue-200 hover:text-blue-900",
  [MeetingType.Online]: "hover:bg-green-200 hover:text-green-900",
};

const Lesson: React.FC<LessonProps> = ({ schedule, handleOnClick }) => {
  const { title, meetingType } = schedule;

  return (
    <div
      className={`w-full h-full p-1 text-xs cursor-pointer 
  ${typeColors[meetingType]} ${typeHoverColors[meetingType]} transition`}
      onClick={handleOnClick}
    >
      <div className="font-bold max-w-[140px]">{title}</div>
      <div className="text-[10px] opacity-70">
        {MeetingTypeNameUA[meetingType]}
      </div>
    </div>
  );
};

export default Lesson;
