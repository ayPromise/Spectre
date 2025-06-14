import { ID } from ".";

export interface Option {
  _id?: ID;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id?: ID;
  text: string;
  options: Option[];
  points: number;
  multipleAnswers: boolean;
}

export interface Test {
  _id?: ID;
  questions: Question[];
  summaryScore: number;
}
