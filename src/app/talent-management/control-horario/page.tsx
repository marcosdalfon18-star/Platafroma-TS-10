"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Calendar,
  Users,
  Timer,
  PlayCircle,
  StopCircle,
  Plus,
  Download,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { TimeClock } from "@/components/TimeClock";
import { useAttendance } from '@/hooks/useAttendance';

// Datos de ejemplo para empleados en horario
const employeesStatus = [
  {
    id: 1,
    name: "Ana García",
    department: "Tecnología",
    status: "present",
    clockIn: "09:00",
    clockOut: null,
    totalHours: 6.5,
    isLate: false
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    department: "Operaciones",
    status: "present",
    clockIn: "08:45",
    clockOut: null,
    totalHours: 7.0,
    isLate: false
  },
  {
    id: 3,
    name: "Sofía López",
    department: "Diseño",
    status: "absent",
    clockIn: null,
    clockOut: null,
    totalHours: 0,
    isLate: true
  },
  {
    id: 4,
    name: "Miguel Ríos",
    department: "Tecnología",
    status: "present",
    clockIn: "09:15",
    clockOut: null,
    totalHours: 6.25,
    isLate: true
  }
];

const recentRecords = [
  {
    id: 1,
    employee: "Ana García",
    date: "2024-01-15",
    clockIn: "09:00",
    clockOut: "17:30",
    totalHours: 8.5,
    status: "complete",
    overtime: 0.5
  },
  {
    id: 2,
    employee: "Carlos Mendoza",
    date: "2024-01-15",
    clockIn: "08:30",
    clockOut: "17:00",
    totalHours: 8.5,
    status: "complete",
    overtime: 0.5
  },
  {
    id: 3,
    employee: "Sofía López",
    date: "2024-01-15",
    clockIn: "09:15",
    clockOut: "17:45",
    totalHours: 8.5,
    status: "late",
    overtime: 0.5
  }
];

export default function ControlHorarioPage() {
  const [activeTab, setActiveTab] = useState("reloj");
  const { 
    attendances, 
    loading, 
    handleCheckIn, 
    handleCheckOut, 
    todayAttendance, 
    handleStartBreak, 
    handleEndBreak,
    canUseTimeClock 
  } = useAttendance();

  const getStatusBadge = (status: string, isLate: boolean) => {
    if (status === 'present') {
      return (
        <Badge className={isLate ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}>
          {isLate ? "Presente (Tarde)" : "Presente"}
        </Badge>
      );
    }
    return <Badge className="bg-red-100 text-red-800">Ausente</Badge>;
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            Control de Horario
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistema integral de registro y gestión de asistencias laborales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reportes
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Registro Manual
          </Button>
        </div>
      </header>

      {/* Métricas del día */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presentes Hoy</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {employeesStatus.filter(e => e.status === 'present').length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {employeesStatus.length} empleados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Llegadas Tarde</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {employeesStatus.filter(e => e.isLate).length}
            </div>
            <p className="text-xs text-muted-foreground">
              empleados con retraso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Promedio</CardTitle>
            <Timer className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7.2</div>
            <p className="text-xs text-muted-foreground">
              horas trabajadas hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Extra</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12.5</div>
            <p className="text-xs text-muted-foreground">
              horas extra esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reloj">Reloj Fichador</TabsTrigger>
          <TabsTrigger value="estado">Estado Actual</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="reloj" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Centro de Fichajes</CardTitle>
              <CardDescription>
                Registra tu entrada y salida del trabajo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimeClock 
                todayAttendance={todayAttendance}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onStartBreak={handleStartBreak}
                onEndBreak={handleEndBreak}
                loading={loading}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estado" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado Actual del Personal</CardTitle>
              <CardDescription>
                Empleados presentes y sus horarios de hoy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Salida</TableHead>
                    <TableHead>Horas Trabajadas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeesStatus.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        {getStatusBadge(employee.status, employee.isLate)}
                      </TableCell>
                      <TableCell>{employee.clockIn || '-'}</TableCell>
                      <TableCell>{employee.clockOut || 'En curso'}</TableCell>
                      <TableCell>
                        {employee.status === 'present' ? (
                          <span className="text-blue-600 font-medium">
                            {employee.totalHours}h
                          </span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Asistencias</CardTitle>
              <CardDescription>
                Registro de asistencias de los últimos días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Salida</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Extra</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.clockIn}</TableCell>
                      <TableCell>{record.clockOut}</TableCell>
                      <TableCell className="font-medium">{record.totalHours}h</TableCell>
                      <TableCell>
                        {record.overtime > 0 ? (
                          <Badge className="bg-purple-100 text-purple-800">
                            +{record.overtime}h
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'complete' ? 'default' : 'destructive'}>
                          {record.status === 'complete' ? 'Normal' : 'Tarde'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reportes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Asistencia</CardTitle>
              <CardDescription>
                Análisis y estadísticas de asistencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Reportes Detallados</h3>
                <p>Función de reportes se implementará aquí</p>
                <Button className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Generar Reporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}