
"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, Briefcase, Plane, Building2, UserSearch, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


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

// Datos de ejemplo para los puestos
const jobPositions = [
    { id: 1, title: "Gerente de Ventas", status: "Inactivo" },
    { id: 2, title: "Desarrollador Frontend", status: "Activo" },
    { id: 3, title: "Analista de Marketing", status: "Inactivo" },
    { id: 4, title: "Soporte Técnico", status: "Inactivo" },
];


export default function EmpresarioDashboard() {
  return (
    <div className="bg-background">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard del Empresario 💼</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Resumen de la situación actual de tu capital humano y actividades.
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
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                      <TabsTrigger value="capital-humano">Capital Humano</TabsTrigger>
                      <TabsTrigger value="procesos-seleccion">Procesos de Selección</TabsTrigger>
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
                   <TabsContent value="procesos-seleccion" className="mt-4">
                      <Card>
                          <CardHeader>
                              <CardTitle>Gestión de Búsquedas</CardTitle>
                              <CardDescription>Activa y gestiona los procesos de selección para los puestos de tu empresa.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Puesto</TableHead>
                                          <TableHead>Estado de la Búsqueda</TableHead>
                                          <TableHead className="text-right">Acciones</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {jobPositions.map((puesto) => (
                                          <TableRow key={puesto.id}>
                                              <TableCell className="font-medium">{puesto.title}</TableCell>
                                              <TableCell>{puesto.status}</TableCell>
                                              <TableCell className="text-right">
                                                  <Button variant="outline" size="sm">
                                                      <PlayCircle className="mr-2 h-4 w-4" />
                                                      Activar Búsqueda
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </CardContent>
                      </Card>
                  </TabsContent>
              </Tabs>
          </CardContent>
      </Card>
    </div>
  );
}
