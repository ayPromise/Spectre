import { Schedule } from "@shared/types";

interface SelectedSchedule extends Schedule {
  isPast: boolean;
}
export type { SelectedSchedule };
