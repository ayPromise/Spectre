"use client";

import React from "react";
import { MonthEnum } from "@/types/client/Schedule";
import MonthSelector from "../MonthSelector";
import { useScheduleDate } from "@/context/ScheduleDateContext";

const ScheduleHeader = () => {
  const { scheduleDate } = useScheduleDate();

  return (
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-3xl font-bold">
        Розклад на {MonthEnum[scheduleDate.month]} {scheduleDate.year} року
      </h1>
      <MonthSelector />
    </div>
  );
};

export default ScheduleHeader;
