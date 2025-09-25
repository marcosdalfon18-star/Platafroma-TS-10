"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Building } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

// Datos de ejemplo para las empresas
const companies = [
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

const CompanyCard = ({ company }: { company: typeof companies[0] }) => (
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
            <Button className="w-full">Gestionar Cliente</Button>
        </CardFooter>
    </Card>
);


export default function ConsultorDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
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
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
      </div>
    </div>
  );
}
