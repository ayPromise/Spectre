export type UserRole = 'student' | 'instructor' | 'admin';

export interface IUser {
  // confidential info
  id: string;
  email?: string;
  hashedPassword: string;

  // personal info
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  profileImageUrl?: string;

  // user's activity
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date | null; // can be absent for the first login

  // user's progress
  completedArticles: string[]; // their ids
  completedLectures: string[]; // their ids
  completedVideos: string[]; // their ids
  certificates: string[]; // their ids
}


export type IUserClient = Omit<IUser, 'hashedPassword'>;
