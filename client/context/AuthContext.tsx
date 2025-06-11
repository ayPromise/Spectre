"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import AuthStatus from "@/types/client/AuthStatus";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
  userData: AuthStatus | null;
  setUserData: (v: AuthStatus) => void;
  refetchUser: () => void;
}>({
  isAuth: false,
  userData: null,
  setIsAuth: () => {},
  setUserData: () => {},
  refetchUser: () => {},
});

export function AuthProvider({
  children,
  user = null,
}: {
  children: React.ReactNode;
  user: AuthStatus | null;
}) {
  const { data, isError, refetch } = useAuthStatus({
    enabled: !user,
  });
  const [isAuth, setIsAuth] = useState<boolean>(!!user);
  const [userData, setUserData] = useState<AuthStatus | null>(user);

  useEffect(() => {
    if (data) {
      setIsAuth(true);
      setUserData(data.user);
    }
    if (isError) setIsAuth(false);
  }, [data, isError]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userData,
        setUserData,
        refetchUser: () => refetch(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
