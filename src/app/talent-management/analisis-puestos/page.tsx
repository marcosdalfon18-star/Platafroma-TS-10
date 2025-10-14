"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, ClipboardList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CreateJobPostForm from "@/components/forms/CreateJobPostForm";
import { useJobPositions } from "@/hooks/useJobPositions";
import { JobPosition } from "@/stores/appStore";
import { Loader2 } from "lucide-react";

export default function AnalisisPuestosPage() {
  const { 
    jobPositions, 
    loading,
    createJobPosition,
    deleteJobPosition,
    changeStatus
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
    } catch (error) {
      // El error se maneja en el hook
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            Análisis y Descripción de Puestos
          </h1>
          <p className="text-muted-foreground mt-2">
            Define, gestiona y analiza los roles de tu organización
          </p>
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

      <CreateJobPostForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddJobPosition}
      />
    </div>
  );
}