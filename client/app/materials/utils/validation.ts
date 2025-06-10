import { Question, Option } from "@shared/types";

export const isQuestionInvalid = (q: Question) =>
  !q.text.trim() ||
  q.points < 1 ||
  !q.options.some((opt) => opt.isCorrect) ||
  q.options.some((opt) => !opt.text.trim());

export const isInputInvalid = (text: string) => !text.trim();

export const isPointsInvalid = (points: number) => !points || points < 1;

export const isCorrectAnswerMissing = (options: Option[]) =>
  !options.some((opt) => opt.isCorrect);

export const isOptionsInvalid = (options: Option[]) =>
  !options.some((opt) => !opt.text.trim());
