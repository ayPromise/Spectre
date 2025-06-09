"use client";

import { JSX } from "react";
import ApplySection from "./ApplySection";
import { useAuth } from "@/context/AuthContext";

export default function AboutPageClient(): JSX.Element {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="text-xl font-semibold">Welcome back!</div>
  ) : (
    <ApplySection />
  );
}
