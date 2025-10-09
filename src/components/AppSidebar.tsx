
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { NAV_STRUCTURE, type NavLink, type NavGroup } from "@/lib/nav-links";
import { LogOut, Settings, ChevronRight, Users } from "lucide-react";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface AppSidebarProps {
  userRole: Role;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ userRole }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const hasAccess = (itemRoles: Role[]) => {
    // En modo prototipo, permitimos el acceso basado en el rol simulado
    return itemRoles.includes(userRole);
  };
  
  const isLinkActive = (href: string) => pathname === href;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <span className="text-lg font-semibold">TS Plataforma Digital</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_STRUCTURE.map((item, index) => {
            if (!hasAccess(item.roles)) return null;

            if ("links" in item) { // It's a NavGroup
              const group = item as NavGroup;
              const isGroupActive = group.links.some(link => isLinkActive(link.href));
              
              return (
                <Collapsible key={group.label} defaultOpen={isGroupActive}>
                    <CollapsibleTrigger className="w-full">
                         <SidebarMenuButton 
                            className="justify-between group"
                            icon={Users}
                            isActive={isGroupActive}
                          >
                            {group.label}
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                             {group.links.map((link) => 
                                hasAccess(link.roles) ? (
                                    <li key={link.href}>
                                        <Link href={link.href} passHref legacyBehavior>
                                            <SidebarMenuSubButton isActive={isLinkActive(link.href)}>
                                                <link.icon />
                                                <span>{link.label}</span>
                                            </SidebarMenuSubButton>
                                        </Link>
                                    </li>
                                ) : null
                            )}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
              );
            }
            
            // It's a single NavLink
            const link = item as NavLink;
            return (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isLinkActive(link.href)}
                    icon={link.icon}
                    tooltip={{ children: link.label, side: "right" }}
                  >
                    {link.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton icon={Settings} tooltip={{ children: "Ajustes", side: "right" }}>Ajustes</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton icon={LogOut} onClick={handleLogout} tooltip={{ children: "Cerrar Sesión", side: "right" }}>Cerrar Sesión</SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
