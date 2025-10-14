
"use client";

import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import { NAV_STRUCTURE, type NavLink, type NavGroup } from "@/lib/nav-links";
import { LogOut, Settings, ChevronDown, ChevronRight, Building2 } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  
  // Si no hay usuario autenticado, usa consultor por defecto para evitar errores
  const userRole: UserRole = user?.role || "consultor";

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const hasAccess = (itemRoles: UserRole[]) => {
    // Permitir acceso basado en el rol del usuario autenticado
    return itemRoles.includes(userRole);
  };
  
  const isLinkActive = (href: string) => pathname === href;
  
  const isGroupActive = (group: NavGroup) => {
    return group.links.some(link => isLinkActive(link.href));
  };

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev => 
      prev.includes(groupLabel) 
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  // Inicializar grupos abiertos basado en ruta activa
  React.useEffect(() => {
    NAV_STRUCTURE.forEach(item => {
      if ('links' in item && isGroupActive(item as NavGroup)) {
        setOpenGroups(prev => 
          prev.includes(item.label) ? prev : [...prev, item.label]
        );
      }
    });
  }, [pathname]);

  return (
    <Sidebar className="bg-slate-900 border-r-slate-700">
      <SidebarHeader className="border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">TS Platform</span>
            <span className="text-xs text-slate-400">Digital Solutions</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-slate-900">
        <div className="px-3 py-2">
          <div className="mb-4">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 transition-all duration-300 cursor-pointer group">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <span className="text-white text-sm font-bold">
                    {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition-colors duration-200">
                  {user?.displayName || 'Usuario'}
                </span>
                <span className="text-xs text-slate-400 capitalize font-medium">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <SidebarMenu className="space-y-1">
            {NAV_STRUCTURE.map((item, index) => {
              if (!hasAccess(item.roles)) return null;

              if ("links" in item) { // It's a NavGroup
                const group = item as NavGroup;
                const groupActive = isGroupActive(group);
                const isOpen = openGroups.includes(group.label);
                
                return (
                  <div key={group.label} className="space-y-1">
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 hover:bg-slate-800",
                        groupActive 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "text-slate-300 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {group.icon && <group.icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="truncate">{group.label}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="ml-4 space-y-1 overflow-hidden">
                        <div className="border-l-2 border-blue-500/30 pl-4 space-y-1">
                          {group.links.map((link, linkIndex) => 
                            hasAccess(link.roles) ? (
                              <Link 
                                key={link.href} 
                                href={link.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 relative group sidebar-item-fade-in",
                                  isLinkActive(link.href)
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sidebar-glow"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white hover:shadow-md"
                                )}
                                style={{
                                  animationDelay: `${linkIndex * 50}ms`
                                }}
                              >
                                <link.icon className={cn(
                                  "h-4 w-4 flex-shrink-0 transition-all duration-200",
                                  isLinkActive(link.href) 
                                    ? "text-blue-200" 
                                    : "group-hover:text-blue-400 group-hover:scale-110"
                                )} />
                                <span className="truncate font-medium">{link.label}</span>
                                {isLinkActive(link.href) && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                                )}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              // It's a single NavLink
              const link = item as NavLink;
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 relative group",
                    isLinkActive(link.href)
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sidebar-glow"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-md"
                  )}
                >
                  <link.icon className={cn(
                    "h-4 w-4 flex-shrink-0 transition-all duration-200",
                    isLinkActive(link.href) 
                      ? "text-blue-200" 
                      : "group-hover:text-blue-400 group-hover:scale-110"
                  )} />
                  <span className="truncate">{link.label}</span>
                  {isLinkActive(link.href) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-700 bg-slate-900 p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white">
            <Settings className="h-4 w-4" />
            <span>Configuración</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
