import { ID, Test } from ".";
import { MaterialType, Specification } from "./Enums";

export interface Video {
  _id: ID;
  title: string;
  description: string;
  videoURL: string;
  kind: MaterialType.Video;
  time: number;
  type: Specification;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}
