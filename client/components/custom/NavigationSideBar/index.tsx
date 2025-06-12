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
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useAccess } from "@/hooks/useAccess";
import client_endpoints from "@/app/api/client_endpoints";

const adminLinks = [{ href: "/dashboard", label: "Панель керування" }];

const links = [
  { href: "/", label: "Головна сторінка" },
  { href: "/schedule", label: "Розклад" },
  { href: "/materials", label: "Навчальні матеріали" },
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathName = usePathname();
  const { isAuth, setIsAuth } = useAuth();
  const { hasAdminAccess } = useAccess();
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
      const res = await fetch(client_endpoints.signOut, {
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
          "w-[230px] max-w-[230px] flex-grow border-r border-border bg-background text-primary transition-all duration-300 ease-in-out",
          collapsed ? "w-2" : "min-w-52"
        )}
      >
        {/* Full nav */}
        <nav className="sticky top-0 flex flex-col gap-2 px-2 pt-4">
          {/* Collapse button */}
          <div className="absolute -right-4">
            <Button
              variant="default"
              size="icon"
              onClick={toggleCollapse}
              className="cursor-pointer"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </Button>
          </div>
          {!collapsed && (
            <>
              {hasAdminAccess &&
                adminLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md text-sm transition-colors",
                      "hover:bg-muted hover:text-primary font-bold",
                      isActive(href) && "bg-muted"
                    )}
                  >
                    <span>{label}</span>
                  </Link>
                ))}

              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors",
                    "hover:bg-muted hover:text-primary",
                    isActive(href) && "bg-muted"
                  )}
                >
                  <span>{label}</span>
                </Link>
              ))}
            </>
          )}

          {!collapsed && (
            <Button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                "mt-10 cursor-pointer"
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
