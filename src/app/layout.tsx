
"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { User } from "firebase/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface RoleContextType {
    userRole: Role;
    setUserRole: React.Dispatch<React.SetStateAction<Role>>;
    user: User | null;
}

const mockUser: User = {
    uid: "mock-user-uid",
    email: "consultor@test.com",
    displayName: "Mock User",
    photoURL: null,
    phoneNumber: null,
    providerId: "password",
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => "",
    getIdTokenResult: async () => ({
        token: "",
        authTime: "",
        issuedAtTime: "",
        signInProvider: null,
        signInSecondFactor: null,
        expirationTime: "",
        claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
};


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
  const [user, setUser] = useState<User | null>(mockUser);
  
  const pathname = usePathname();
  const isAuthPage = pathname === "/";
  
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <RoleContext.Provider value={{ userRole, setUserRole, user }}>
            {content}
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
