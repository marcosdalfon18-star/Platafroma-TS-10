"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap,
  BookOpen,
  Video,
  Award,
  Clock,
  Users,
  Plus,
  PlayCircle,
  CheckCircle,
  Calendar
} from "lucide-react";

// Datos de ejemplo para capacitaciones
const courses = [
  {
    id: 1,
    title: "Liderazgo Efectivo",
    description: "Desarrollo de habilidades de liderazgo para mandos medios",
    category: "Liderazgo",
    duration: "40 horas",
    progress: 75,
    status: "En progreso",
    instructor: "María González",
    students: 12,
    startDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Seguridad en el Trabajo",
    description: "Protocolo de seguridad y prevención de riesgos laborales",
    category: "Seguridad",
    duration: "20 horas",
    progress: 100,
    status: "Completado",
    instructor: "Carlos Ruiz",
    students: 45,
    startDate: "2024-01-01"
  },
  {
    id: 3,
    title: "Atención al Cliente",
    description: "Técnicas avanzadas de servicio al cliente",
    category: "Servicio",
    duration: "30 horas",
    progress: 0,
    status: "Programado",
    instructor: "Ana Martín",
    students: 8,
    startDate: "2024-02-01"
  }
];

const certifications = [
  { id: 1, name: "Certificación en Liderazgo", issued: "2024-01-20", employee: "Juan Pérez" },
  { id: 2, name: "Certificación de Seguridad", issued: "2024-01-15", employee: "María López" },
  { id: 3, name: "Certificación de Calidad", issued: "2024-01-10", employee: "Carlos Mendoza" }
];

export default function CapacitacionesPage() {
  const [activeTab, setActiveTab] = useState("cursos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'En progreso': return 'bg-blue-100 text-blue-800';
      case 'Programado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            Capacitaciones y Formación
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistema integral de aprendizaje y desarrollo profesional
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Curso
        </Button>
      </header>

      {/* Métricas generales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificaciones</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="cursos">Cursos Disponibles</TabsTrigger>
          <TabsTrigger value="progreso">Mi Progreso</TabsTrigger>
          <TabsTrigger value="certificaciones">Certificaciones</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="cursos" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {course.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} estudiantes
                    </span>
                  </div>

                  {course.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Inicio:</strong> {course.startDate}</p>
                  </div>

                  <Button className="w-full" variant={course.status === 'Completado' ? 'outline' : 'default'}>
                    {course.status === 'Completado' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Revisar Curso
                      </>
                    ) : course.status === 'En progreso' ? (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continuar
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Inscribirse
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progreso" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mi Progreso de Aprendizaje</CardTitle>
              <CardDescription>Seguimiento de tus cursos activos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.filter(course => course.progress > 0 && course.progress < 100).map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{course.title}</h4>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <p className="text-sm text-muted-foreground">
                        Próxima sesión: Lunes 22 de Enero, 10:00 AM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificaciones Obtenidas</CardTitle>
              <CardDescription>Historial de certificaciones del equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Otorgado a {cert.employee}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{cert.issued}</p>
                      <Button size="sm" variant="outline">Ver Certificado</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Formación</CardTitle>
              <CardDescription>Próximas sesiones y eventos de capacitación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Calendario de Capacitaciones</h3>
                <p>Vista de calendario se implementará aquí</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}