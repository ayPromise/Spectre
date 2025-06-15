import { cn } from "@/lib/tiptap-utils";
import { Schedule } from "@shared/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ScheduleNotificationProps {
  schedule: Schedule;
  onHover: (id: string) => void;
  isRead: boolean;
  action: "edit" | "create";
}

const ScheduleNotification: React.FC<ScheduleNotificationProps> = ({
  schedule,
  onHover,
  isRead,
  action,
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
      <div className="flex justify-between items-center w-full rounded-md max-w-[270px]">
        <span>
          <div>
            {action === "edit" ? "Оновлено запис" : "Створено новий запис"}
          </div>
          <div className="italic text-black truncate">
            {new Date(date).toLocaleDateString()}: {title}
          </div>
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
};

export default ScheduleNotification;
