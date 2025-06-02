"use client";

import React, { useState } from "react";
import ScheduleHeader from "./ScheduleHeader";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const ScheduleTable = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(6);
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleSetPreviousMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentYear((prev) => prev - 1);
    }
    setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
  };

  const handleSetNextMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentYear((prev) => prev + 1);
    }
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
  };

  return (
    <div className="max-w-[1000px]">
      <ScheduleHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrev={handleSetPreviousMonth}
        onNext={handleSetNextMonth}
      />
      <table className="table-fixed border-collapse">
        <TableHead />
        <TableBody totalDays={totalDays} />
      </table>
    </div>
  );
};

export default ScheduleTable;
