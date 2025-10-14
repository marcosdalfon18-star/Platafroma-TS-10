
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft, BarChart3, Target, TrendingUp, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PerformanceEvaluationPage() {
  const router = useRouter();

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Métricas de Rendimiento",
      description: "Seguimiento detallado del desempeño individual"
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Objetivos y Metas",
      description: "Definición y seguimiento de objetivos"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Análisis de Tendencias",
      description: "Evolución del rendimiento en el tiempo"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Evaluación 360°",
      description: "Feedback de supervisores y compañeros"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Evaluación de Rendimiento</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sistema integral de evaluación y seguimiento del rendimiento de empleados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">En Desarrollo</CardTitle>
            <CardDescription className="text-lg">
              Esta funcionalidad está siendo desarrollada y estará disponible próximamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Nuestro equipo está trabajando para implementar todas las funcionalidades de evaluación.
                Te notificaremos cuando esté lista.
              </p>
              <Button onClick={() => router.back()} variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
