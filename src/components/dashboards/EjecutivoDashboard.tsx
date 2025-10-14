"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Award
} from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';

// Datos de ejemplo para el dashboard ejecutivo
const executiveMetrics = {
  totalEmployees: 45,
  activeVacancies: 8,
  pendingInterviews: 12,
  monthlyTurnover: 2.3,
  averageSalary: 28500,
  totalPayroll: 1282500,
  completedProcesses: 23,
  pendingTasks: 7,
  departments: [
    { name: 'Tecnología', employees: 12, budget: 450000, satisfaction: 4.2 },
    { name: 'Operaciones', employees: 15, budget: 380000, satisfaction: 3.8 },
    { name: 'Ventas', employees: 8, budget: 295000, satisfaction: 4.5 },
    { name: 'Administración', employees: 10, budget: 220000, satisfaction: 4.0 }
  ],
  recentActivities: [
    { type: 'interview_completed', message: 'Entrevista completada: Ana García (Desarrollador Senior)', time: '2h ago' },
    { type: 'vacancy_created', message: 'Nueva vacante: Gerente de Proyecto', time: '4h ago' },
    { type: 'payroll_approved', message: 'Nómina de octubre aprobada', time: '1d ago' },
    { type: 'employee_hired', message: 'Nuevo empleado: Carlos Mendoza', time: '2d ago' }
  ],
  alerts: [
    { type: 'urgent', message: '3 entrevistas programadas para hoy', priority: 'high' },
    { type: 'warning', message: 'Rotación del mes supera el 3%', priority: 'medium' },
    { type: 'info', message: 'Próxima evaluación de desempeño en 5 días', priority: 'low' }
  ]
};

export default function EjecutivoDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'interview_completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'vacancy_created': return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'payroll_approved': return <DollarSign className="h-4 w-4 text-purple-600" />;
      case 'employee_hired': return <Users className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Dashboard Ejecutivo
          </h1>
          <p className="text-muted-foreground mt-2">
            Visión general del estado de Recursos Humanos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Ver Objetivos
          </Button>
        </div>
      </header>

      {/* Filtros de período */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Período:</span>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList>
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="month">Este Mes</TabsTrigger>
            <TabsTrigger value="quarter">Este Trimestre</TabsTrigger>
            <TabsTrigger value="year">Este Año</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Empleados"
          value={executiveMetrics.totalEmployees}
          description="activos en la empresa"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
        />

        <MetricCard
          title="Vacantes Activas"
          value={executiveMetrics.activeVacancies}
          description="posiciones por cubrir"
          icon={Briefcase}
          iconClassName="text-orange-600"
        />

        <MetricCard
          title="Entrevistas Pendientes"
          value={executiveMetrics.pendingInterviews}
          description="programadas esta semana"
          icon={Calendar}
          iconClassName="text-blue-600"
        />

        <MetricCard
          title="Rotación Mensual"
          value={`${executiveMetrics.monthlyTurnover}%`}
          description="tasa de rotación"
          icon={TrendingUp}
          iconClassName="text-red-600"
          trend={{ value: -0.8, isPositive: false }}
        />
      </div>

      {/* Métricas financieras */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Nómina Total"
          value={`€${executiveMetrics.totalPayroll.toLocaleString()}`}
          description="costo mensual total"
          icon={DollarSign}
          iconClassName="text-green-600"
        />

        <MetricCard
          title="Salario Promedio"
          value={`€${executiveMetrics.averageSalary.toLocaleString()}`}
          description="por empleado"
          icon={Award}
          iconClassName="text-purple-600"
        />

        <MetricCard
          title="Procesos Completados"
          value={executiveMetrics.completedProcesses}
          description="este mes"
          icon={CheckCircle}
          iconClassName="text-green-600"
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Departamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Resumen por Departamentos
            </CardTitle>
            <CardDescription>
              Distribución de personal y presupuestos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executiveMetrics.departments.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{dept.name}</span>
                      <Badge variant="outline">{dept.employees} empleados</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Presupuesto: €{dept.budget.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium">Satisfacción</div>
                    <div className="text-lg font-bold text-yellow-600">{dept.satisfaction}/5</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas y actividades recientes */}
        <div className="space-y-6">
          {/* Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Alertas Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executiveMetrics.alerts.map((alert, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${getAlertColor(alert.priority)}`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executiveMetrics.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPIs adicionales */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Clave de Rendimiento</CardTitle>
          <CardDescription>
            Métricas críticas para el seguimiento del desempeño de RRHH
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-muted-foreground">Tasa de Retención</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12.5</div>
              <div className="text-sm text-muted-foreground">Días Promedio de Contratación</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.1/5</div>
              <div className="text-sm text-muted-foreground">Satisfacción General</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">87%</div>
              <div className="text-sm text-muted-foreground">Cumplimiento de Objetivos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}