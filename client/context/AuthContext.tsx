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
  const getInitialAuthState = () => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const { isAuthenticated, user, expiresAt } = JSON.parse(storedAuth);
        if (expiresAt > Date.now()) {
          return { isAuth: isAuthenticated, userData: user };
        }
        localStorage.removeItem("auth");
      } catch (error) {
        console.error(`Error parsing localStorage auth: ${error}`);
      }
    }
    return { isAuth: false, userData: null };
  };
  const { isAuth: initialIsAuth, userData: initialUserData } =
    getInitialAuthState();
  const [userData, setUserData] = useState<AuthStatus | null>(initialUserData);
  const [isAuth, setIsAuth] = useState<boolean>(initialIsAuth);

  const { data, isError, refetch } = useAuthStatus({
    enabled: !isAuth || !userData,
  });

  useEffect(() => {
    if (data) {
      setIsAuth(true);
      setUserData(data);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: data,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
      );
    } else if (isError) {
      setIsAuth(false);
      setUserData(null);
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
