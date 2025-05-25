import { ID } from ".";
import { ScheduleType } from "./Enums";

export interface Schedule {
  id: ID;
  title: string;
  date: Date;
  type: ScheduleType;
  assignedUsers: ID[];
}
    