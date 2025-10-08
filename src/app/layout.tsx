
"use client";

import "@/app/globals.css"; // <-- The missing Tailwind CSS import!
import React, { useState, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
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
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Real Firebase auth listener is commented out for development.
  }, []);

  useEffect(() => {
      if (loading) return;
      if (user && pathname === "/") {
          router.push("/dashboard");
      } else if (!user && pathname !== "/") {
          router.push("/");
      }
  }, [user, loading, router, pathname]);

  const isAuthPage = pathname === "/";
  
  if (loading) {
      return (
          <html lang="en">
              <body className="h-full">
                <div className="flex items-center justify-center min-h-screen">Cargando...</div>
              </body>
          </html>
      )
  }
  
  if (!user && !isAuthPage) {
      return null;
  }

  const content = user && !isAuthPage ? (
      <SidebarProvider>
          <AppSidebar userRole={userRole} />
          <div className="md:pl-[var(--sidebar-width-icon)] group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
              <Header userRole={userRole} setUserRole={setUserRole} />
              <main className="p-4 sm:p-6 lg:p-8">
                  {children}
              </main>
          </div>
      </SidebarProvider>
  ) : (
      children
  );

  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={`h-full font-body antialiased ${isAuthPage ? 'bg-gray-50' : ''}`}>
        <RoleContext.Provider value={{ userRole, setUserRole, user, setUser }}>
            {content}
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
