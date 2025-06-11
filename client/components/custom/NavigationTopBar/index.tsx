"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Trophy, User, Archive } from "lucide-react";
import { usePathname } from "next/navigation";

const TopBar: React.FC = () => {
  const { isAuth } = useAuth();
  const pathName = usePathname();
  const [hasNewAchievements, setHasNewAchievements] = useState<boolean>(false);

  useEffect(() => {
    const checkAchievements = () => {
      const hasNew = localStorage.getItem("hasNewAchievements") === "true";
      setHasNewAchievements(hasNew);
    };

    checkAchievements();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hasNewAchievements") {
        checkAchievements();
      }
    };

    const handleCustomEvent = () => {
      checkAchievements();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("achievement-change", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("achievement-change", handleCustomEvent);
    };
  }, []);

  const acnhorLinks = [
    { id: "about", label: "Про нас" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="flex items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:opacity-80"
        >
          Спектр
        </Link>
        {!isAuth && (
          <nav className="hidden md:flex gap-6 items-center">
            {acnhorLinks.map(({ id, label }) => (
              <Link
                href={`/#${id}`}
                key={id}
                className={cn("text-sm font-medium transition-colors")}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="default"
                  className="rounded-xl px-6 cursor-pointer"
                >
                  Увійти
                </Button>
              </Link>
              <Link href="/#apply">
                <Button
                  variant="default"
                  className="rounded-xl px-6 cursor-pointer"
                >
                  Приєднуйся
                </Button>
              </Link>
            </div>
          </nav>
        )}
        {isAuth && (
          <nav className="flex items-center gap-2 text-sm">
            <div
              className={cn(
                "relative p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer",
                pathName === "/profile/achievements" && "bg-muted "
              )}
            >
              <Archive className="w-5 h-5 text-primary" />
              {hasNewAchievements && (
                <span className="absolute z-0 top-[4px] right-[4px] w-[7px] h-[7px] bg-indigo-600 rounded-full animate-pulse" />
              )}
            </div>

            <Link
              href={"/profile/achievements"}
              className={cn(
                "relative p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors",
                pathName === "/profile/achievements" && "bg-muted "
              )}
            >
              <Trophy className="w-5 h-5 text-primary" />
              {hasNewAchievements && (
                <span className="absolute z-0 top-[4px] right-[4px] w-[7px] h-[7px] bg-indigo-600 rounded-full animate-pulse" />
              )}
            </Link>

            <Link href={"/profile"}>
              <div className="flex gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition">
                <User className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800 font-medium select-none">
                  Данило Дзюбчук
                </span>
              </div>
            </Link>
          </nav>
        )}{" "}
      </div>
    </header>
  );
};

export default TopBar;
