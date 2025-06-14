import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';
import { TestDto } from './test.dto';
import { MaterialType } from '@shared/types';

export class CreateLectureDto {
  @IsEnum(MaterialType)
  kind: MaterialType.Lecture;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoURL: string;

  @IsInt()
  time: number;

  @IsString()
  course: string;

  @ValidateNested({ each: true })
  @Type(() => TestDto)
  test: TestDto;
}
