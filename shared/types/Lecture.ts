import { ID } from ".";
import { MaterialType, Specification } from "./Enums";

export interface Lecture {
  _id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: Specification;
  kind: MaterialType.Lecture;
  createdAt: Date;
  updatedAt: Date;
}
