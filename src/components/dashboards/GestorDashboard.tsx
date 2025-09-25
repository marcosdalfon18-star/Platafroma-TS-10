"use client";
import React from "react";

export default function GestorDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto p-4">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard del Gestor 📈</h1>
             </div>
             <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-center">Bienvenido, aquí podrás gestionar los recursos y ver estadísticas.</p>
             </div>
        </div>
    </div>
  );
}
