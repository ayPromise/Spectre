import { ID } from "."
import { MaterialType } from "./Enums";

export interface Option {
  title: string;
  isCorrect: boolean;
}

export interface Question {
  title: string;
  options: Option[];
  score: number;
}

export interface Test {
  title: string;
  questions: Question[];
  summaryScore: number;
}

export interface Article {
  id: ID;
  title: string;
  content: string;
  timeToRead: number;
  type: MaterialType;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}