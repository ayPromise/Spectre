"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/materials", label: "Все" },
  { href: "/materials/lecture", label: "Лекції" },
  { href: "/materials/article", label: "Статті" },
  { href: "/materials/video", label: "Відео" },
];

const SubNavHeader: React.FC = () => {
  const pathName = usePathname();

  const isActive = (href: string) => {
    return pathName === href;
  };

  return (
    <div className="w-full border-b border-border bg-background mb-8">
      <div className="max-w-7xl flex overflow-x-auto gap-8">
        {tabs.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-medium whitespace-nowrap py-3 border-b-2 transition-colors min-w-10 flex justify-center",
              isActive(href)
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-primary hover:border-border"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubNavHeader;
