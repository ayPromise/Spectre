"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import AuthStatus from "@/types/client/AuthStatus";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
  userData: AuthStatus | null;
  refetchUser: () => void;
}>({
  isAuth: false,
  userData: null,
  setIsAuth: () => {},
  refetchUser: () => {},
});

export function AuthProvider({
  children,
  initialAuth = false,
}: {
  children: React.ReactNode;
  initialAuth?: boolean;
}) {
  const { data, isError, refetch } = useAuthStatus();
  const [isAuth, setIsAuth] = useState<boolean>(initialAuth);
  const [userData, setUserData] = useState<AuthStatus | null>(null);

  useEffect(() => {
    if (data) {
      setIsAuth(true);
      setUserData(data.user);
    }
    if (isError) setIsAuth(false);
  }, [data, isError]);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, userData, refetchUser: () => refetch() }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
