
"use client";

import React from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import { useCurrentRole } from "../layout";

export default function DashboardPage() {
  const { userRole } = useCurrentRole();

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
        // Por defecto, mostramos el dashboard de consultor si no hay un rol claro
        return <ConsultorDashboard />;
    }
  };

  return (
    <div>
        {renderDashboard()}
    </div>
  );
}
