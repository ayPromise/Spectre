import { ID } from ".";
import { MaterialType } from "./Enums";

export interface Video {
  _id: ID;
  title: string;
  description: string;
  videoURL: string;
  course: string;
  kind: MaterialType.Video;
  time: number;
  createdAt: Date;
  updatedAt: Date;
}
