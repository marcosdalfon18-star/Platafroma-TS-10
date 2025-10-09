
"use client";

import "@/app/globals.css";
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

// Mock User object to simulate login
const mockUser = {
  uid: 'mock-user-uid',
  email: 'consultor@test.com',
  displayName: 'Mock User',
  photoURL: null,
  phoneNumber: null,
  providerId: 'password',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({
    token: '',
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    expirationTime: '',
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};


function AppContent({ children }: { children: React.ReactNode }) {
  const { user, setUser, userRole, setUserRole } = useCurrentRole();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // This effect handles the initial user state based on the path.
    // If on the landing page, ensure user is null.
    // If on other pages, we can simulate a logged-in user if not already set.
    if (pathname === '/') {
        // If we are on the landing page, we should not have a user session.
        // This can also be where you check for a real session token.
        if (user) setUser(null); 
    }
    setLoading(false);
  }, [pathname, user, setUser]);
  
  useEffect(() => {
      // This effect handles redirection based on auth state.
      if (loading) return;

      if (user && pathname === "/") {
          // If the user is logged in and tries to access the landing page, redirect to dashboard.
          router.push("/dashboard");
      } else if (!user && pathname !== "/") {
          // If the user is not logged in and tries to access any other page, redirect to landing.
          router.push("/");
      }
  }, [user, loading, pathname, router]);

  const isAuthPage = pathname === "/";
  
  if (isAuthPage) {
    // For the landing page, just render the children without any layout.
    return <>{children}</>;
  }
  
  // For all other pages, show a loading state until redirection logic completes.
  if (loading || !user) {
      return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  // Once user is confirmed and we are not on the auth page, render the full app layout.
  return (
      <SidebarProvider>
          <AppSidebar userRole={userRole} />
          <div className="md:pl-[var(--sidebar-width-icon)] group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
              <Header userRole={userRole} setUserRole={setUserRole} />
              <main className="p-4 sm:p-6 lg:p-8">
                  {children}
              </main>
          </div>
      </SidebarProvider>
  );
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<Role>("consultor");
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full font-body antialiased">
        <RoleContext.Provider value={{ userRole, setUserRole, user, setUser }}>
            <AppContent>{children}</AppContent>
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
