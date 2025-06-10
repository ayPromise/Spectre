"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAccess } from "@/hooks/useAccess";
import CreateButton from "@/components/custom/CreateButton";
const tabs = [
  { href: "/materials", label: "Всі" },
  { href: "/materials/lecture", label: "Лекції" },
  { href: "/materials/article", label: "Статті" },
  { href: "/materials/video", label: "Відео" },
];

const SubNavHeader: React.FC = () => {
  const pathName = usePathname();
  const { hasAdminAccess, hasInstructorAccess } = useAccess();

  const isActive = (href: string) => {
    if (href === "/materials") {
      return pathName === "/materials";
    }
    return pathName.startsWith(href);
  };

  return (
    <div className="relative w-full border-b border-border bg-background mb-8">
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
        {(hasAdminAccess || hasInstructorAccess) && (
          <Link href={`/materials/create`}>
            <CreateButton className="absolute right-0" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubNavHeader;
