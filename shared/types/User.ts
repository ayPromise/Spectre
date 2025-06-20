import { ID } from ".";
import { UserRole } from "./Enums";

export interface User {
  _id: ID;
  email: string;
  avatarURL: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  completedArticles: ID[];
  completedVideos: ID[];
  completedLectures: ID[];
  achievements: ID[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
