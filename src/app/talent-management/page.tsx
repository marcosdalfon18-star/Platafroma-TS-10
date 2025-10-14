"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    BookOpen,
    Network,
    ClipboardList,
    Users,
    MessageSquare,
    GraduationCap,
    Clock,
    DollarSign,
    ArrowRight,
    TrendingUp,
    BarChart3,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { useRouter } from 'next/navigation';

// Definición de los submódulos
const submodules = [
    {
        id: 'manual-empresa',
        title: 'Manual de Empresa',
        description: 'Políticas, procedimientos y documentación corporativa',
        icon: BookOpen,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        path: '/talent-management/manual-empresa'
    },
    {
        id: 'organigrama',
        title: 'Organigrama',
        description: 'Estructura organizacional y jerarquías',
        icon: Network,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        path: '/talent-management/organigrama'
    },
    {
        id: 'analisis-puestos',
        title: 'Análisis y Descripción de Puestos',
        description: 'Definición de roles, competencias y perfiles',
        icon: ClipboardList,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        path: '/talent-management/analisis-puestos'
    },
    {
        id: 'procesos-seleccion',
        title: 'Procesos de Selección',
        description: 'Reclutamiento y selección de personal',
        icon: Users,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        path: '/talent-management/procesos-seleccion'
    },
    {
        id: 'entrevistas',
        title: 'Entrevistas',
        description: 'Programación y evaluación de entrevistas',
        icon: MessageSquare,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        path: '/talent-management/entrevistas'
    },
    {
        id: 'capacitaciones',
        title: 'Capacitaciones',
        description: 'Formación y desarrollo profesional',
        icon: GraduationCap,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        path: '/talent-management/capacitaciones'
    },
    {
        id: 'control-horario',
        title: 'Control de Horario',
        description: 'Registro de asistencias y horarios',
        icon: Clock,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        path: '/talent-management/control-horario'
    },
    {
        id: 'nomina',
        title: 'Nómina',
        description: 'Gestión de salarios y compensaciones',
        icon: DollarSign,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        path: '/talent-management/nomina'
    }
];

// Métricas generales del dashboard
const generalStats = {
    totalEmployees: 45,
    activeModules: 8,
    completedProcesses: 23,
    pendingTasks: 7
};

export default function TalentManagementPage() {
    const router = useRouter();

    const handleNavigateToModule = (path: string) => {
        router.push(path);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <TrendingUp className="h-10 w-10 text-primary" />
                    <h1 className="text-4xl font-bold">Gestión del Talento</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Centro integral para la administración de recursos humanos, desarrollo profesional y gestión del capital humano
                </p>
            </header>

            {/* Métricas generales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Empleados Totales</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{generalStats.totalEmployees}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Módulos Activos</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{generalStats.activeModules}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Procesos Completados</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{generalStats.completedProcesses}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{generalStats.pendingTasks}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Submódulos */}
            <div className="space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">Módulos de Gestión</h2>
                    <p className="text-muted-foreground">
                        Accede a los diferentes módulos para gestionar todos los aspectos del talento humano
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {submodules.map((submodule) => {
                        const IconComponent = submodule.icon;
                        return (
                            <Card 
                                key={submodule.id} 
                                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${submodule.borderColor} border-2 ${submodule.bgColor} hover:bg-opacity-80`}
                                onClick={() => handleNavigateToModule(submodule.path)}
                            >
                                <CardHeader className="text-center pb-2">
                                    <div className={`mx-auto p-3 rounded-full bg-white shadow-sm w-16 h-16 flex items-center justify-center mb-3`}>
                                        <IconComponent className={`h-8 w-8 ${submodule.color}`} />
                                    </div>
                                    <CardTitle className="text-lg font-semibold">{submodule.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="mb-4 text-sm leading-relaxed">
                                        {submodule.description}
                                    </CardDescription>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className={`w-full ${submodule.color} border-current hover:bg-white hover:bg-opacity-20`}
                                    >
                                        Acceder
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Información adicional */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Información del Sistema
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        El módulo de Gestión del Talento integra todas las funcionalidades necesarias para 
                        administrar eficientemente el capital humano de la organización, desde el reclutamiento 
                        hasta el desarrollo profesional continuo.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                            <div className="font-semibold text-primary">100%</div>
                            <div className="text-muted-foreground">Integrado</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold text-primary">24/7</div>
                            <div className="text-muted-foreground">Disponible</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold text-primary">Seguro</div>
                            <div className="text-muted-foreground">Datos protegidos</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold text-primary">Escalable</div>
                            <div className="text-muted-foreground">Crecimiento adaptable</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

