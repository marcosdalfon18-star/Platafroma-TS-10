
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// --- Tipos y Datos de Ejemplo ---

type AttendanceStatus = "Puntual" | "Tarde" | "Ausente";

type AttendanceRecord = {
  employeeId: string;
  employeeName: string;
  entryTime: string | null;
  exitTime: string | null;
  status: AttendanceStatus;
};

// Datos de ejemplo para diferentes días
const attendanceData: { [key: string]: AttendanceRecord[] } = {
  "2024-07-28": [
    { employeeId: "E001", employeeName: "Ana García", entryTime: "08:55", exitTime: "18:05", status: "Puntual" },
    { employeeId: "E002", employeeName: "Carlos Pérez", entryTime: "09:15", exitTime: "18:20", status: "Tarde" },
    { employeeId: "E003", employeeName: "Lucía Martínez", entryTime: null, exitTime: null, status: "Ausente" },
    { employeeId: "E004", employeeName: "Roberto Fernández", entryTime: "09:00", exitTime: "18:01", status: "Puntual" },
  ],
  "2024-07-29": [
    { employeeId: "E001", employeeName: "Ana García", entryTime: "08:58", exitTime: "18:00", status: "Puntual" },
    { employeeId: "E002", employeeName: "Carlos Pérez", entryTime: "09:00", exitTime: "18:02", status: "Puntual" },
    { employeeId: "E003", employeeName: "Lucía Martínez", entryTime: "09:30", exitTime: "18:35", status: "Tarde" },
    { employeeId: "E004", employeeName: "Roberto Fernández", entryTime: "08:59", exitTime: "17:59", status: "Puntual" },
  ],
   "2024-07-30": [
    { employeeId: "E001", employeeName: "Ana García", entryTime: "09:05", exitTime: "18:10", status: "Tarde" },
    { employeeId: "E002", employeeName: "Carlos Pérez", entryTime: null, exitTime: null, status: "Ausente" },
    { employeeId: "E003", employeeName: "Lucía Martínez", entryTime: "08:50", exitTime: "17:55", status: "Puntual" },
    { employeeId: "E004", employeeName: "Roberto Fernández", entryTime: "08:55", exitTime: "18:00", status: "Puntual" },
  ],
};


// --- Componente Principal ---

export default function TimeTrackingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dailyRecords = attendanceData[formattedDate] || [];

  const getStatusVariant = (status: AttendanceStatus) => {
    switch (status) {
      case "Puntual": return "default";
      case "Tarde": return "destructive";
      case "Ausente": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
              <h1 className="text-3xl font-bold">Control Horario</h1>
              <p className="text-muted-foreground">Gestiona los horarios y la asistencia de tu equipo.</p>
          </div>
          <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generar Informe
          </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna del Calendario */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
                <CardTitle>Seleccionar Fecha</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="p-0"
                    locale={es}
                    disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
                />
            </CardContent>
          </Card>
        </div>

        {/* Columna de Registros */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Registros del día: {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Ninguna fecha seleccionada"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Empleado</TableHead>
                                <TableHead>Hora de Entrada</TableHead>
                                <TableHead>Hora de Salida</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dailyRecords.length > 0 ? (
                                dailyRecords.map(record => (
                                    <TableRow key={record.employeeId}>
                                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                                        <TableCell>{record.entryTime || "--:--"}</TableCell>
                                        <TableCell>{record.exitTime || "--:--"}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={getStatusVariant(record.status)}>
                                                {record.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No hay registros para este día.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
