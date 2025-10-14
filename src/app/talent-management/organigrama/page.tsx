"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Network } from "lucide-react";

// Tipos para los miembros del organigrama
type OrgMember = {
  id: string;
  name: string;
  position: string;
  avatar: string;
  initials: string;
  children?: OrgMember[];
};

// Datos de ejemplo para el organigrama
const orgData: OrgMember = {
  id: '1',
  name: 'Elena Campos',
  position: 'CEO / Directora General',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  initials: 'EC',
  children: [
    {
      id: '2',
      name: 'Carlos Mendoza',
      position: 'Director de Operaciones (COO)',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
      initials: 'CM',
      children: [
        {
          id: '5',
          name: 'Sofía Reyes',
          position: 'Gerente de Proyectos',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
          initials: 'SR',
          children: [
            { id: '9', name: 'Javier Luna', position: 'Analista de Proyectos', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', initials: 'JL' },
          ]
        },
      ],
    },
    {
      id: '3',
      name: 'Ana Torres',
      position: 'Directora de Tecnología (CTO)',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      initials: 'AT',
      children: [
        { 
          id: '6', 
          name: 'Luis Navarro', 
          position: 'Líder de Desarrollo', 
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
          initials: 'LN',
          children: [
             { id: '10', name: 'Gabriela Soto', position: 'Desarrolladora Frontend', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', initials: 'GS' },
             { id: '11', name: 'Miguel Ríos', position: 'Desarrollador Backend', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d', initials: 'MR' },
          ]
        },
        { id: '7', name: 'Laura Morales', position: 'Líder de QA', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d', initials: 'LM' },
      ],
    },
    {
      id: '4',
      name: 'Pedro Romero',
      position: 'Director de Marketing (CMO)',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026713d',
      initials: 'PR',
      children: [
        { id: '8', name: 'Isabel Castillo', position: 'Especialista en Contenido', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026714d', initials: 'IC' },
      ],
    },
  ],
};

const MemberCard: React.FC<{ member: OrgMember, isRoot?: boolean }> = ({ member, isRoot = false }) => (
  <Card className={`text-center shadow-lg transform transition-transform hover:-translate-y-1 ${isRoot ? 'bg-primary/10 border-primary' : 'bg-card'}`}>
    <CardContent className="p-4 flex flex-col items-center">
      <Avatar className="w-16 h-16 mb-3">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.initials}</AvatarFallback>
      </Avatar>
      <p className="font-bold text-md">{member.name}</p>
      <p className="text-muted-foreground text-sm">{member.position}</p>
    </CardContent>
  </Card>
);

const TreeNode: React.FC<{ node: OrgMember, isRoot?: boolean }> = ({ node, isRoot = false }) => (
  <div className="relative flex flex-col items-center">
    <MemberCard member={node} isRoot={isRoot} />
    {node.children && node.children.length > 0 && (
      <>
        {/* Línea vertical hacia abajo */}
        <div className="absolute top-full h-8 w-px bg-gray-300" />
        {/* Contenedor para los hijos */}
        <div className="mt-16 flex justify-center gap-8 relative">
          {/* Línea horizontal */}
          <div className="absolute top-[-32px] h-px bg-gray-300 w-full" />
          {node.children.map(child => (
            <div key={child.id} className="flex flex-col items-center relative">
                {/* Línea vertical hacia arriba */}
                <div className="absolute bottom-full h-8 w-px bg-gray-300" />
                <TreeNode node={child} />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

export default function OrganigramaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Network className="h-8 w-8 text-primary" />
          Organigrama de la Empresa
        </h1>
        <p className="text-muted-foreground mt-2">
          Visualiza la estructura organizacional y jerarquía del equipo
        </p>
      </header>
      
      <div className="p-4 md:p-8 overflow-x-auto bg-muted/50 rounded-lg">
        <div className="inline-block min-w-full">
          <TreeNode node={orgData} isRoot />
        </div>
      </div>
    </div>
  );
}