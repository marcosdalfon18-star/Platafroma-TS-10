import {
  Users,
  Book,
  ClipboardList,
  Search,
  MessageSquare,
  BarChart2,
  Cpu,
  Target,
  Megaphone,
  LayoutDashboard,
  Settings,
  FileText,
  Wallet,
  Clock,
  ShieldCheck,
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: Array<"consultor" | "empresario" | "empleado" | "gestor">;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
  roles: Array<"consultor" | "empresario" | "empleado" | "gestor">;
};

export const NAV_STRUCTURE: (NavLink | NavGroup)[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["consultor", "empresario", "empleado", "gestor"],
  },
  {
    label: "Gestión del Talento",
    roles: ["consultor", "empresario"],
    links: [
      {
        href: "/org-chart",
        label: "Organigrama",
        icon: Users,
        roles: ["consultor", "empresario"],
      },
      {
        href: "/company-manual",
        label: "Manual de Empresa",
        icon: Book,
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
        href: "/interviews",
        label: "Entrevistas",
        icon: MessageSquare,
        roles: ["consultor", "empresario"],
      },
       {
        href: "/training",
        label: "Capacitaciones",
        icon: ClipboardList,
        roles: ["consultor", "empresario", "empleado"],
      },
       {
        href: "/performance-evaluation",
        label: "Evaluaciones",
        icon: BarChart2,
        roles: ["consultor", "empresario", "empleado"],
      },
    ],
  },
   {
    label: "Marketing",
    roles: ["consultor", "empresario"],
    links: [
        {
            href: "/marketing",
            label: "Marketing Estratégico",
            icon: Target,
            roles: ["consultor", "empresario"],
        },
    ]
  },
  {
    label: "Agentes IA",
    roles: ["consultor", "empresario"],
     links: [
        {
            href: "/ai-agents",
            label: "Agentes IA",
            icon: Cpu,
            roles: ["consultor", "empresario"],
        },
    ]
  },
  {
    label: "Comunicaciones",
    roles: ["consultor", "empresario", "gestor"],
    links: [
        {
            href: "/communications",
            label: "Comunicaciones",
            icon: Megaphone,
            roles: ["consultor", "empresario", "gestor"],
        },
    ]
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
    href: "/cybersecurity",
    label: "Ciberseguridad",
    icon: ShieldCheck,
    roles: ["consultor", "empresario"],
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
