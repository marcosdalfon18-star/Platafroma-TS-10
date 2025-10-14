"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  Users, 
  BarChart3, 
  Timer
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TimeClock } from '@/components/TimeClock';

// Datos simulados para el ejemplo
const todaySchedule = {
  clockIn: "09:00",
  clockOut: "17:30",
  breakStart: "12:30",
  breakEnd: "13:30",
  totalHours: "7.5",
  status: "in_progress" as const
};

const weeklyStats = {
  totalHours: "37.5",
  overtimeHours: "2.5",
  absences: 0,
  tardiness: 1
};

const recentActivity = [
  { date: "2024-10-14", clockIn: "08:58", clockOut: "17:32", totalHours: "8:34", status: "complete" },
  { date: "2024-10-13", clockIn: "09:05", clockOut: "17:30", totalHours: "8:25", status: "complete" },
  { date: "2024-10-12", clockIn: "09:00", clockOut: "17:15", totalHours: "8:15", status: "complete" },
  { date: "2024-10-11", clockIn: "08:55", clockOut: "17:45", totalHours: "8:50", status: "overtime" },
];

export default function TimeTrackingPage() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isEmployee = user?.role === 'empleado';
  const canManage = user?.role && ['consultor', 'empresario', 'gestor'].includes(user.role);

  return (
    <ProtectedRoute allowedRoles={["consultor", "empresario", "empleado", "gestor"]}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Control de Horario</h1>
            <p className="text-muted-foreground mt-2">
              Gestión y seguimiento del tiempo de trabajo
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Reloj de Control - Solo para empleados */}
        {isEmployee && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Control de Asistencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimeClock 
                todayAttendance={null}
                onCheckIn={() => console.log('Check in')}
                onCheckOut={() => console.log('Check out')}
                onStartBreak={() => console.log('Start break')}
                onEndBreak={() => console.log('End break')}
                loading={false}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Horario de Hoy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horario de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge variant={todaySchedule.status === 'in_progress' ? 'default' : 'secondary'}>
                  {todaySchedule.status === 'in_progress' ? 'En Curso' : 'Completado'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Entrada:</span>
                  <span className="font-mono">{todaySchedule.clockIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Salida:</span>
                  <span className="font-mono">{todaySchedule.clockOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Almuerzo:</span>
                  <span className="font-mono">{todaySchedule.breakStart} - {todaySchedule.breakEnd}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total:</span>
                  <span className="font-mono font-bold">{todaySchedule.totalHours}h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas Semanales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalHours}h</div>
                  <div className="text-xs text-muted-foreground">Horas Totales</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.overtimeHours}h</div>
                  <div className="text-xs text-muted-foreground">Horas Extra</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.absences}</div>
                  <div className="text-xs text-muted-foreground">Ausencias</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{weeklyStats.tardiness}</div>
                  <div className="text-xs text-muted-foreground">Llegadas Tarde</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Acciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Calendario
              </Button>
              <Button className="w-full" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
              {canManage && (
                <>
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Gestionar Equipos
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Configurar Horarios
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${
                      activity.status === 'complete' ? 'bg-green-500' :
                      activity.status === 'overtime' ? 'bg-orange-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium">{activity.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.clockIn} - {activity.clockOut}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium">{activity.totalHours}</div>
                    <Badge variant={activity.status === 'overtime' ? 'destructive' : 'default'} className="text-xs">
                      {activity.status === 'overtime' ? 'Horas Extra' : 'Normal'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
