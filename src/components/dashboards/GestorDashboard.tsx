
"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Chatbot from "@/components/Chatbot";

// Datos de ejemplo para el historial de nóminas
const payrollHistory = [
  { id: 1, month: "Julio 2024", status: "Procesado", date: "2024-07-31" },
  { id: 2, month: "Junio 2024", status: "Procesado", date: "2024-06-30" },
  { id: 3, month: "Mayo 2024", status: "Procesado", date: "2024-05-31" },
];

export default function GestorDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Dashboard de Gestoría</h1>
        <p className="text-muted-foreground">Gestiona las nóminas y la comunicación con los empleados.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Nóminas</CardTitle>
                <CardDescription>Carga, procesa y distribuye las nóminas del personal.</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Cargar Nóminas de Agosto
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Fecha de Procesamiento</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Nóminas {item.month}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.date}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={item.status === 'Procesado' ? 'default' : 'secondary'}>
                          {item.status === 'Procesado' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Columna Lateral */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Comunicaciones</CardTitle>
              <CardDescription>Canal directo para resolver dudas de los empleados.</CardDescription>
            </CardHeader>
            <CardContent>
              <Chatbot />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
