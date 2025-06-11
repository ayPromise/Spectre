"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Trophy, User, Archive } from "lucide-react";
import { usePathname } from "next/navigation";
import io from "socket.io-client";
import { MaterialUnion } from "@shared/types";
import MaterialNotification from "./components/MaterialNotification";

const socket = io("http://localhost:3333");

const TopBar: React.FC = () => {
  const { isAuth, userData } = useAuth();
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasNewAchievements, setHasNewAchievements] = useState(false);
  const [notifications, setNotifications] = useState<MaterialUnion[]>([]);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (userData?.sub === parsed.userId) {
          setNotifications(
            parsed.notifications.filter((m: any) => !m.isRead).slice(0, 5)
          );
        }
      } catch (err) {
        console.error("Failed to parse notifications", err);
      }
    }
  }, []);

  useEffect(() => {
    const checkAchievements = () => {
      setHasNewAchievements(
        localStorage.getItem("hasNewAchievements") === "true"
      );
    };
    checkAchievements();

    const handleNewNotification = (material: MaterialUnion) => {
      setNotifications((prev) =>
        [{ ...material, isRead: false }, ...prev].slice(0, 5)
      );
    };
    socket.on("newMaterialNotification", handleNewNotification);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hasNewAchievements") checkAchievements();
    };
    const handleCustomEvent = checkAchievements;

    window.addEventListener("storage", handleStorage);
    window.addEventListener("achievement-change", handleCustomEvent);

    return () => {
      socket.off("newMaterialNotification", handleNewNotification);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("achievement-change", handleCustomEvent);
    };
  }, [userData]);

  useEffect(() => {
    if (isAuth) {
      const notificationsToSave = notifications.map((m) => ({
        ...m,
        isRead: readNotifications.has(m._id),
      }));
      localStorage.setItem(
        "notifications",
        JSON.stringify({
          notifications: notificationsToSave,
          userId: userData?.sub,
        })
      );
    }
  }, [isAuth, notifications, readNotifications, userData]);

  const handleNotificationHover = (id: string) => {
    setReadNotifications((prev) => new Set(prev).add(id));
  };

  const anchorLinks = [
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
            {anchorLinks.map(({ id, label }) => (
              <Link
                key={id}
                href={`/#${id}`}
                className="text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button className="rounded-xl px-6">Увійти</Button>
              </Link>
              <Link href="/#apply">
                <Button className="rounded-xl px-6">Приєднуйся</Button>
              </Link>
            </div>
          </nav>
        )}

        {isAuth && (
          <nav className="flex items-center gap-2 text-sm">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    "relative p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer",
                    pathname === "/profile/achievements" && "bg-muted"
                  )}
                >
                  <Archive className="w-5 h-5 text-primary" />
                  {notifications.some((m) => !readNotifications.has(m._id)) && (
                    <span className="absolute top-[4px] right-[4px] w-[7px] h-[7px] bg-indigo-600 rounded-full animate-pulse" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-80 p-1 rounded-xl shadow-xl"
              >
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Пусто ;)
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-auto pr-2 custom-scrollbar">
                    {notifications.map((material, idx) => (
                      <li key={idx}>
                        <MaterialNotification
                          material={material}
                          onHover={handleNotificationHover}
                          isRead={readNotifications.has(material._id)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </PopoverContent>
            </Popover>

            <Link
              href="/profile/achievements"
              className={cn(
                "relative p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors",
                pathname === "/profile/achievements" && "bg-muted"
              )}
            >
              <Trophy className="w-5 h-5 text-primary" />
              {hasNewAchievements && (
                <span className="absolute z-0 top-[4px] right-[4px] w-[7px] h-[7px] bg-indigo-600 rounded-full animate-pulse" />
              )}
            </Link>

            <Link href="/profile">
              <div className="flex gap-4 items-center px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                <User className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800 font-medium select-none">
                  Данило Дзюбчук
                </span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default TopBar;
