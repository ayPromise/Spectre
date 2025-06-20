"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
