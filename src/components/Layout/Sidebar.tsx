import React from "react";
import { Pyramid } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MenuItem } from "./StaticMenu";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps {
  className?: string;
  items?: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ className, items }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <nav
        className={cn(
          "flex flex-col items-center gap-4 px-2 sm:py-5",
          className
        )}
      >
        <TooltipProvider>
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Pyramid className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Pyramid Manager</span>
          </Link>
          {items?.map((item) => {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                      router.asPath === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </React.Fragment>
  );
};
