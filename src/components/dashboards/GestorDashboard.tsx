"use client";
import React from "react";

export default function GestorDashboard() {
  return (
    <div className="bg-background">
        <div className="w-full max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard del Gestor 📈</h1>
             </div>
             <div className="p-4 bg-card rounded-lg shadow">
                <p className="text-center">Bienvenido, aquí podrás gestionar los recursos y ver estadísticas.</p>
             </div>
        </div>
    </div>
  );
}
