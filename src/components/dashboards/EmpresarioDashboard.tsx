"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

// Datos de ejemplo para el capital humano
const humanCapitalData = {
  activos: 12,
  baja: 2,
  vacaciones: 3,
};

const totalEmpleados = humanCapitalData.activos + humanCapitalData.baja + humanCapitalData.vacaciones;

const chartData = [
  { name: "Activos", value: humanCapitalData.activos },
  { name: "De Baja", value: humanCapitalData.baja },
  { name: "Vacaciones", value: humanCapitalData.vacaciones },
];

const COLORS = ["#16A34A", "#DC2626", "#F97316"]; // Verde, Rojo, Naranja

export default function EmpresarioDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard del Empresario 💼</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Resumen de la situación actual de tu capital humano.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Empleados</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmpleados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.activos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">De Baja</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-500"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.baja}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-orange-500"><path d="M22 10.5h-1V7a5 5 0 0 0-10 0v3.5H2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5Z" /><path d="M17 7.5a2.5 2.5 0 0 0-5 0" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humanCapitalData.vacaciones}</div>
            </CardContent>
          </Card>
        </section>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Empleados</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #ccc',
                    borderRadius: '0.5rem',
                  }}
                  formatter={(value, name) => [`${value} empleados`, name]}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
