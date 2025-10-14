"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Lazy loading optimizado para demo
const ConsultorDashboard = dynamic(() => import("@/components/dashboards/ConsultorDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2">Cargando vista...</span></div>
});
const EmpresarioDashboard = dynamic(() => import("@/components/dashboards/EmpresarioDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2">Cargando vista...</span></div>
});
const EmpleadoDashboard = dynamic(() => import("@/components/dashboards/EmpleadoDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2">Cargando vista...</span></div>
});
const GestorDashboard = dynamic(() => import("@/components/dashboards/GestorDashboard"), {
  loading: () => <div className="flex items-center justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2">Cargando vista...</span></div>
});
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Building, Briefcase, BarChart3 } from "lucide-react";

// Mock del contexto de autenticación para la demo
const MockAuthProvider = ({ children, user }: { children: React.ReactNode, user: any }) => {
  const mockAuthContext = {
    user: user,
    loading: false,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
  };
  
  return React.createElement(
    React.createContext(mockAuthContext).Provider,
    { value: mockAuthContext },
    children
  );
};

export default function DemoPage() {
  const [currentRole, setCurrentRole] = React.useState<"consultor" | "empresario" | "empleado" | "gestor">("empresario");

  const mockUser = {
    uid: "demo-user-123",
    email: "demo@empresa.com", 
    displayName: "Usuario Demo",
    role: currentRole,
    companyId: "empresa-demo-001"
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case "consultor":
        return <ConsultorDashboard />;
      case "empresario":
        return <EmpresarioDashboard />;
      case "empleado":
        return <EmpleadoDashboard />;
      case "gestor":
        return <GestorDashboard />;
      default:
        return <EmpresarioDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header de Demostración */}
      <div className="border-b bg-blue-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">TS Plataforma Digital - Modo Demostración</h1>
              <p className="text-sm text-muted-foreground">
                Navega libremente por todos los módulos y funcionalidades
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={currentRole === "empresario" ? "default" : "secondary"}>
              {currentRole === "consultor" && "👩‍💼 Consultora"}
              {currentRole === "empresario" && "🏢 Empresario"}
              {currentRole === "empleado" && "👨‍💻 Empleado"}
              {currentRole === "gestor" && "👔 Gestor"}
            </Badge>
            
            <div className="flex space-x-1">
              <Button 
                variant={currentRole === "empresario" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentRole("empresario")}
              >
                <Building className="h-4 w-4 mr-1" />
                Empresario
              </Button>
              <Button 
                variant={currentRole === "consultor" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentRole("consultor")}
              >
                <Users className="h-4 w-4 mr-1" />
                Consultora
              </Button>
              <Button 
                variant={currentRole === "empleado" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentRole("empleado")}
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Empleado
              </Button>
              <Button 
                variant={currentRole === "gestor" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentRole("gestor")}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Gestor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Contenido Principal */}
        <div className="flex-1 overflow-auto p-6">
          {/* Indicador de Rol Actual */}
          <div className="mb-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  {currentRole === "consultor" && "👩‍💼 Vista de Consultora RRHH"}
                  {currentRole === "empresario" && "🏢 Panel Empresarial"}
                  {currentRole === "empleado" && "👨‍💻 Portal del Empleado"}
                  {currentRole === "gestor" && "👔 Dashboard de Gestión"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {currentRole === "consultor" && "Acceso completo a todas las funcionalidades: crear, editar, eliminar y configurar todos los aspectos de la plataforma."}
                  {currentRole === "empresario" && "Gestiona tu empresa: empleados, nóminas, procesos de selección, reportes y configuraciones empresariales."}
                  {currentRole === "empleado" && "Accede a tu información personal, horarios, documentos y capacitaciones disponibles."}
                  {currentRole === "gestor" && "Supervisa operaciones, genera reportes y gestiona procesos administrativos de la empresa."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard del Rol Seleccionado */}
          <div className="space-y-6">
            {renderDashboard()}
          </div>
        </div>
      </div>
    </div>
  );
}