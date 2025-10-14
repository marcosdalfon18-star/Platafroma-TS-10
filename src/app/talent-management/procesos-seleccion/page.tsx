"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Users, 
    Building, 
    Briefcase, 
    Plus, 
    Wand2, 
    AlertCircle, 
    CheckCircle,
    Clock,
    ArrowRight 
} from "lucide-react";
import GenerateAdModal from '@/components/modals/GenerateAdModal';
import { useJobPositions } from '@/hooks/useJobPositions';
import { JobPosition } from '@/stores/appStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Datos de ejemplo del organigrama con vacantes
const orgStructure = [
    {
        department: "Dirección General",
        positions: [
            { id: 1, title: "CEO", current: "Elena Campos", status: "occupied" as const, hasAnalysis: true },
            { id: 2, title: "Asistente Ejecutivo", current: null, status: "vacant" as const, hasAnalysis: true, priority: "high" as const }
        ]
    },
    {
        department: "Tecnología",
        positions: [
            { id: 3, title: "CTO", current: "Ana Torres", status: "occupied" as const, hasAnalysis: true },
            { id: 4, title: "Desarrollador Senior", current: "Miguel Santos", status: "occupied" as const, hasAnalysis: true },
            { id: 5, title: "Desarrollador Frontend", current: null, status: "vacant" as const, hasAnalysis: true, priority: "medium" as const },
            { id: 6, title: "DevOps Engineer", current: null, status: "vacant" as const, hasAnalysis: false, priority: "low" as const }
        ]
    },
    {
        department: "Operaciones", 
        positions: [
            { id: 7, title: "COO", current: "Carlos Mendoza", status: "occupied" as const, hasAnalysis: true },
            { id: 8, title: "Gerente de Proyectos", current: "Sofía Reyes", status: "occupied" as const, hasAnalysis: true },
            { id: 9, title: "Coordinador de Logística", current: null, status: "vacant" as const, hasAnalysis: true, priority: "high" as const }
        ]
    },
    {
        department: "Recursos Humanos",
        positions: [
            { id: 10, title: "Especialista en RRHH", current: null, status: "vacant" as const, hasAnalysis: false, priority: "medium" as const },
            { id: 11, title: "Reclutador", current: null, status: "vacant" as const, hasAnalysis: true, priority: "high" as const }
        ]
    }
];

type Position = {
    id: number;
    title: string;
    current: string | null;
    status: 'occupied' | 'vacant';
    hasAnalysis: boolean;
    priority?: 'high' | 'medium' | 'low';
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return 'bg-red-100 text-red-800 border-red-200';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function ProcesosSeleccionPage() {
    const { jobPositions, loading } = useJobPositions();
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [activeTab, setActiveTab] = useState("organigrama");

    const handleGenerateAd = (position: Position) => {
        setSelectedPosition(position);
        setIsAdModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        Procesos de Selección
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Gestión inteligente de vacantes basada en organigrama y análisis de puestos
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Nuevo Puesto
                </Button>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="organigrama" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Vista Organigrama
                    </TabsTrigger>
                    <TabsTrigger value="vacantes" className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Vacantes Activas
                    </TabsTrigger>
                    <TabsTrigger value="analisis" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Análisis de Puestos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="organigrama" className="space-y-6">
                    <div className="grid gap-6">
                        {orgStructure.map((dept) => (
                            <Card key={dept.department}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        {dept.department}
                                        <Badge variant="outline" className="ml-2">
                                            {dept.positions.filter(p => p.status === 'vacant').length} vacantes
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {dept.positions.map((position) => (
                                            <Card key={position.id} className={`border-2 ${position.status === 'vacant' ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-sm">{position.title}</h4>
                                                            <div className="mt-2 flex items-center gap-2">
                                                                {position.status === 'occupied' ? (
                                                                    <>
                                                                        <Avatar className="h-6 w-6">
                                                                            <AvatarFallback className="text-xs">
                                                                                {position.current?.split(' ').map(n => n[0]).join('')}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <span className="text-xs text-muted-foreground">{position.current}</span>
                                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <AlertCircle className="h-4 w-4 text-orange-600" />
                                                                        <span className="text-xs text-orange-700 font-medium">VACANTE</span>
                                                                        {position.priority && (
                                                                            <Badge className={`text-xs px-1 py-0 ${getPriorityColor(position.priority)}`}>
                                                                                {position.priority.toUpperCase()}
                                                                            </Badge>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {position.status === 'vacant' && (
                                                        <div className="mt-3 pt-3 border-t border-orange-200">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-1">
                                                                    <Briefcase className="h-3 w-3" />
                                                                    <span className="text-xs">
                                                                        {position.hasAnalysis ? 'Análisis listo' : 'Sin análisis'}
                                                                    </span>
                                                                </div>
                                                                <Button 
                                                                    size="sm" 
                                                                    variant={position.hasAnalysis ? "default" : "outline"}
                                                                    onClick={() => handleGenerateAd(position)}
                                                                    disabled={!position.hasAnalysis}
                                                                >
                                                                    <Wand2 className="h-3 w-3 mr-1" />
                                                                    Generar Anuncio
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="vacantes" className="space-y-4">
                    <VacantPositionsView />
                </TabsContent>

                <TabsContent value="analisis" className="space-y-4">
                    <JobAnalysisView />
                </TabsContent>
            </Tabs>

            {selectedPosition && (
                <GenerateAdModal
                    isOpen={isAdModalOpen}
                    onClose={() => setIsAdModalOpen(false)}
                    position={selectedPosition as any}
                />
            )}
        </div>
    );
}

// Componente para la vista de vacantes activas
function VacantPositionsView() {
    const allVacantPositions = orgStructure.flatMap(dept => 
        dept.positions.filter(p => p.status === 'vacant').map(p => ({...p, department: dept.department}))
    ).sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    });

    return (
        <div className="grid gap-4">
            {allVacantPositions.map((position) => (
                <Card key={position.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold">{position.title}</h3>
                                    <Badge className={getPriorityColor(position.priority || 'low')}>
                                        Prioridad {position.priority?.toUpperCase()}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    {position.department}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <Briefcase className="h-4 w-4" />
                                    <span className={position.hasAnalysis ? 'text-green-600' : 'text-orange-600'}>
                                        {position.hasAnalysis ? 'Análisis de puesto completado' : 'Requiere análisis de puesto'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {!position.hasAnalysis ? (
                                    <Button variant="outline">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        Crear Análisis
                                    </Button>
                                ) : (
                                    <Button>
                                        <Wand2 className="mr-2 h-4 w-4" />
                                        Generar Anuncio IA
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                    Ver Detalles
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// Componente para la vista de análisis de puestos
function JobAnalysisView() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Análisis de Puestos Pendientes</CardTitle>
                    <CardDescription>
                        Puestos que requieren análisis antes de generar anuncios
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orgStructure.flatMap(dept => 
                            dept.positions
                                .filter(p => !p.hasAnalysis)
                                .map(p => ({...p, department: dept.department}))
                        ).map((position) => (
                            <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">{position.title}</h4>
                                    <p className="text-sm text-muted-foreground">{position.department}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Crear Análisis
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}