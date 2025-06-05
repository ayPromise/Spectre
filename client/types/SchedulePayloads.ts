import { ID, LessonType, MeetingType } from "@shared/types";

interface CreateSchedulePayload {
  title: string;
  date: Date;
  lessonType: LessonType;
  meetingType: MeetingType;
  note?: string;
}

interface UpdateSchedulePayload {
  _id?: string;
  title?: string;
  date?: Date;
  lessonType?: LessonType;
  meetingType?: MeetingType;
  note?: string;
  assignedUsers?: ID[];
}

export type { CreateSchedulePayload, UpdateSchedulePayload };
