import {
  Users,
  MessageSquare,
  Cpu,
  Target,
  Megaphone,
  LayoutDashboard,
  FileText,
  Clock,
  ShieldCheck,
  DollarSign,
  BookOpen,
  Briefcase,
  UserCheck,
  GraduationCap,
  TrendingUp,
  Building2
} from "lucide-react";

import { UserRole } from "@/contexts/AuthContext";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Array<UserRole>;
};

export type NavGroup = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  links: NavLink[];
  roles: Array<UserRole>;
};

export const NAV_STRUCTURE: (NavLink | NavGroup)[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["consultor", "empresario", "empleado", "gestor", "ejecutivo"],
  },
  {
    label: "Gestión de Talento",
    icon: Users,
    roles: ["consultor", "empresario", "gestor"],
    links: [
      {
        href: "/company-manual",
        label: "Manual de Empresa",
        icon: BookOpen,
        roles: ["consultor", "empresario", "gestor", "empleado"],
      },
      {
        href: "/org-chart",
        label: "Organigrama",
        icon: Building2,
        roles: ["consultor", "empresario", "gestor"],
      },
      {
        href: "/job-analysis",
        label: "Análisis de Puestos",
        icon: Briefcase,
        roles: ["consultor", "empresario", "gestor"],
      },
      {
        href: "/selection-processes",
        label: "Procesos de Selección",
        icon: UserCheck,
        roles: ["consultor", "empresario", "gestor"],
      },
      {
        href: "/interviews",
        label: "Entrevistas",
        icon: MessageSquare,
        roles: ["consultor", "empresario", "gestor"],
      },
      {
        href: "/performance-evaluation",
        label: "Evaluación de Desempeño",
        icon: TrendingUp,
        roles: ["consultor", "empresario", "gestor", "empleado"],
      },
      {
        href: "/training",
        label: "Capacitación",
        icon: GraduationCap,
        roles: ["consultor", "empresario", "gestor", "empleado"],
      },
      {
        href: "/time-tracking",
        label: "Control de Horario",
        icon: Clock,
        roles: ["consultor", "empresario", "gestor", "empleado"],
      },
      {
        href: "/payroll",
        label: "Gestión de Nóminas",
        icon: DollarSign,
        roles: ["consultor", "empresario", "gestor"],
      },
      {
        href: "/security-settings",
        label: "Configuración de Seguridad",
        icon: ShieldCheck,
        roles: ["consultor", "empresario", "gestor", "empleado"],
      },
    ],
  },
  {
    label: "Marketing Estratégico",
    icon: Target,
    roles: ["consultor", "empresario", "ejecutivo"],
    links: [
      {
        href: "/marketing",
        label: "Marketing Estratégico",
        icon: Target,
        roles: ["consultor", "empresario", "ejecutivo"],
      },
    ],
  },
  {
    label: "Agentes IA",
    icon: Cpu,
    roles: ["consultor", "empresario", "ejecutivo"],
    links: [
      {
        href: "/ai-agents",
        label: "Agentes IA",
        icon: Cpu,
        roles: ["consultor", "empresario", "ejecutivo"],
      },
    ],
  },
  {
    href: "/cybersecurity",
    label: "Ciberseguridad",
    icon: ShieldCheck,
    roles: ["consultor", "empresario", "ejecutivo"],
  },
  {
    href: "/communications",
    label: "Comunicaciones",
    icon: Megaphone,
    roles: ["consultor", "empresario", "gestor", "empleado"],
  },
  {
    href: "/reports",
    label: "Centro de Informes",
    icon: FileText,
    roles: ["consultor", "empresario", "gestor"],
  },
];
