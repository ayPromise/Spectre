"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const TopBar: React.FC = () => {
    const pathName = usePathname()

    const navLinks = [
        { href: "/about", label: "About Us" },
        { href: "/faq", label: "FAQ" },
    ];

    return (
        <header className="w-full border-b border-border bg-background">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                <Link href="/" className="text-xl font-bold text-primary hover:opacity-80">
                    IcarusEye
                </Link>

                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            href={href}
                            key={href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                pathName === href ? "text-primary" : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-4">
                        <Link href="/sign-in">
                            <Button variant="default" className="rounded-xl px-6 cursor-pointer">
                                Join
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default TopBar;
