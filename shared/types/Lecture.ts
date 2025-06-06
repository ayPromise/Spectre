import { ID } from ".";
import { Specification } from "./Enums";

export interface Lecture {
  id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: Specification;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
