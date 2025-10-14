'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Loader2 } from 'lucide-react';

interface AppLayoutContentProps {
  children: React.ReactNode;
}

export const AppLayoutContent: React.FC<AppLayoutContentProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Mostrar spinner durante la carga inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // Si es una ruta pública o no hay usuario, mostrar solo el contenido sin sidebar
  if (isPublicRoute || !user) {
    return <>{children}</>;
  }
  
  // Si hay usuario autenticado, mostrar el layout completo con sidebar
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 md:pl-64 group-data-[collapsible=icon]:md:pl-[var(--sidebar-width-icon)] transition-all duration-200 ease-in-out">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};