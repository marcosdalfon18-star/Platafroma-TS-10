'use client';

import "@/app/globals.css";
import React, { useState, createContext, useContext } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface RoleContextType {
    userRole: Role;
    setUserRole: React.Dispatch<React.SetStateAction<Role>>;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const useCurrentRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useCurrentRole must be used within a RoleProvider");
    }
    return context;
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<Role>("consultor");
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  if (isAuthPage) {
    return (
       <html lang="es" suppressHydrationWarning className="h-full">
         <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
         </head>
         <body className="h-full font-body antialiased bg-background">
            {children}
            <Toaster />
         </body>
      </html>
    )
  }

  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full font-body antialiased bg-background">
        <RoleContext.Provider value={{ userRole, setUserRole }}>
          <SidebarProvider>
            <AppSidebar userRole={userRole} />
            <div className="md:pl-64 group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
              <Header userRole={userRole} setUserRole={setUserRole} />
              <main className="p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
