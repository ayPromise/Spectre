"use client";

import React from "react";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable";
import { ScheduleProvider } from "@/context/ScheduleContext";

export const dynamic = "force-dynamic";

const SchedulePage: React.FC = () => {
  return (
    <div>
      <ScheduleProvider>
        <ScheduleTable />
      </ScheduleProvider>
    </div>
  );
};

export default SchedulePage;
