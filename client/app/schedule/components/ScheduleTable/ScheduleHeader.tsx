"use client";

import React from "react";
import MonthSelector from "../MonthSelector";
import { useSchedule } from "@/context/ScheduleContext";

const ScheduleHeader = () => {
  const { scheduleDate } = useSchedule();

  return (
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-md font-bold text-slate-300 -mb-5 ml-4">
        {scheduleDate.year} рік
      </h1>
      <MonthSelector />
    </div>
  );
};

export default ScheduleHeader;
