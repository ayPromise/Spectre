import { ID, Test } from ".";
import { MaterialType, Specification } from "./Enums";

export interface Lecture {
  _id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: Specification;
  kind: MaterialType.Lecture;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}
