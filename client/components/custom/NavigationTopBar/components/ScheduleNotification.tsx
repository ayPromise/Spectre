import { cn } from "@/lib/tiptap-utils";
import { Schedule } from "@shared/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ScheduleNotificationProps {
  schedule: Schedule;
  onHover: (id: string) => void;
  isRead: boolean;
}

const ScheduleNotification: React.FC<ScheduleNotificationProps> = ({
  schedule,
  onHover,
  isRead,
}) => {
  const { _id, title, date } = schedule;
  return (
    <Link
      href={"/schedule"}
      onMouseEnter={() => onHover(_id)}
      className={cn(
        "flex items-center gap-3 p-3 rounded transition duration-300 cursor-pointer group hover:bg-indigo-50",
        isRead ? "bg-white text-muted-foreground" : "bg-indigo-50"
      )}
    >
      <div className="flex justify-between items-center w-full rounded-md">
        <span>
          <div>З'явився новий запис в розкладі:</div>
          <div className="italic text-black truncate">
            {title} на {new Date(date).toLocaleDateString()}
          </div>
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
};

export default ScheduleNotification;
