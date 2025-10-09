
"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Datos de ejemplo para los puestos
const jobPositions = [
    { id: 1, title: "Gerente de Ventas", department: "Ventas", status: "Activo" },
    { id: 2, title: "Desarrollador Frontend", department: "Tecnología", status: "Activo" },
    { id: 3, title: "Analista de Marketing", department: "Marketing", status: "Borrador" },
    { id: 4, title: "Soporte Técnico Nivel 2", department: "Soporte", status: "Archivado" },
    { id: 5, title: "Diseñador UX/UI", department: "Producto", status: "Activo" },
];

export default function JobAnalysisPage() {
  return (
    <div className="space-y-6">
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Análisis de Puestos</h1>
                <p className="text-muted-foreground">Define, gestiona y analiza los roles de tu organización.</p>
            </div>
            <Button>
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
            </CardContent>
        </Card>
    </div>
  );
}
