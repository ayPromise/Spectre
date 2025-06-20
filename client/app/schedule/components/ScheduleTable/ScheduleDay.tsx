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
        "relative border-2 border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 align-top h-[100px] min-w-[150px] aspect-square transition",
        isWeekend && "text-red-600"
      )}
    >
      <div className="absolute text-sm font-bold right-2">{day}</div>
      {children}
    </td>
  );
};

export default ScheduleDay;
