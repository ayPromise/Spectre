"use client";

import React, { useEffect, useState } from "react";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({
  children,
  isAuth,
}: {
  children: React.ReactNode;
  isAuth: boolean;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <QueryProvider>
      <AuthProvider initialAuth={isAuth}>{children}</AuthProvider>
      {hasMounted && (
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      )}
    </QueryProvider>
  );
};

export default Providers;
