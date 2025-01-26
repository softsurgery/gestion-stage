import React from "react";
import { Pyramid } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem } from "./StaticMenu";
import Link from "next/link";

interface ResponisveSidebarProps {
  className?: string;
  items?: MenuItem[];
}

export const ResponsiveSidebar: React.FC<ResponisveSidebarProps> = ({
  className,
  items,
}) => {
  return (
    <nav className={cn("grid gap-6 text-lg font-medium", className)}>
      <Link
        href="/"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Pyramid className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Pyramid Manager</span>
      </Link>
      {items?.map((item) => {
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              location.pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
