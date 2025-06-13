import { UserRole } from '@shared/types';

declare module 'express' {
  interface Request {
    user: {
      userId: string;
      role: UserRole;
    };
  }
}
