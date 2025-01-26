import { ChartNoAxesCombined, Contact, Settings, Users } from "lucide-react";

export interface MenuItem {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const items: MenuItem[] = [
  {
    id: 1,
    title: "Flux",
    href: "/workflow",
    icon: <ChartNoAxesCombined />,
  },
  {
    id: 2,
    title: "Encadreurs",
    href: "/internship-coordinator",
    icon: <Users />,
  },
  {
    id: 3,
    title: "Stagiaires",
    href: "/interns",
    icon: <Contact />,
  },
  {
    id: 4,
    title: "Paramètres",
    href: "/settings",
    icon: <Settings />,
  },
];
