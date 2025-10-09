"use client";

import React, { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';

const manualContent: { id: string; title: string; content: string }[] = [];

export default function CompanyManualPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = useMemo(() => {
    if (!searchTerm) return manualContent;

    return manualContent.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, manualContent]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Manual de Empresa</h1>
        <p className="text-muted-foreground">
          Encuentra toda la información sobre las políticas, cultura y procedimientos de la compañía.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Buscar en el manual..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={manualContent.length === 0}
        />
      </div>
      
      {manualContent.length === 0 && !searchTerm ? (
         <Card className="mt-8">
            <CardContent className="p-6 text-center">
                <Info className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold">Manual en Construcción</h3>
                <p className="text-muted-foreground mt-1">
                    El contenido de esta sección será cargado por la consultora próximamente.
                </p>
            </CardContent>
        </Card>
      ) : filteredContent.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredContent.map(item => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card className="mt-8">
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No se encontraron resultados para "<strong>{searchTerm}</strong>".</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
