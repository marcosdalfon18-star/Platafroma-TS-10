
"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, Briefcase, Plane, Building2, UserSearch, PlayCircle, UserMinus, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


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
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Dashboard del Empresario 💼</h1>
        <p className="text-muted-foreground mt-1">
          Resumen de la situación actual de tu capital humano y actividades.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{totalEmpleados}</div>
                      <p className="text-xs text-muted-foreground">Empleados</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Activos</CardTitle>
                      <UserCheck className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{humanCapitalData.activos}</div>
                       <p className="text-xs text-muted-foreground">Trabajando</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">De Baja</CardTitle>
                      <UserMinus className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{humanCapitalData.baja}</div>
                      <p className="text-xs text-muted-foreground">Ausencia médica</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
                      <Plane className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{humanCapitalData.vacaciones}</div>
                      <p className="text-xs text-muted-foreground">Disfrutando</p>
                  </CardContent>
              </Card>
          </section>

          <Card>
              <CardHeader>
                  <CardTitle>Panel de Actividades</CardTitle>
                  <CardDescription>Gestiona las áreas clave de tu empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Tabs defaultValue="capital-humano">
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
                          <TabsTrigger value="capital-humano">Capital Humano</TabsTrigger>
                          <TabsTrigger value="procesos-seleccion">Selección</TabsTrigger>
                          <TabsTrigger value="finanzas" disabled>Finanzas</TabsTrigger>
                          <TabsTrigger value="operaciones" disabled>Operaciones</TabsTrigger>
                      </TabsList>
                      <TabsContent value="capital-humano">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card className="hover:shadow-md transition-shadow">
                                  <CardHeader className="flex flex-row items-center gap-4">
                                      <Building2 className="h-8 w-8 text-primary" />
                                      <div>
                                          <CardTitle>Organigrama</CardTitle>
                                          <CardDescription>Estructura de la empresa.</CardDescription>
                                      </div>
                                  </CardHeader>
                                  <CardContent>
                                      <p className="text-sm text-muted-foreground">Próximamente: Visualiza y gestiona el organigrama.</p>
                                  </CardContent>
                              </Card>
                              <Card className="hover:shadow-md transition-shadow">
                                  <CardHeader className="flex flex-row items-center gap-4">
                                      <Briefcase className="h-8 w-8 text-primary" />
                                      <div>
                                          <CardTitle>Análisis de Puestos</CardTitle>
                                          <CardDescription>Roles y responsabilidades.</CardDescription>
                                      </div>
                                  </CardHeader>
                                  <CardContent>
                                      <p className="text-sm text-muted-foreground">Próximamente: Define y analiza los perfiles de puesto.</p>
                                  </CardContent>
                              </Card>
                          </div>
                      </TabsContent>
                      <TabsContent value="procesos-seleccion">
                          <Card>
                              <CardHeader>
                                  <CardTitle>Gestión de Búsquedas</CardTitle>
                                  <CardDescription>Activa y gestiona los procesos de selección.</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <Table>
                                      <TableHeader>
                                          <TableRow>
                                              <TableHead>Puesto</TableHead>
                                              <TableHead>Estado</TableHead>
                                              <TableHead className="text-right">Acciones</TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {jobPositions.map((puesto) => (
                                              <TableRow key={puesto.id}>
                                                  <TableCell className="font-medium">{puesto.title}</TableCell>
                                                  <TableCell>
                                                    <Badge variant={puesto.status === 'Activo' ? 'default' : 'secondary'}>
                                                        {puesto.status}
                                                    </Badge>
                                                  </TableCell>
                                                  <TableCell className="text-right">
                                                      <Button variant="outline" size="sm" disabled={puesto.status === 'Activo'}>
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

        {/* Columna Lateral */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Empleados</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
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
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    formatter={(value, name) => [`${value} empleados`, name]}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
