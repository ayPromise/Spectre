import { Schedule } from "@shared/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const ScheduleContext = createContext<ScheduleContextValue | undefined>(
  undefined
);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleDate, setScheduleDate] = useState<ScheduleDate>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/schedule`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error(error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

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

  const refetchSchedules = async () => {
    await fetchSchedules();
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleDate,
        schedules,
        setPreviousMonth,
        setNextMonth,
        refetchSchedules,
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
