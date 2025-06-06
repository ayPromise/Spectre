import { ID } from ".";
import { MaterialType, Specification } from "./Enums";

export interface Video {
  id: ID;
  title: string;
  description: string;
  videoURL: string;
  kind: MaterialType.Video;
  time: number;
  type: Specification;
  createdAt: Date;
  updatedAt: Date;
}
