"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import AuthStatus from "@/types/client/AuthStatus";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { QueryObserverResult } from "@tanstack/react-query";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userData: AuthStatus | null;
  setUserData: React.Dispatch<React.SetStateAction<AuthStatus | null>>;
  refetchUser: () => Promise<QueryObserverResult<AuthStatus | null, Error>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  userData: null,
  setUserData: () => {},
  refetchUser: async () =>
    ({
      data: null,
      status: "idle",
      isError: false,
      isLoading: false,
      isSuccess: false,
      error: null,
    } as unknown as QueryObserverResult<AuthStatus | null, Error>),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<AuthStatus | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(!!userData);

  const { data, isError, refetch } = useAuthStatus({ enabled: true });

  useEffect(() => {
    console.log(
      `useAuthStatus result: data=${
        data ? JSON.stringify(data) : "null"
      }, isError=${isError}`
    );
    if (data) {
      setIsAuth(true);
      setUserData(data);
      console.log(`Updated userData: ${JSON.stringify(data)}`);
    } else if (isError) {
      setIsAuth(false);
      setUserData(null);
      console.log(`Cleared userData due to error`);
    }
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
