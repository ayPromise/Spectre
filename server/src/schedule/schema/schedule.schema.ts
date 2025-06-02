import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ScheduleType } from '@shared/types';
import { HydratedDocument, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ScheduleType })
  type: ScheduleType;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  assignedUsers: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
