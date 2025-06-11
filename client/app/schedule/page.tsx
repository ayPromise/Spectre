"use client";

import React from "react";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable";
import { ScheduleProvider } from "@/context/ScheduleContext";

const SchedulePage: React.FC = () => {
  return (
    <ScheduleProvider>
      <ScheduleTable />
    </ScheduleProvider>
  );
};

export default SchedulePage;
