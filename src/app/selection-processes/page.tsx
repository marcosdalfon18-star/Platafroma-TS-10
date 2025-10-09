"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Wand2, PlusCircle } from "lucide-react";
import GenerateAdModal from '@/components/modals/GenerateAdModal';

// Shared types and data with job-analysis
export type JobPosition = {
    id: number;
    title: string;
    department: string;
    description?: string;
    status: "Activo" | "Borrador" | "Archivado";
    processStatus: "No Iniciado" | "Activo" | "Cerrado";
};

const initialJobPositions: JobPosition[] = [
    { id: 1, title: "Gerente de Ventas", department: "Ventas", description: "Liderar el equipo de ventas y expandir la cartera de clientes.", status: "Activo", processStatus: "Activo" },
    { id: 2, title: "Desarrollador Frontend", department: "Tecnología", description: "Crear interfaces de usuario interactivas y responsivas con React y Next.js.", status: "Activo", processStatus: "No Iniciado" },
    { id: 3, title: "Analista de Marketing", department: "Marketing", description: "Analizar datos de campañas y proponer estrategias de mejora.", status: "Borrador", processStatus: "No Iniciado" },
    { id: 4, title: "Soporte Técnico Nivel 2", department: "Soporte", description: "Resolver incidencias técnicas complejas de clientes.", status: "Archivado", processStatus: "Cerrado" },
    { id: 5, title: "Diseñador UX/UI", department: "Producto", description: "Diseñar flujos de usuario y prototipos para nuevas funcionalidades.", status: "Activo", processStatus: "Activo" },
];


export default function SelectionProcessesPage() {
    const [positions, setPositions] = useState<JobPosition[]>(initialJobPositions);
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);

    const handleGenerateAd = (position: JobPosition) => {
        setSelectedPosition(position);
        setIsAdModalOpen(true);
    };
    
    const handleStartProcess = (positionId: number) => {
        setPositions(positions.map(p => 
            p.id === positionId ? { ...p, processStatus: 'Activo' } : p
        ));
    };

    const getStatusVariant = (status: JobPosition['processStatus']) => {
        switch (status) {
            case 'Activo': return 'default';
            case 'Cerrado': return 'outline';
            case 'No Iniciado': return 'secondary';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Procesos de Selección</h1>
                    <p className="text-muted-foreground">Gestiona tus ofertas de empleo y genera anuncios con IA.</p>
                </div>
                <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ir a Análisis de Puestos
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Ofertas de Empleo</CardTitle>
                    <CardDescription>
                        Visualiza todos los puestos definidos y gestiona los procesos de selección asociados.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Puesto</TableHead>
                                <TableHead>Departamento</TableHead>
                                <TableHead>Estado del Proceso</TableHead>
                                <TableHead className="text-right w-[300px]">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {positions.map((position) => (
                                <TableRow key={position.id}>
                                    <TableCell className="font-medium">{position.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{position.department}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(position.processStatus)}>
                                            {position.processStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleGenerateAd(position)}
                                        >
                                            <Wand2 className="mr-2 h-4 w-4" />
                                            Generar Anuncio
                                        </Button>
                                        <Button 
                                            size="sm"
                                            disabled={position.processStatus !== 'No Iniciado'}
                                            onClick={() => handleStartProcess(position.id)}
                                        >
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            Iniciar Proceso
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedPosition && (
                 <GenerateAdModal
                    isOpen={isAdModalOpen}
                    onClose={() => setIsAdModalOpen(false)}
                    position={selectedPosition}
                />
            )}
        </div>
    );
}
