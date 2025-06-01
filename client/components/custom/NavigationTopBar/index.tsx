"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const TopBar: React.FC = () => {
  const { isAuth } = useAuth();

  const acnhorLinks = [
    { id: "about", label: "Про нас" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
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
      </div>
    </header>
  );
};

export default TopBar;
