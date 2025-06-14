import { ID, Test } from ".";
import { MaterialType } from "./Enums";

export interface Article {
  _id: ID;
  title: string;
  content: string;
  timeToRead: number;
  course: string;
  kind: MaterialType.Article;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}
