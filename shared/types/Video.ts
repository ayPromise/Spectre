import { ID } from "."
import { MaterialType } from "./Enums"

export interface Video {
  id: ID;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: MaterialType;
  createdAt: Date;
  updatedAt: Date;
}
    