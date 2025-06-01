"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
}>({
  isAuth: false,
  setIsAuth: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const { data, isError } = useAuthStatus();

  useEffect(() => {
    if (data) setIsAuth(true);
    if (isError) setIsAuth(false);
  }, [data, isError]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
