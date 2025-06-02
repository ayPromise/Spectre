import { ID, UserRole } from "@shared/types";

interface AuthStatus {
    sub: ID,
    email: string,
    role: UserRole,
    iat: 1748896948,
    exp: 1748983348
}

export default AuthStatus