import { ScheduleType } from "@shared/types";
import { ScheduleTypeNameUA } from "@shared/types/Enums";
import Link from "next/link";
import React from "react";

interface LessonProps {
  title: string;
  type: ScheduleType;
}

const typeColors: Record<ScheduleType, string> = {
  [ScheduleType.Offline]: "bg-blue-100 text-blue-800",
  [ScheduleType.Online]: "bg-green-100 text-green-800",
  [ScheduleType.PracticalFlight]: "bg-yellow-100 text-yellow-800",
  [ScheduleType.Mixed]: "bg-purple-100 text-purple-800",
};

const typeHoverColors: Record<ScheduleType, string> = {
  [ScheduleType.Offline]: "hover:bg-blue-200 hover:text-blue-900",
  [ScheduleType.Online]: "hover:bg-green-200 hover:text-green-900",
  [ScheduleType.PracticalFlight]: "hover:bg-yellow-200 hover:text-yellow-900",
  [ScheduleType.Mixed]: "hover:bg-purple-200 hover:text-purple-900",
};

const Lesson: React.FC<LessonProps> = ({ title, type }) => {
  return (
    <Link href="/schedule/10">
      <div
        className={`w-full h-full rounded p-1 text-xs cursor-pointer 
      ${typeColors[type]} ${typeHoverColors[type]} transition`}
      >
        <div className="font-bold">{title}</div>
        <div className="text-[10px] opacity-70">{ScheduleTypeNameUA[type]}</div>
      </div>
    </Link>
  );
};

export default Lesson;
