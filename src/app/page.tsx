"use client";

import React, { useState } from "react";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";
import { Button } from "@/components/ui/button";

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
      <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">TS Plataforma Digital (Modo Desarrollo)</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Ver como:</span>
            <Button variant={userRole === 'consultor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("consultor")}>Consultor</Button>
            <Button variant={userRole === 'empresario' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empresario")}>Empresario</Button>
            <Button variant={userRole === 'empleado' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empleado")}>Empleado</Button>
            <Button variant={userRole === 'gestor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("gestor")}>Gestor</Button>
          </div>
        </div>
      </div>
      <main>
        {renderDashboard()}
      </main>
    </div>
  );
}
