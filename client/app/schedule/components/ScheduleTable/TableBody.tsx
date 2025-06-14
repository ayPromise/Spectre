"use client";
import React, { useState } from "react";
import ScheduleDay from "./ScheduleDay";
import Lesson from "../Lesson";
import { useAccess } from "@/hooks/useAccess";
import ScheduleDialog from "../ScheduleDialog";
import { useSchedule } from "@/context/ScheduleContext";
import ScheduleSidebar from "../ScheduleSidebar";
import { Schedule } from "@shared/types";

const TableBody = () => {
  const { scheduleDate, schedules } = useSchedule();
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  const totalDays = new Date(
    scheduleDate.year,
    scheduleDate.month + 1,
    0
  ).getDate();
  const rows = Math.ceil(totalDays / 7);

  const canAddLesson = hasAdminAccess || hasInstructorAccess;

  return (
    <>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 7 }).map((_, colIndex) => {
              const dayIndex = rowIndex * 7 + colIndex;
              if (dayIndex >= totalDays) return <td key={colIndex} />;

              const currentDay = dayIndex + 1;

              const schedulesForDay = schedules.filter((schedule) => {
                const scheduleDateObj = new Date(schedule.date);
                return (
                  scheduleDateObj.getFullYear() === scheduleDate.year &&
                  scheduleDateObj.getMonth() === scheduleDate.month &&
                  scheduleDateObj.getDate() === currentDay
                );
              });

              const dateForSchedule = {
                day: currentDay,
                month: scheduleDate.month,
                year: scheduleDate.year,
              };

              return (
                <ScheduleDay key={colIndex} day={currentDay}>
                  {schedulesForDay.length > 0 ? (
                    schedulesForDay.map((schedule) => (
                      <Lesson
                        key={schedule._id}
                        schedule={schedule}
                        handleOnClick={() => setSelectedSchedule(schedule)}
                      />
                    ))
                  ) : canAddLesson ? (
                    <ScheduleDialog
                      date={dateForSchedule}
                      onClose={() => setSelectedSchedule(null)}
                    />
                  ) : null}
                </ScheduleDay>
              );
            })}
          </tr>
        ))}
      </tbody>

      <ScheduleSidebar
        schedule={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </>
  );
};

export default TableBody;
