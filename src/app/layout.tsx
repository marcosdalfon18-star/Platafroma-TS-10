
"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { User } from "firebase/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useRouter } from "next/navigation";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface RoleContextType {
    userRole: Role;
    setUserRole: React.Dispatch<React.SetStateAction<Role>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [user, setUser] = useState<User | null>(null); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si no hay usuario y no estamos en la página de inicio, redirige a la página de inicio
    if (!user && pathname !== '/') {
        router.push('/');
    }
    // Si hay usuario y estamos en la página de inicio, redirige al dashboard
    if (user && pathname === '/') {
        router.push('/dashboard');
    }
  }, [user, pathname, router]);
  
  // Renderiza el contenido principal solo si hay un usuario y no estamos en la landing page
  const isAppPage = pathname !== '/';

  const content = isAppPage && user ? (
      <SidebarProvider>
          <AppSidebar userRole={userRole} />
          <div className="md:pl-[var(--sidebar-width-icon)] group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
              <Header userRole={userRole} setUserRole={setUserRole} />
              <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                  {children}
              </main>
          </div>
      </SidebarProvider>
  ) : (
      // Muestra la landing page (children) si no hay usuario o si la ruta es '/'
      children
  );

  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <RoleContext.Provider value={{ userRole, setUserRole, user, setUser }}>
            {content}
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
