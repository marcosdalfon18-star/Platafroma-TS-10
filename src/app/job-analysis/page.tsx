"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import CreateJobPostForm from '@/components/forms/CreateJobPostForm'; // Temporalmente comentado

// Formulario temporal para crear posts de trabajo
const CreateJobPostForm = ({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (data: Omit<JobPosition, 'id' | 'status'>) => void; 
  onCancel: () => void; 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: "Nueva Posición",
      description: "Descripción generada",
      department: "Tecnología"
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Puesto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título del Puesto</label>
            <input 
              type="text" 
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: Desarrollador Frontend"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea 
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Descripción del puesto..."
            />
          </div>
          <div className="flex space-x-2">
            <button 
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Crear
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import { useJobPositions } from "@/hooks/useJobPositions";
import { JobPosition } from "@/stores/appStore";
import { Loader2 } from "lucide-react";

export default function JobAnalysisPage() {
  const { 
    jobPositions, 
    loading,
    createJobPosition
  } = useJobPositions();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddJobPosition = async (newPositionData: Omit<JobPosition, 'id' | 'status'>) => {
    try {
      await createJobPosition({
        title: newPositionData.title,
        department: newPositionData.department,
        description: newPositionData.description || '',
        requirements: [],
        responsibilities: [],
        type: 'tiempo_completo' // Valor por defecto
      });
      setIsCreateModalOpen(false);
    } catch {
      // El error se maneja en el hook
    }
  };

  return (
    <div className="space-y-6">
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Análisis de Puestos</h1>
                <p className="text-muted-foreground">Define, gestiona y analiza los roles de tu organización.</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Crear Nuevo Puesto
            </Button>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Puestos de Trabajo Definidos</CardTitle>
                <CardDescription>
                    Lista de todos los puestos de trabajo que han sido creados y su estado actual.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="ml-2">Cargando puestos de trabajo...</span>
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Nombre del Puesto</TableHead>
                            <TableHead>Departamento</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobPositions.map((puesto) => (
                            <TableRow key={puesto.id}>
                                <TableCell className="font-medium">{puesto.title}</TableCell>
                                <TableCell className="text-muted-foreground">{puesto.department}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        puesto.status === 'Activo' ? 'default' : 
                                        puesto.status === 'Borrador' ? 'secondary' : 'outline'
                                    }>
                                        {puesto.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menú</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Archivar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>

        {isCreateModalOpen && (
          <CreateJobPostForm
            onSubmit={handleAddJobPosition}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        )}
    </div>
  );
}
