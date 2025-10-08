
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
    // This effect now correctly handles the initial auth state.
    // For this dev setup, we'll simulate a logged-in user if they are not on the landing page
    // and a logged-out user if they are.
    if (pathname === '/') {
        setUser(null);
    } else {
        // If refreshing any page other than landing, assume user is logged in.
        // In a real app, this would be a call to check Firebase Auth state.
        if (!user) {
            setUser(mockUser);
        }
    }
    setLoading(false);
  }, [pathname, setUser, user]);
  
  useEffect(() => {
      if (loading) return;

      if (user && pathname === "/") {
          router.push("/dashboard");
      } else if (!user && pathname !== "/") {
          router.push("/");
      }
  }, [user, loading, pathname, router]);

  const isAuthPage = pathname === "/";
  
  if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  
  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

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
