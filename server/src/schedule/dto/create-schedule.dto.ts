import { ID, LessonType, MeetingType  } from '@shared/types';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsEnum(LessonType)
  lessonType: LessonType;

  @IsEnum(MeetingType)
  meetingType: MeetingType;

  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @IsMongoId({ each: true })
  assignedUsers: string[];
}
