import { ID } from "."
import { Permission } from "./Enums";

export interface UserRole {
  id: ID;
  title: string;
  permissions: Permission[];
}

export interface User {
  id: ID;
  email: string;
  avatarURL: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  completedArticles: ID[];
  completedVideos: ID[];
  certificates: ID[];
  achievements: ID[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
