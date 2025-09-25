"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Building, ArrowLeft, Briefcase, FileText, BookOpen, Users, Upload } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import UploadDocumentModal from "@/components/modals/UploadDocumentModal"; // Nueva importación

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
};

type Company = {
  id: number;
  name: string;
  industry: string;
  employeesCount: number;
  plan: "Básico" | "Profesional" | "Premium";
  logo: string;
  image: string;
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
    logo: "/placeholder-logo-1.png",
    image: "https://picsum.photos/seed/1/600/400",
    employees: [
      { id: 101, name: "Ana García", position: "Desarrolladora Frontend" },
      { id: 102, name: "Carlos Pérez", position: "Líder de Proyecto" },
    ],
    documents: [
      { id: 1001, name: "Contrato de Ana García.pdf", employeeId: 101, employeeName: "Ana García" },
      { id: 1002, name: "Plan de Proyecto Q3.docx" },
    ],
  },
  {
    id: 2,
    name: "GastroDelight Catering",
    industry: "Restauración",
    employeesCount: 22,
    plan: "Básico",
    logo: "/placeholder-logo-2.png",
    image: "https://picsum.photos/seed/2/600/400",
    employees: [
        { id: 201, name: "Lucía Martínez", position: "Chef Principal" },
    ],
    documents: [
        { id: 2001, name: "Certificado Sanitario.pdf" },
    ]
  },
  {
    id: 3,
    name: "Constructora Apex",
    industry: "Construcción",
    employeesCount: 89,
    plan: "Premium",
    logo: "/placeholder-logo-3.png",
    image: "https://picsum.photos/seed/3/600/400",
    employees: [
        { id: 301, name: "Roberto Fernández", position: "Jefe de Obra" },
        { id: 302, name: "Sofía López", position: "Arquitecta" },
    ],
    documents: [
        { id: 3001, name: "Planos Edificio Central.pdf" },
        { id: 3002, name: "Contrato Roberto Fernández.pdf", employeeId: 301, employeeName: "Roberto Fernández"},
    ]
  },
];

// --- Componentes ---

const CompanyCard = ({ company, onManageClick }: { company: Company; onManageClick: (company: Company) => void }) => (
    <Card className="overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
        <CardHeader className="p-0">
            <div className="relative h-40 w-full">
                <Image
                    src={company.image}
                    alt={`Imagen corporativa de ${company.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="office building"
                />
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
                 <div className="bg-gray-200 p-2 rounded-md">
                     <Building className="h-6 w-6 text-gray-600" />
                 </div>
                <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                </div>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Empleados:</strong> {company.employeesCount}</p>
                <p><strong>Plan Contratado:</strong> <span className="font-semibold text-primary">{company.plan}</span></p>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={() => onManageClick(company)}>Gestionar Cliente</Button>
        </CardFooter>
    </Card>
);

const CompanyListView = ({ onManageClick }: { onManageClick: (company: Company) => void }) => (
  <>
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Centro de Mando del Consultor 🧐</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
    <div>
        <header className="mb-8">
            <Button variant="ghost" onClick={onBackClick} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la lista de empresas
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestionando: {company.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Visión 360° del cliente.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5" /> Lista de Empleados</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ul className="space-y-2">
                            {company.employees.map(employee => (
                                <li key={employee.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                    <div>
                                        <p className="font-medium">{employee.name}</p>
                                        <p className="text-xs text-muted-foreground">{employee.position}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(employee)}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir Documento
                                    </Button>
                                </li>
                            ))}
                       </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><BookOpen className="mr-2 h-5 w-5" /> Bitácora de Asesoramiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Próximamente: Registro de llamadas, reuniones y correos.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                           <div className="flex items-center"><FileText className="mr-2 h-5 w-5" /> Gestor Documental</div>
                           <Button size="sm" onClick={() => handleOpenModal()}>
                                <Upload className="mr-2 h-4 w-4" /> Añadir
                           </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            {company.documents.map(doc => (
                                <li key={doc.id} className="flex flex-col p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                    <span className="font-medium">{doc.name}</span>
                                    {doc.employeeName && (
                                        <span className="text-xs text-blue-500">Empleado: {doc.employeeName}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
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
    <div className="bg-background">
        {selectedCompany ? (
            <CompanyDetailView company={selectedCompany} onBackClick={handleBackClick} onUpload={handleUpload} />
        ) : (
            <CompanyListView onManageClick={handleManageClick} />
        )}
    </div>
  );
}
