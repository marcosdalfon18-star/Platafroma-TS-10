
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Calendar as CalendarIcon, Megaphone, Wallet, BarChart2, ClipboardList } from "lucide-react";
import UploadDocumentModal from "@/components/modals/UploadDocumentModal";
import Chatbot from "@/components/Chatbot";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress"; // Temporalmente comentado

// Componente Progress temporal
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div 
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// --- Tipos y Datos de Ejemplo ---

type Document = {
    id: number;
    name: string;
};

type AttendanceStatus = "Puntual" | "Tarde" | "Ausente";

type AttendanceRecord = {
  date: string;
  entryTime: string | null;
  exitTime: string | null;
  status: AttendanceStatus;
};

// Datos de ejemplo para el empleado logueado (Ana García, ID E001)
const employeeAttendanceData: AttendanceRecord[] = [
  { date: "2024-07-28", entryTime: "08:55", exitTime: "18:05", status: "Puntual" },
  { date: "2024-07-29", entryTime: "08:58", exitTime: "18:00", status: "Puntual" },
  { date: "2024-07-30", entryTime: "09:05", exitTime: "18:10", status: "Tarde" },
];

const attendanceByDate = employeeAttendanceData.reduce((acc, record) => {
    acc[record.date] = record;
    return acc;
}, {} as { [key: string]: AttendanceRecord });


export default function EmpleadoDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Contrato de Trabajo.pdf" },
    { id: 2, name: "Certificado de Formación.pdf" },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleFileUpload = (file: File) => {
    console.log(`Empleado subió el archivo: ${file.name}`);
    const newDocument = {
        id: Date.now(),
        name: file.name,
    };
    setDocuments(prevDocs => [newDocument, ...prevDocs]);
    setIsModalOpen(false);
  };
  
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedDayRecord = attendanceByDate[formattedDate];
  
  const getStatusVariant = (status: AttendanceStatus) => {
    switch (status) {
      case "Puntual": return "default";
      case "Tarde": return "destructive";
      case "Ausente": return "secondary";
      default: return "outline";
    }
  };
  
  // Modificadores para el calendario
  const tardanzas = employeeAttendanceData.filter(r => r.status === 'Tarde').map(r => new Date(r.date));
  const ausencias = employeeAttendanceData.filter(r => r.status === 'Ausente').map(r => new Date(r.date));

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
          <header>
            <h1 className="text-3xl font-bold">Portal del Empleado 🧑‍💻</h1>
            <p className="text-muted-foreground">Bienvenido, aquí puedes gestionar tu información y desarrollo profesional.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            Mi Asistencia
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex justify-center">
                         <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            locale={es}
                            disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
                            modifiers={{ tarde: tardanzas, ausente: ausencias }}
                            modifiersClassNames={{
                                tarde: 'bg-destructive/20 text-destructive-foreground',
                                ausente: 'bg-muted text-muted-foreground',
                            }}
                         />
                       </div>
                       {selectedDayRecord ? (
                            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold text-center mb-2">Registro del {format(selectedDate!, "PPP", { locale: es })}</h4>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Entrada:</span>
                                    <span className="font-mono">{selectedDayRecord.entryTime || '--:--'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Salida:</span>
                                    <span className="font-mono">{selectedDayRecord.exitTime || '--:--'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Estado:</span>
                                    <Badge variant={getStatusVariant(selectedDayRecord.status)}>
                                        {selectedDayRecord.status}
                                    </Badge>
                                </div>
                            </div>
                        ) : ( <p className="text-center text-sm text-muted-foreground py-4">No hay registro para este día.</p> )}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center"><FileText className="mr-2 h-5 w-5" /> Mis Documentos</div>
                            <Button size="sm" onClick={() => setIsModalOpen(true)}><Upload className="mr-2 h-4 w-4" /> Subir</Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>{documents.length > 0 ? (<ul className="space-y-2">{documents.map(doc => (<li key={doc.id} className="flex items-center p-2 bg-muted rounded-md text-sm">{doc.name}</li>))}</ul>) : (<p className="text-center text-sm text-muted-foreground py-4">No tienes documentos.</p>)}</CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle className="flex items-center"><Megaphone className="mr-2 h-5 w-5" /> Comunicaciones</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="p-2 bg-muted rounded-md">Nueva política de teletrabajo. <span className="text-xs text-muted-foreground">- 28/07</span></div>
                        <div className="p-2 bg-muted rounded-md">Próximo evento de equipo. <span className="text-xs text-muted-foreground">- 25/07</span></div>
                        <Button variant="link" className="p-0 h-auto">Ver todas</Button>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader><CardTitle className="flex items-center"><Wallet className="mr-2 h-5 w-5" /> Mis Nóminas</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-muted rounded-md text-sm"><span>Nómina Julio 2024</span><Button variant="secondary" size="sm">Descargar</Button></div>
                        <Button variant="link" className="p-0 h-auto">Ver historial</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5" /> Evaluaciones</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>Última evaluación (Q2 2024): <Badge>Cumple expectativas</Badge></p>
                        <Button variant="outline" className="w-full">Ver detalles</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="flex items-center"><ClipboardList className="mr-2 h-5 w-5" /> Mis Capacitaciones</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm">
                            <p>Curso de Liderazgo Avanzado</p>
                            <Progress value={75} className="mt-1 h-2" />
                            <p className="text-xs text-muted-foreground text-right">75% completado</p>
                        </div>
                        <Button variant="outline" className="w-full">Ir a formación</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Chatbot />
            </div>

          </div>
      </div>

      <UploadDocumentModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileUpload={handleFileUpload}
      />
    </div>
  );
}

    