"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import AuthStatus from "@/types/client/AuthStatus";
import { QueryObserverResult } from "@tanstack/react-query";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
  userData: AuthStatus | null;
  setUserData: (v: AuthStatus) => void;
  refetchUser: () => Promise<QueryObserverResult<AuthStatus | null, Error>>;
}>({
  isAuth: false,
  userData: null,
  setIsAuth: () => {},
  setUserData: () => {},
  refetchUser: () => Promise.reject(new Error("Not implemented")),
});

export function AuthProvider({
  children,
  user = null,
}: {
  children: React.ReactNode;
  user: AuthStatus | null;
}) {
  console.log(
    `AuthProvider initialized with user: ${
      user ? JSON.stringify(user) : "null"
    }`
  );
  const { data, isError, refetch } = useAuthStatus({
    enabled: !user,
  });
  const [isAuth, setIsAuth] = useState<boolean>(!!user);
  const [userData, setUserData] = useState<AuthStatus | null>(user);

  useEffect(() => {
    console.log(
      `useAuthStatus result: data=${
        data ? JSON.stringify(data) : "null"
      }, isError=${isError}`
    );
    if (data) {
      setIsAuth(true);
      setUserData(data);
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
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
