import { ID } from ".";
import { Specification } from "./Enums";

export interface Video {
  id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: Specification;
  createdAt: Date;
  updatedAt: Date;
}
