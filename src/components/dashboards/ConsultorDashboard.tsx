"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Building, ArrowLeft, Briefcase, FileText, BookOpen } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

// Tipos de datos
type Company = {
  id: number;
  name: string;
  industry: string;
  employees: number;
  plan: "Básico" | "Profesional" | "Premium";
  logo: string;
  image: string;
};

// Datos de ejemplo para las empresas
const companies: Company[] = [
  {
    id: 1,
    name: "Innovatech Solutions",
    industry: "Tecnología",
    employees: 45,
    plan: "Profesional",
    logo: "/placeholder-logo-1.png",
    image: "https://picsum.photos/seed/1/600/400",
  },
  {
    id: 2,
    name: "GastroDelight Catering",
    industry: "Restauración",
    employees: 22,
    plan: "Básico",
    logo: "/placeholder-logo-2.png",
    image: "https://picsum.photos/seed/2/600/400",
  },
  {
    id: 3,
    name: "Constructora Apex",
    industry: "Construcción",
    employees: 89,
    plan: "Premium",
    logo: "/placeholder-logo-3.png",
    image: "https://picsum.photos/seed/3/600/400",
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
                    layout="fill"
                    objectFit="cover"
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
                <p><strong>Empleados:</strong> {company.employees}</p>
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

const CompanyDetailView = ({ company, onBackClick }: { company: Company; onBackClick: () => void }) => (
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
            {/* Columna Izquierda: KPIs y Bitácora */}
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5" /> KPIs Clave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Próximamente: Indicadores de rendimiento de la empresa.</p>
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

            {/* Columna Derecha: Documentos */}
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5" /> Gestor Documental</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Próximamente: Documentos compartidos con el cliente.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
);


export default function ConsultorDashboard() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleManageClick = (company: Company) => {
      setSelectedCompany(company);
  };

  const handleBackClick = () => {
      setSelectedCompany(null);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {selectedCompany ? (
            <CompanyDetailView company={selectedCompany} onBackClick={handleBackClick} />
        ) : (
            <CompanyListView onManageClick={handleManageClick} />
        )}
      </div>
    </div>
  );
}
