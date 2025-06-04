import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScheduleDate {
  month: number;
  year: number;
}

interface ScheduleDateContextValue {
  scheduleDate: ScheduleDate;
  setPreviousMonth: () => void;
  setNextMonth: () => void;
}

const ScheduleDateContext = createContext<ScheduleDateContextValue | undefined>(
  undefined
);

export const ScheduleDateProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleDate, setScheduleDate] = useState<ScheduleDate>({
    month: 6,
    year: 2025,
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
    <ScheduleDateContext.Provider
      value={{ scheduleDate, setPreviousMonth, setNextMonth }}
    >
      {children}
    </ScheduleDateContext.Provider>
  );
};

export const useScheduleDate = () => {
  const context = useContext(ScheduleDateContext);
  if (!context) {
    throw new Error(
      "useScheduleDate must be used within a ScheduleDateProvider"
    );
  }
  return context;
};
