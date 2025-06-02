import { ID, ScheduleType } from '@shared/types';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsEnum(ScheduleType)
  type: ScheduleType;

  @IsArray()
  @IsMongoId({ each: true })
  assignedUsers: string[];
}
