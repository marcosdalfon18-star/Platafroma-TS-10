import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Search,
  Wallet,
  Clock,
  Target,
  ShieldCheck,
  Cpu,
  Book,
  Megaphone,
  FileText,
  Settings,
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: Array<"consultor" | "empresario" | "empleado" | "gestor">;
};

export const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["consultor", "empresario", "empleado", "gestor"],
  },
  {
    href: "/org-chart",
    label: "Organigrama",
    icon: Users,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/job-analysis",
    label: "Análisis de Puestos",
    icon: ClipboardList,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/selection-processes",
    label: "Procesos de Selección",
    icon: Search,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/payroll",
    label: "Gestión de Nóminas",
    icon: Wallet,
    roles: ["consultor", "empresario", "gestor"],
  },
  {
    href: "/time-tracking",
    label: "Control Horario",
    icon: Clock,
    roles: ["consultor", "empresario", "empleado"],
  },
  {
    href: "/marketing",
    label: "Marketing Estratégico",
    icon: Target,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/cybersecurity",
    label: "Ciberseguridad",
    icon: ShieldCheck,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/ai-agents",
    label: "Agentes IA",
    icon: Cpu,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/company-manual",
    label: "Manual de Empresa",
    icon: Book,
    roles: ["consultor", "empresario", "empleado"],
  },
  {
    href: "/communications",
    label: "Comunicaciones",
    icon: Megaphone,
    roles: ["consultor", "empresario", "gestor"],
  },
  {
    href: "/reports",
    label: "Centro de Informes",
    icon: FileText,
    roles: ["consultor", "empresario"],
  },
  {
    href: "/plan-management",
    label: "Gestión de Planes",
    icon: Settings,
    roles: ["consultor"],
  },
];
