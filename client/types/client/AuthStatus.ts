import { ID, UserRole } from "@shared/types";

interface AuthStatus {
  sub: ID;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export default AuthStatus;
