import React from "react";
import { MonthEnum } from "@/types/client/Schedule";
import MonthSelector from "../MonthSelector";

interface ScheduleHeaderProps {
  currentMonth: number;
  currentYear: number;
  onPrev: () => void;
  onNext: () => void;
}

const ScheduleHeader = ({
  currentMonth,
  currentYear,
  onPrev,
  onNext,
}: ScheduleHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-3xl font-bold">
        Розклад на {MonthEnum[currentMonth]} {currentYear} року
      </h1>
      <MonthSelector
        currentMonth={currentMonth}
        setPreviousMonth={onPrev}
        setNextMonth={onNext}
      />
    </div>
  );
};

export default ScheduleHeader;
