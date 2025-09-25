
"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, Briefcase, Plane, Building2 } from "lucide-react";


// Datos de ejemplo para el capital humano
const humanCapitalData = {
  activos: 12,
  baja: 2,
  vacaciones: 3,
};

const totalEmpleados = humanCapitalData.activos + humanCapitalData.baja + humanCapitalData.vacaciones;

const chartData = [
  { name: "Activos", value: humanCapitalData.activos },
  { name: "De Baja", value: humanCapitalData.baja },
  { name: "Vacaciones", value: humanCapitalData.vacaciones },
];

const COLORS = ["#16A34A", "#DC2626", "#F97316"]; // Verde, Rojo, Naranja

export default function EmpresarioDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard del Empresario 💼</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Resumen de la situación actual de tu capital humano.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Empleados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmpleados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Briefcase className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.activos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">De Baja</CardTitle>
              <Users className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.baja}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
              <Plane className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.vacaciones}</div>
            </CardContent>
          </Card>
        </section>

        <Card className="col-span-1 lg:col-span-2 mb-8">
          <CardHeader>
            <CardTitle>Distribución de Empleados</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #ccc',
                    borderRadius: '0.5rem',
                  }}
                  formatter={(value, name) => [`${value} empleados`, name]}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Panel de Actividades</CardTitle>
                <CardDescription>Gestiona las áreas clave de tu empresa.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="capital-humano">
                    <TabsList>
                        <TabsTrigger value="capital-humano">Capital Humano</TabsTrigger>
                        <TabsTrigger value="finanzas" disabled>Finanzas</TabsTrigger>
                        <TabsTrigger value="operaciones" disabled>Operaciones</TabsTrigger>
                    </TabsList>
                    <TabsContent value="capital-humano" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Building2 className="h-8 w-8 text-primary" />
                                    <div>
                                        <CardTitle>Organigrama</CardTitle>
                                        <CardDescription>Estructura jerárquica de la empresa.</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Próximamente: Visualiza y gestiona el organigrama de tu equipo.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Briefcase className="h-8 w-8 text-primary" />
                                    <div>
                                        <CardTitle>Análisis de Puestos</CardTitle>
                                        <CardDescription>Roles y responsabilidades de cada puesto.</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Próximamente: Define y analiza los perfiles de puesto.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
