
"use client";

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
}

const RoleContext = createContext<RoleContextType | null>(null);

export const useCurrentRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useCurrentRole must be used within a RoleProvider");
    }
    return context;
};

// --- Start of Development Mock ---
// A more realistic mock of the Firebase User object is created to ensure all components
// have the properties they expect (e.g., displayName, photoURL).
const mockUser: User = {
  uid: "dev-uid-123",
  email: "consultor@test.com", // Set to the special email to enable role switching
  displayName: "Consultor de Desarrollo",
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  tenantId: null,
  providerData: [],
  metadata: {},
  providerId: "password",
  toJSON: () => ({}),
} as User;
// --- End of Development Mock ---

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<Role>("consultor");
  // We initialize the user state with our more detailed mock user.
  const [user, setUser] = useState<User | null>(mockUser);
  // Loading is set to false as we are not fetching a real user.
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // The original Firebase auth listener is commented out to prevent it from overwriting the mock user.
    /*
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role as Role);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
    */
  }, []);

  useEffect(() => {
      if (loading) return;

      // This logic now finds a mock user and redirects to the dashboard.
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
              <body>
                <div className="flex items-center justify-center min-h-screen">Cargando...</div>
              </body>
          </html>
      )
  }
  
  if (!user && !isAuthPage) {
      return null;
  }

  const content = user ? (
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
    <html lang="en" suppressHydrationWarning>
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
