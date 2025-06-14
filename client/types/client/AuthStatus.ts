import { ID, UserRole } from "@shared/types";

interface AuthStatus {
  _id: ID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  iat: number;
  exp: number;
  completedArticles: ID[];
  completedVideos: ID[];
  completedLectures: ID[];
  achievements: ID[];
}

export default AuthStatus;
