import { UserRole } from '@shared/types';

declare module 'express' {
  interface Request {
    user: {
      sub: string;
      role: UserRole;
    };
  }
}
