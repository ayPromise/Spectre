"use client";

import React, { useEffect, useState } from "react";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MaterialsProvider } from "@/context/MaterialsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <QueryProvider>
      {hasMounted && (
        <>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
          <AuthProvider>
            <MaterialsProvider>{children}</MaterialsProvider>
          </AuthProvider>
        </>
      )}
    </QueryProvider>
  );
};

export default Providers;
