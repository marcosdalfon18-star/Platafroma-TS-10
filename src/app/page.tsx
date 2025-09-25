"use client";

import React from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import { useCurrentRole } from "./layout";


export default function HomePage() {
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
        return <div className="flex items-center justify-center h-full"><p>Selecciona un rol para ver el dashboard.</p></div>;
    }
  };

  return (
    <div>
        {renderDashboard()}
    </div>
  );
}
