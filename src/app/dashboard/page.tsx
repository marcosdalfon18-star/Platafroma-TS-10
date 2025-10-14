
"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Lazy loading de dashboards con loading states
const ConsultorDashboard = dynamic(() => import("@/components/dashboards/ConsultorDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
});
const EmpresarioDashboard = dynamic(() => import("@/components/dashboards/EmpresarioDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
});
const EmpleadoDashboard = dynamic(() => import("@/components/dashboards/EmpleadoDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
});
const GestorDashboard = dynamic(() => import("@/components/dashboards/GestorDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
});
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth, UserRole } from "@/contexts/AuthContext";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  
  // Para testing: permitir cambiar rol via URL
  const urlParams = new URLSearchParams(window.location.search);
  const testRole = urlParams.get('role') as UserRole;
  
  // El usuario está garantizado por ProtectedRoute, o usar modo demo
  const userRole: UserRole = testRole || user?.role || "empresario";

  const renderDashboard = () => {
    switch (userRole) {
      case "consultor":
        return <ConsultorDashboard />;
      case "empresario":
        return <EmpresarioDashboard />;
      case "empleado":
        return <EmpleadoDashboard />;
      case "gestor":
        return <GestorDashboard />;
      default:
        return <ConsultorDashboard />;
    }
  };

  return (
    <div>
        {/* Indicador de rol para testing */}
        <div className="mb-4 p-2 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
          <p className="text-sm">
            <strong>Rol Actual:</strong> {userRole} 
            {testRole && <span className="text-xs"> (modo testing)</span>}
          </p>
          <p className="text-xs mt-1">
            Para cambiar rol: <code>?role=consultor</code> | <code>?role=empresario</code> | <code>?role=empleado</code> | <code>?role=gestor</code>
          </p>
        </div>
        {renderDashboard()}
    </div>
  );
}
