import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

class QuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @IsBoolean()
  multipleAnswers: boolean;

  @IsInt()
  points: number;
}

export class CreateMaterialDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  type: string;

  @IsString()
  variant: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
