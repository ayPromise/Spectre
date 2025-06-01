"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
  refetchUser: () => void;
}>({
  isAuth: false,
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
  const [isAuth, setIsAuth] = useState(initialAuth);

  useEffect(() => {
    if (data) setIsAuth(true);
    if (isError) setIsAuth(false);
  }, [data, isError]);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, refetchUser: () => refetch() }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
