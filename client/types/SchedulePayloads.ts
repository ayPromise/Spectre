import { ID, LessonType, MeetingType } from "@shared/types";

interface CreateSchedulePayload {
  title: string;
  date: Date;
  lessonType: LessonType;
  meetingType: MeetingType;
  note?: string;
}

interface UpdateSchedulePayload {
  title?: string;
  date?: Date;
  lessonType?: LessonType;
  meetingType?: MeetingType;
  note?: string;
  assignedUsers?: ID[];
}

export type { CreateSchedulePayload, UpdateSchedulePayload };
