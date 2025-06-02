"use client";

// HOOKS
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// UTILS
import { cn } from "@/lib/utils";
import { showError, showSuccess } from "@/utils/toast";

// COMPONENTS
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Trophy, FileText } from "lucide-react";

const links = [
  { href: "/", label: "Головна сторінка" },
  { href: "/dashboard", label: "Панель керування" },
  { href: "/materials", label: "Навчальні матеріали" },
  { href: "/schedule", label: "Розклад" },
  { href: "/archive", label: "Архіви польотів" },
  { href: "/profile", label: "Мій профіль" },
];

const iconOnlyLinks = [
  { href: "/profile/achievements", icon: Trophy, label: "Досягнення" },
  { href: "/profile/certificate", icon: FileText, label: "Сертифікати" },
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathName = usePathname();
  const { isAuth, setIsAuth } = useAuth();
  const router = useRouter();

  const toggleCollapse = (): void => {
    setCollapsed((prev) => !prev);
  };

  const isActive = (href: string) => {
    if (href === "/materials") return pathName.startsWith("/materials");
    if (href === "/archive") return pathName.startsWith("/archive");
    return pathName === href;
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/sign-out", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuth(false);
        router.push("/");
        showSuccess("Ви успішно вийшли зі свого профілю");
      } else {
        showError("Щось пішло не так. Звернітся до служби підтримки!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showError(`Помилка: ${error.message}`);
    }
  };

  return (
    isAuth && (
      <aside
        className={cn(
          "border-r border-border bg-background text-primary transition-all duration-300 ease-in-out relative pt-4",
          collapsed ? "w-2" : "min-w-52"
        )}
      >
        {/* Collapse button */}
        <div className="absolute -right-4">
          <Button
            variant="default"
            size="icon"
            onClick={toggleCollapse}
            className="cursor-pointer"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Full nav */}
        <nav className="flex flex-col gap-2 px-2">
          {!collapsed &&
            links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-muted hover:text-primary",
                  isActive(href) && "bg-muted"
                )}
              >
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}

          {/* Icon-only links */}
          <div className="flex flex-row gap-2 px-2 mt-4">
            {!collapsed &&
              iconOnlyLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "p-2 rounded-md hover:bg-muted transition-colors",
                    isActive(href) && "bg-muted"
                  )}
                  title={label}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </Link>
              ))}
          </div>

          {!collapsed && (
            <Button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                "mt-20 cursor-pointer"
              )}
              onClick={handleLogout}
            >
              <span>Вийти</span>
            </Button>
          )}
        </nav>
      </aside>
    )
  );
};

export default SideBar;
