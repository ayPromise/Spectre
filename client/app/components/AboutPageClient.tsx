"use client";

import { JSX } from "react";
import ApplySection from "./ApplySection";
import { useAuth } from "@/context/AuthContext";

export default function AboutPageClient(): JSX.Element {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className="flex justify-center items-center h-[50%]">
      <h1 className="text-[80px] font-black bg-gradient-to-r from-black via-indigo-500 to-black bg-[length:500%_100%] bg-left bg-clip-text text-transparent animate-gradient-x">
        Welcome back!
      </h1>
    </div>
  ) : (
    <ApplySection />
  );
}
