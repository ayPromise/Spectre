import { ID, LessonType, MeetingType } from '@shared/types';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  title: ID;

  @IsDateString()
  date: string;

  @IsEnum(LessonType)
  lessonType: LessonType;

  @IsEnum(MeetingType)
  meetingType: MeetingType;

  @IsOptional()
  @IsString()
  meetingURL?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @IsMongoId({ each: true })
  assignedUsers: string[];
}
