import React from "react";
import { cn } from "@/lib/utils"; // optional utility for class merging

interface ScheduleDayProps {
  children: React.ReactNode;
  day: number;
}

const ScheduleDay = ({ day, children }: ScheduleDayProps) => {
  const isWeekend = day % 7 === 0 || day % 7 === 6;

  return (
    <td
      className={cn(
        "relative border-2 border-black align-top h-[100px] min-w-[150px] aspect-square",
        isWeekend && "text-red-600"
      )}
    >
      <div className="absolute text-sm font-bold right-2">{day}</div>
      {children}
    </td>
  );
};

export default ScheduleDay;
