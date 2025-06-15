import getAllSchedules from "@/app/schedule/utils/getAllSchedules";
import { Schedule } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScheduleDate {
  month: number;
  year: number;
}

interface ScheduleContextValue {
  scheduleDate: ScheduleDate;
  schedules: Schedule[];
  setPreviousMonth: () => void;
  setNextMonth: () => void;
  refetchSchedules: () => void;
  loading: boolean;
}

const ScheduleContext = createContext<ScheduleContextValue | undefined>(
  undefined
);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleDate, setScheduleDate] = useState<ScheduleDate>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    data: schedules = [],
    isLoading: loading,
    refetch,
  } = useQuery<Schedule[]>({
    queryKey: ["schedules"],
    queryFn: getAllSchedules,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  const setPreviousMonth = () => {
    setScheduleDate((prev) =>
      prev.month === 0
        ? { month: 11, year: prev.year - 1 }
        : { ...prev, month: prev.month - 1 }
    );
  };

  const setNextMonth = () => {
    setScheduleDate((prev) =>
      prev.month === 11
        ? { month: 0, year: prev.year + 1 }
        : { ...prev, month: prev.month + 1 }
    );
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleDate,
        schedules,
        setPreviousMonth,
        setNextMonth,
        refetchSchedules: refetch,
        loading,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleDateProvider");
  }
  return context;
};
