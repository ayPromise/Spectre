import { ID } from ".";
import { LessonType, MeetingType } from "./Enums";

export interface Schedule {
  _id: ID;
  title: string;
  date: Date;
  lessonType: LessonType;
  meetingType: MeetingType;
  note?: string;
  assignedUsers: ID[];
}
