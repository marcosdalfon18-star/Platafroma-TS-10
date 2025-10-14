'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"consultor" | "empresario" | "empleado" | "gestor" | "ejecutivo">;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
        return;
      }
      
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push('/dashboard'); // Redirigir a dashboard si no tiene permisos
        return;
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Se está redirigiendo
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null; // Se está redirigiendo
  }

  return <>{children}</>;
};