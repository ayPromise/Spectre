import { ID, Test } from ".";
import { MaterialType } from "./Enums";

export interface Lecture {
  _id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  course: string;
  kind: MaterialType.Lecture;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}
