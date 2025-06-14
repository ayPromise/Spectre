"use client";

import React, { useEffect, useState } from "react";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthStatus from "@/types/client/AuthStatus";
import { MaterialsProvider } from "@/context/MaterialsContext";

const Providers = ({
  children,
  user,
  cookieHeader = "",
}: {
  children: React.ReactNode;
  user: AuthStatus | null;
  cookieHeader: string;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <QueryProvider>
      <AuthProvider user={user} cookieHeader={cookieHeader}>
        <MaterialsProvider>{children}</MaterialsProvider>
      </AuthProvider>
      {hasMounted && (
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      )}
    </QueryProvider>
  );
};

export default Providers;
