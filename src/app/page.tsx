"use client";

import React, { useState } from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import Header from "@/components/Header"; // Importar el nuevo Header

type Role = "consultor" | "empresario" | "empleado" | "gestor" | null;

export default function HomePage() {
  const [userRole, setUserRole] = useState<Role>("consultor");

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
        return <div className="flex items-center justify-center h-screen"><p>Selecciona un rol para ver el dashboard.</p></div>;
    }
  };

  return (
    <div>
      <Header userRole={userRole} setUserRole={setUserRole} />
      <main>
        {renderDashboard()}
      </main>
    </div>
  );
}
