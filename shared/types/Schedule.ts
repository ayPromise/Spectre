import { ID } from ".";
import { LessonType, MeetingType } from "./Enums";

export interface Schedule {
  id: ID;
  title: string;
  date: Date;
  lessonType: LessonType;
  meetingType: MeetingType;
  note?: string;
  assignedUsers: ID[];
}
