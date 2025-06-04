import React from "react";
import ScheduleDay from "./ScheduleDay";
import Lesson from "../Lesson";
import { useAccess } from "@/hooks/useAccess";
import CreateScheduleDialog from "../CreateScheduleDialog";
import { useScheduleDate } from "@/context/ScheduleDateContext";
import { MeetingType } from "@shared/types/Enums";

const TableBody = () => {
  const { scheduleDate } = useScheduleDate();
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const totalDays = new Date(
    scheduleDate.year,
    scheduleDate.month + 1,
    0
  ).getDate();
  const rows = Math.ceil(totalDays / 7);

  const lessonDays = [3, 15, 17];
  const canAddLesson = hasAdminAccess || hasInstructorAccess;

  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: 7 }).map((_, colIndex) => {
            const dayIndex = rowIndex * 7 + colIndex;
            if (dayIndex >= totalDays) return <td key={colIndex} />;

            const isLessonDay = lessonDays.includes(dayIndex);

            const dateForSchedule = {
              day: dayIndex + 1,
              month: scheduleDate.month,
              year: scheduleDate.year,
            };

            return (
              <ScheduleDay key={colIndex} day={dayIndex + 1}>
                {isLessonDay ? (
                  <Lesson
                    title={"Базові навички пілотування"}
                    type={MeetingType.Online}
                  />
                ) : canAddLesson ? (
                  <CreateScheduleDialog date={dateForSchedule} />
                ) : null}
              </ScheduleDay>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
