"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TopBar: React.FC = () => {
    const navLinks = [
        { id: "about", label: "About Us" },
        { id: "faq", label: "FAQ" },
    ];

    return (
        <header className="w-full border-b border-border bg-background">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

                <Link href="/" className="text-xl font-bold text-primary hover:opacity-80">
                    IcarusEye
                </Link>

                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map(({ id, label }) => (
                        <Link
                            href={`#${id}`}
                            key={id}
                            className={cn(
                                "text-sm font-medium transition-colors")}
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-4">
                        <Link href="#apply">
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
