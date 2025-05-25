import { ID, UserRole } from "@shared/types";

interface CreateUserPayload {
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

interface UpdateUserPayload {
  email?: string;
  avatarURL?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  completedArticles?: ID[];
  completedVideos?: ID[];
  certificates?: ID[];
  achievements?: ID[];
}

export type{ CreateUserPayload, UpdateUserPayload}