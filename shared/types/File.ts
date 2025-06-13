import { ID } from ".";

export interface File {
  _id: ID;
  title: string;
  filePath: string;
  date: string;
  userId: string;
}
