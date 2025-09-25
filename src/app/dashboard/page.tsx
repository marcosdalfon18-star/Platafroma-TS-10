
"use client";

import React from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import { useCurrentRole } from "../layout";

export default function DashboardPage() {
  const { userRole, user } = useCurrentRole();

  if (!user) {
    // Se muestra un estado de carga o nulo mientras se resuelve la autenticación en el layout.
    // Esto evita un parpadeo o redirección innecesaria.
    return <div className="flex items-center justify-center h-full"><p>Cargando...</p></div>;
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
