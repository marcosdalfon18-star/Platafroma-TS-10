
"use client";

import React from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";

// Dado que hemos eliminado la autenticación, necesitamos decidir qué dashboard mostrar.
// Por ahora, mostraremos el de Consultor por defecto.
// Más adelante, podríamos usar un selector como el que teníamos en el Header.
export default function DashboardPage() {
  
  // En el futuro, este valor vendría del estado de la aplicación o de un selector.
  const userRole = "consultor";

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
        {renderDashboard()}
    </div>
  );
}
