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
import MaterialNotification from "./components/MaterialNotification";
import {
  StorageNotifications,
  WebSocketNotification,
} from "@/types/client/Notification";
import { MaterialUnion, Schedule } from "@shared/types";
import ScheduleNotification from "./components/ScheduleNotification";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const socket = io(SOCKET_URL);

const TopBar: React.FC = () => {
  const { isAuth, userData } = useAuth();
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasNewAchievements, setHasNewAchievements] = useState(false);
  const [notifications, setNotifications] = useState<WebSocketNotification[]>(
    []
  );
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StorageNotifications;
        if (userData?.sub === parsed.userId) {
          setNotifications(
            parsed.notifications.filter((item) => !item.isRead).slice(0, 5)
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

    const handleNewNotification = (item: WebSocketNotification) => {
      setNotifications((prev) => {
        const exists = prev.some((not) => not.data._id === item.data._id);
        if (exists) return prev;
        return [item, ...prev].slice(0, 5);
      });
    };

    socket.on("newNotification", handleNewNotification);

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
      const notificationsToSave = notifications.map((item) => ({
        ...item,
        isRead: readNotifications.has(item.data._id),
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
      <div className="flex items-center justify-between px-16 py-4">
        <Link
          href="/"
          className="font-bold text-primary hover:opacity-80 saira text-[24px] flex items-center gap-2"
        >
          {" "}
          <div className="w-[28px]">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Checkmk</title>
              <path d="M5.187 8.738v3.985l4.883-3.157v8.217l1.925 1.111 1.926-1.111V9.57l4.882 3.158V8.742l-6.808-4.269-6.808 4.265zM12 0l10.375 5.999V18L12 24 1.625 18.006V6.003L12 0z" />
            </svg>
          </div>
          SPECTRE
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
                  {notifications.some(
                    (item) => !readNotifications.has(item.data._id)
                  ) && (
                    <span className="absolute top-[4px] right-[4px] w-[7px] h-[7px] bg-indigo-600 rounded-full animate-pulse" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-80 p-1 rounded-xl shadow-xl"
              >
                {notifications.length === 0 ? (
                  <p className="text-[15px] text-muted-foreground py-1 pl-2">
                    Відсутні нові сповіщення
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-auto pr-2 custom-scrollbar">
                    {notifications.map((item, idx) => {
                      if (item.type === "material") {
                        return (
                          <MaterialNotification
                            key={idx}
                            material={item.data as MaterialUnion}
                            onHover={handleNotificationHover}
                            isRead={readNotifications.has(item.data._id)}
                          />
                        );
                      } else {
                        return (
                          <ScheduleNotification
                            key={idx}
                            schedule={item.data as Schedule}
                            onHover={handleNotificationHover}
                            isRead={readNotifications.has(item.data._id)}
                          />
                        );
                      }
                    })}
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
                  {userData?.firstName} {userData?.lastName}
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
