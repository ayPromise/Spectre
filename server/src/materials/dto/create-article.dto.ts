import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';
import { TestDto } from './test.dto';
import { MaterialType } from '@shared/types';

export class CreateArticleDto {
  @IsEnum(MaterialType)
  kind: MaterialType.Article;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  timeToRead: number;

  @IsString()
  type: string;

  @ValidateNested({ each: true })
  @Type(() => TestDto)
  test: TestDto;
}
