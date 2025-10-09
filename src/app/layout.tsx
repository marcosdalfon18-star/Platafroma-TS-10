
'use client';

import "@/app/globals.css";
import React, { useState, createContext, useContext, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
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
  const [userRole, setUserRole] = useState<Role>("empleado");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserRole(userData.role || "empleado");
        }
        if (pathname === "/") {
          router.push("/dashboard");
        }
      } else {
        setUser(null);
        if (pathname !== "/") {
          router.push("/");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const isAuthPage = pathname === "/";

   if (loading) {
    return <div className="flex items-center justify-center h-full"><p>Cargando aplicación...</p></div>;
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
        <RoleContext.Provider value={{ userRole, setUserRole, user, setUser }}>
           {isAuthPage ? (
              children
            ) : (
              <SidebarProvider>
                <AppSidebar userRole={userRole} />
                <div className="md:pl-64 group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
                  <Header userRole={userRole} setUserRole={setUserRole} />
                  <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                  </main>
                </div>
              </SidebarProvider>
            )}
        </RoleContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
