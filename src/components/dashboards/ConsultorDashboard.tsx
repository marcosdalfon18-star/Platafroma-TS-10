
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, ArrowLeft, Users, Upload, Building, FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UploadDocumentModal from "@/components/modals/UploadDocumentModal";

// --- Tipos de datos ampliados ---
type Employee = {
  id: number;
  name: string;
  position: string;
};

type Document = {
  id: number;
  name: string;
  employeeId?: number;
  employeeName?: string;
  uploadDate: string;
};

type Company = {
  id: number;
  name: string;
  industry: string;
  employeesCount: number;
  plan: "Básico" | "Profesional" | "Premium";
  employees: Employee[];
  documents: Document[];
};

// --- Datos de ejemplo ampliados ---
const companies: Company[] = [
  {
    id: 1,
    name: "Innovatech Solutions",
    industry: "Tecnología",
    employeesCount: 45,
    plan: "Profesional",
    employees: [
      { id: 101, name: "Ana García", position: "Desarrolladora Frontend" },
      { id: 102, name: "Carlos Pérez", position: "Líder de Proyecto" },
    ],
    documents: [
      { id: 1001, name: "Contrato de Ana García.pdf", employeeId: 101, employeeName: "Ana García", uploadDate: "2023-05-20" },
      { id: 1002, name: "Plan de Proyecto Q3.docx", uploadDate: "2023-06-01"  },
    ],
  },
  {
    id: 2,
    name: "GastroDelight Catering",
    industry: "Restauración",
    employeesCount: 22,
    plan: "Básico",
    employees: [
        { id: 201, name: "Lucía Martínez", position: "Chef Principal" },
    ],
    documents: [
        { id: 2001, name: "Certificado Sanitario.pdf", uploadDate: "2023-03-15"  },
    ]
  },
  {
    id: 3,
    name: "Constructora Apex",
    industry: "Construcción",
    employeesCount: 89,
    plan: "Premium",
    employees: [
        { id: 301, name: "Roberto Fernández", position: "Jefe de Obra" },
        { id: 302, name: "Sofía López", position: "Arquitecta" },
    ],
    documents: [
        { id: 3001, name: "Planos Edificio Central.pdf", uploadDate: "2023-07-10"  },
        { id: 3002, name: "Contrato Roberto Fernández.pdf", employeeId: 301, employeeName: "Roberto Fernández", uploadDate: "2023-01-25" },
    ]
  },
];

// --- Componentes ---

const CompanyCard = ({ company, onManageClick }: { company: Company; onManageClick: (company: Company) => void }) => (
    <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl flex flex-col">
        <CardHeader>
            <div className="flex items-start gap-4">
                 <div className="bg-muted p-3 rounded-lg">
                     <Building className="h-6 w-6 text-muted-foreground" />
                 </div>
                <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="text-sm flex justify-between items-center">
                <span className="text-muted-foreground">Empleados</span>
                <span className="font-bold">{company.employeesCount}</span>
            </div>
             <div className="text-sm flex justify-between items-center">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-bold text-primary">{company.plan}</span>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => onManageClick(company)}>Gestionar</Button>
        </CardFooter>
    </Card>
);

const CompanyListView = ({ onManageClick }: { onManageClick: (company: Company) => void }) => (
  <>
    <header className="mb-8">
      <h1 className="text-3xl font-bold">Centro de Mando del Consultor 🧐</h1>
      <p className="text-muted-foreground mt-1">
        Gestiona todas tus empresas cliente desde un único lugar.
      </p>
    </header>

    <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input placeholder="Buscar empresa por nombre..." className="pl-10" />
        </div>
        <Button>
            <PlusCircle className="mr-2 h-5 w-5" />
            Añadir Nueva Empresa
        </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
            <CompanyCard key={company.id} company={company} onManageClick={onManageClick} />
        ))}
    </div>
  </>
);

