import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LessonType, MeetingType } from '@shared/types';
import { HydratedDocument, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: LessonType })
  lessonType: LessonType;

  @Prop({ required: true, enum: MeetingType })
  meetingType: MeetingType;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  assignedUsers: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
