
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
} from "@/components/ui/sidebar";
import { NAV_LINKS, type NavLink } from "@/lib/nav-links";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface AppSidebarProps {
  userRole: Role;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ userRole }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const hasAccess = (link: NavLink) => {
    return link.roles.includes(userRole);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
            <span className="text-lg font-semibold">TS Plataforma Digital</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_LINKS.map((link) =>
            hasAccess(link) ? (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === link.href}
                    icon={link.icon}
                    tooltip={{ children: link.label, side: "right" }}
                  >
                    {link.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ) : null
          )}
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
