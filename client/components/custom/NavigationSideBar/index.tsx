"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, Trophy, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/materials", label: "Materials" },
    { href: "/schedule", label: "Schedule" },
    { href: "/archive", label: "Flight Archive" },
    { href: "/profile", label: "Profile" },
];

const iconOnlyLinks = [
    { href: "/profile/achievements", icon: Trophy, label: "Achievements" },
    { href: "/profile/certificate", icon: FileText, label: "Certificate" },
];

const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const pathName = usePathname();

    const toggleCollapse = (): void => {
        setCollapsed((prev) => !prev);
    };

    const isActive = (href: string) => {
        if (href === "/materials") return pathName.startsWith("/materials");
        if (href === "/archive") return pathName.startsWith("/archive");
        return pathName === href;
    };

    return (
        <aside
            className={cn(
                "border-r border-border bg-background text-primary transition-all duration-300 ease-in-out relative pt-4",
                collapsed ? "w-16" : "min-w-52"
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
                {!collapsed && links.map(({ href, label }) => (
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
                    {!collapsed && iconOnlyLinks.map(({ href, icon: Icon, label }) => (
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

                {!collapsed && <Button
                    className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        "mt-20 cursor-pointer"
                    )}
                >
                    <span>Sign Out</span>
                </Button>}
            </nav>
        </aside>
    );
};

export default SideBar;
