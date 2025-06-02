import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@shared/types";
import { useMemo } from "react";

export function useAccess() {
  const { userData } = useAuth();
  const role = userData?.role;

  const access = useMemo(() => {
    const hasAdminAccess = role === UserRole.Admin;
    const hasInstructorAccess =
      role === UserRole.Instructor || hasAdminAccess;
    const hasStudentAccess =
      role === UserRole.Student || hasInstructorAccess;

    return {
      hasAdminAccess,
      hasInstructorAccess,
      hasStudentAccess,
    };
  }, [role]);

  return access;
}
