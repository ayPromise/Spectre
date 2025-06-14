import { cn } from "@/lib/utils";
import { Schedule } from "@shared/types";
import { MeetingType, MeetingTypeNameUA } from "@shared/types/Enums";
import React from "react";

interface LessonProps {
  schedule: Schedule;
  handleOnClick: () => void;
  isPast: boolean;
}

const typeColors: Record<MeetingType, string> = {
  [MeetingType.Offline]: "bg-blue-100 text-blue-800",
  [MeetingType.Online]: "bg-green-100 text-green-800",
};

const typeHoverColors: Record<MeetingType, string> = {
  [MeetingType.Offline]: "hover:bg-blue-200 hover:text-blue-900",
  [MeetingType.Online]: "hover:bg-green-200 hover:text-green-900",
};

const Lesson: React.FC<LessonProps> = ({ schedule, handleOnClick, isPast }) => {
  const { title, meetingType } = schedule;

  const now = new Date();
  const scheduleDate = new Date(schedule.date);

  const twoHoursLater = new Date(scheduleDate.getTime() + 2 * 60 * 60 * 1000);

  const isActive = now >= scheduleDate && now <= twoHoursLater;

  const blinkColors: Record<MeetingType, { start: string; mid: string }> = {
    [MeetingType.Offline]: { start: "#bfdbfe", mid: "#93c5fd" },
    [MeetingType.Online]: { start: "#bbf7d0", mid: "#86efac" },
  };
  return (
    <div
      className={cn(
        `w-full h-full p-1 text-xs cursor-pointer
  ${typeColors[meetingType]} ${typeHoverColors[meetingType]} transition`,
        isActive && "animate-blink",
        isPast && "opacity-50 grayscale"
      )}
      onClick={handleOnClick}
      style={
        isActive
          ? ({
              "--blink-color-start": blinkColors[meetingType].start,
              "--blink-color-mid": blinkColors[meetingType].mid,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="font-bold max-w-[140px]">{title}</div>
      <div className="text-[10px] opacity-70">
        {MeetingTypeNameUA[meetingType]}
        {isActive && "adasd"}
      </div>
    </div>
  );
};

export default Lesson;