const CompanyDetailView = ({ company, onBackClick, onUpload }: { company: Company; onBackClick: () => void; onUpload: (file: File, employee?: Employee) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);

    const handleOpenModal = (employee?: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(undefined);
    };
    
    const handleFileUpload = (file: File) => {
        onUpload(file, selectedEmployee);
        handleCloseModal();
    };

    return (
    <div className="space-y-6">
        <header className="space-y-2">
            <Button variant="ghost" onClick={onBackClick} className="pl-0 h-auto p-0 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la lista de empresas
            </Button>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground">
                Visión 360° del cliente.
            </p>
        </header>

        <Tabs defaultValue="employees">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="employees"><Users className="mr-2 h-4 w-4" /> Empleados</TabsTrigger>
                <TabsTrigger value="documents"><FileText className="mr-2 h-4 w-4" /> Documentos</TabsTrigger>
                <TabsTrigger value="log"><BookOpen className="mr-2 h-4 w-4" /> Bitácora</TabsTrigger>
            </TabsList>
            <TabsContent value="employees" className="mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Lista de Empleados</CardTitle>
                        <CardDescription>Gestiona los documentos de cada empleado de {company.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                           <TableHeader>
                               <TableRow>
                                   <TableHead>Nombre</TableHead>
                                   <TableHead>Puesto</TableHead>
                                   <TableHead className="text-right">Acciones</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                                {company.employees.map(employee => (
                                    <TableRow key={employee.id}>
                                        <TableCell className="font-medium">{employee.name}</TableCell>
                                        <TableCell>{employee.position}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleOpenModal(employee)}>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Subir Documento
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                           </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Gestor Documental</CardTitle>
                            <CardDescription>Documentos generales y de empleados de la empresa.</CardDescription>
                        </div>
                        <Button size="sm" onClick={() => handleOpenModal()}>
                            <Upload className="mr-2 h-4 w-4" /> Añadir
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre del Archivo</TableHead>
                                    <TableHead>Asociado a</TableHead>
                                    <TableHead>Fecha de Subida</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {company.documents.map(doc => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">{doc.name}</TableCell>
                                        <TableCell>{doc.employeeName || 'General'}</TableCell>
                                        <TableCell>{doc.uploadDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="log" className="mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Bitácora de Asesoramiento</CardTitle>
                        <CardDescription>Registro de llamadas, reuniones y correos importantes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground py-8">Próximamente: Una bitácora interactiva para el seguimiento de clientes.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        
         <UploadDocumentModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onFileUpload={handleFileUpload}
            companyName={company.name}
            employeeName={selectedEmployee?.name}
        />
    </div>
    )
};


export default function ConsultorDashboard() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [allCompanies, setAllCompanies] = useState<Company[]>(companies);

  const handleManageClick = (company: Company) => {
      setSelectedCompany(company);
  };

  const handleBackClick = () => {
      setSelectedCompany(null);
  }

  const handleUpload = (file: File, employee?: Employee) => {
    if (!selectedCompany) return;

    const newDocument: Document = {
      id: Date.now(),
      name: file.name,
      employeeId: employee?.id,
      employeeName: employee?.name,
      uploadDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    };
    
    // Actualizar el estado
    const updatedCompanies = allCompanies.map(c => {
        if (c.id === selectedCompany.id) {
            const updatedCompany = { ...c, documents: [...c.documents, newDocument] };
            setSelectedCompany(updatedCompany); // Actualiza la vista de detalle en tiempo real
            return updatedCompany;
        }
        return c;
    });
    setAllCompanies(updatedCompanies);

    console.log(`Subiendo ${file.name} para ${employee ? employee.name : selectedCompany.name}`);
  };

  return (
    <div>
        {selectedCompany ? (
            <CompanyDetailView company={selectedCompany} onBackClick={handleBackClick} onUpload={handleUpload} />
        ) : (
            <CompanyListView onManageClick={handleManageClick} />
        )}
    </div>
  );
}

    