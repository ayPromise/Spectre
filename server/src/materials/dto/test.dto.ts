import { Type } from 'class-transformer';
import { IsString, IsArray, IsInt, ValidateNested } from 'class-validator';

export class QuestionDto {
  @IsString()
  question: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correctAnswer: string;
}

export class TestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsInt()
  summaryScore: number;
}
