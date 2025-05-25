import { ID, ScheduleType } from "@shared/types";

interface CreateSchedulePayload {
  title: string;
  date: Date;
  type: ScheduleType;
}

interface UpdateSchedulePayload {
  title?: string;
  date?: Date;
  type?: ScheduleType;
  assignedUsers?: ID[];
}

export type {CreateSchedulePayload, UpdateSchedulePayload}