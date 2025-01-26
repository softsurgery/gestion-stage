import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ArrowDownUp, Contact, File } from "lucide-react";
import SidebarNav from "../Common/SidebarNav";

interface CoordinatorsAdminMainProps {
  className?: string;
  children?: React.ReactNode;
}

export const CoordinatorsAdminMain: React.FC<CoordinatorsAdminMainProps> = ({
  className,
  children,
}) => {
  //menu items
  const sidebarNavItems = [
    {
      title: "Coordinators",
      icon: <Contact size={18} />,
      href: "/coordinators",
    },
    {
      title: "Documents",
      icon: <File size={18} />,
      href: "/coordinators/documents",
    },
    {
      title: "Requests",
      icon: <ArrowDownUp size={18} />,
      href: "/coordinators/documents",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col flex-1 overflow-hidden m-5 lg:mx-10",
        className
      )}
    >
      <div className="space-y-0.5 py-5 sm:py-0">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Encandreurs
        </h1>
        <p className="text-muted-foreground">
          Gérer les informations des encandreurs
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-col flex-1 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12">
        <aside className="flex-1 mb-2">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex flex-col flex-[7] overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
