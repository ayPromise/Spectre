import { Question } from "@shared/types";

export interface CreateMaterialPayload {
  title: string;
  description?: string;
  content: string;
  questions: Question[];
}
