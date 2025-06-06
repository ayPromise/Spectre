import { MaterialType } from '@shared/types';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';
import { TestDto } from './test.dto';

export class CreateVideoDto {
  @IsEnum(MaterialType)
  kind: MaterialType.Video;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoURL: string;

  @IsInt()
  time: number;

  @IsString()
  type: string;

  @ValidateNested({ each: true })
  @Type(() => TestDto)
  test: TestDto;
}
