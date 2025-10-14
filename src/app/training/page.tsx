
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  Calendar,
  Play,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Datos simulados
const myTrainings = [
  {
    id: 1,
    title: "Seguridad en el Trabajo",
    category: "Obligatorio",
    progress: 75,
    duration: "2 horas",
    deadline: "2024-10-20",
    status: "in_progress",
    instructor: "Ana García"
  },
  {
    id: 2,
    title: "Liderazgo Efectivo",
    category: "Desarrollo",
    progress: 100,
    duration: "4 horas",
    deadline: "2024-10-15",
    status: "completed",
    instructor: "Carlos Mendoza"
  },
  {
    id: 3,
    title: "Nuevas Tecnologías 2024",
    category: "Técnico",
    progress: 0,
    duration: "6 horas",
    deadline: "2024-11-01",
    status: "pending",
    instructor: "María López"
  }
];

const availableTrainings = [
  {
    id: 4,
    title: "Comunicación Asertiva",
    category: "Habilidades Blandas",
    duration: "3 horas",
    participants: 24,
    rating: 4.8,
    level: "Intermedio"
  },
  {
    id: 5,
    title: "Excel Avanzado",
    category: "Técnico",
    duration: "8 horas",
    participants: 156,
    rating: 4.9,
    level: "Avanzado"
  }
];

const trainingStats = {
  completed: 8,
  inProgress: 2,
  pending: 3,
  totalHours: 24
};

export default function TrainingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("my-trainings");
  
  const canManage = user?.role && ['consultor', 'empresario', 'gestor'].includes(user.role);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in_progress': return 'En Progreso';
      case 'pending': return 'Pendiente';
      default: return 'Sin Estado';
    }
  };

  return (
    <ProtectedRoute allowedRoles={["consultor", "empresario", "empleado", "gestor"]}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Capacitación</h1>
            <p className="text-muted-foreground mt-2">
              Desarrollo profesional y formación continua
            </p>
          </div>
          {canManage && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Capacitación
            </Button>
          )}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground">Completadas</p>
                  <p className="text-2xl font-bold">{trainingStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Play className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground">En Progreso</p>
                  <p className="text-2xl font-bold">{trainingStats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold">{trainingStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground">Horas Totales</p>
                  <p className="text-2xl font-bold">{trainingStats.totalHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido Principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-trainings">Mis Capacitaciones</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="progress">Mi Progreso</TabsTrigger>
          </TabsList>

          {/* Mis Capacitaciones */}
          <TabsContent value="my-trainings" className="space-y-4">
            {myTrainings.map((training) => (
              <Card key={training.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{training.title}</h3>
                        <Badge variant="outline">{training.category}</Badge>
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(training.status)}`} />
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {training.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Vence: {training.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {training.instructor}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{training.progress}%</span>
                        </div>
                        <Progress value={training.progress} className="h-2" />
                      </div>
                    </div>

                    <div className="ml-4 space-y-2">
                      <Button size="sm" variant={training.status === 'completed' ? 'outline' : 'default'}>
                        {training.status === 'completed' ? 'Revisar' : 'Continuar'}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        {getStatusText(training.status)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Capacitaciones Disponibles */}
          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableTrainings.map((training) => (
                <Card key={training.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{training.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{training.category}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{training.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {training.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {training.participants} participantes
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{training.level}</Badge>
                      <Button size="sm">
                        Inscribirse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mi Progreso */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progreso de Capacitación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Análisis de Progreso</h3>
                    <p className="text-muted-foreground">
                      Esta sección mostrará gráficos detallados de tu progreso en capacitaciones,
                      certificaciones obtenidas y recomendaciones personalizadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
