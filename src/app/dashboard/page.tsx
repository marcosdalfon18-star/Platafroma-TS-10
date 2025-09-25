
"use client";

import React from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import { useCurrentRole } from "../layout";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { userRole, user } = useCurrentRole();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return <div className="flex items-center justify-center h-full"><p>Redirigiendo a la página de inicio...</p></div>;
  }

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
        return <div className="flex items-center justify-center h-full"><p>Rol no reconocido.</p></div>;
    }
  };

  return (
    <div>
        {renderDashboard()}
    </div>
  );
}
