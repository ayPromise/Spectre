export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  options: Option[];
  points: number;
  multipleAnswers: boolean;
}

export interface Test {
  questions: Question[];
  summaryScore: number;
}
