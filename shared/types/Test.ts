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
  title: string;
  questions: Question[];
  summaryScore: number;
}
