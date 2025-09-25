"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function EmpresarioDashboard() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada 👋");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto p-4">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard del Empresario 💼</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
             </div>
             <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-center">Bienvenido, aquí verás la información relevante para tu empresa.</p>
             </div>
        </div>
    </div>
  );
}
