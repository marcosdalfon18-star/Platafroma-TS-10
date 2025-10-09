
"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const manualContent = [
  {
    id: "item-1",
    title: "Bienvenida y Cultura de la Empresa",
    content: "Nuestra misión es innovar y liderar el mercado con soluciones tecnológicas de vanguardia. Fomentamos un ambiente de colaboración, respeto y crecimiento continuo. Cada miembro de nuestro equipo es fundamental para nuestro éxito colectivo."
  },
  {
    id: "item-2",
    title: "Políticas de Teletrabajo y Horarios",
    content: "Ofrecemos un modelo de trabajo híbrido que permite hasta 2 días de teletrabajo a la semana, previa coordinación con el manager directo. El horario de oficina estándar es de 9:00h a 18:00h, con una hora flexible de entrada y salida."
  },
  {
    id: "item-3",
    title: "Código de Conducta",
    content: "Se espera que todos los empleados mantengan los más altos estándares de profesionalismo, integridad y ética. El acoso, la discriminación y cualquier comportamiento irrespetuoso no serán tolerados. Fomentamos un entorno seguro e inclusivo."
  },
  {
    id: "item-4",
    title: "Beneficios y Compensaciones",
    content: "Además de un salario competitivo, ofrecemos un paquete de beneficios que incluye seguro médico privado, 22 días laborables de vacaciones al año, plan de formación continua y descuentos en gimnasios."
  },
   {
    id: "item-5",
    title: "Procedimiento de Bajas por Enfermedad",
    content: "En caso de enfermedad, se debe notificar al manager directo por correo electrónico o teléfono antes de las 10:00h del primer día de ausencia. El justificante médico oficial debe presentarse en un plazo máximo de 3 días laborables desde el inicio de la baja."
  }
];

export default function CompanyManualPage() {
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
        <Input placeholder="Buscar en el manual..." className="pl-10" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {manualContent.map(item => (
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
    </div>
  );
}
