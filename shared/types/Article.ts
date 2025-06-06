import { ID, Test } from ".";
import { MaterialType, Specification } from "./Enums";

export interface Article {
  id: ID;
  title: string;
  content: string;
  timeToRead: number;
  type: Specification;
  kind: MaterialType.Article;
  test: Test;
  createdAt: Date;
  updatedAt: Date;
}
