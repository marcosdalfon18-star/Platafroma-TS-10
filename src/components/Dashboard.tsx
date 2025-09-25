"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import UsersTable from "@/components/usersTable";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada 👋");
    window.location.reload(); // refresca y te devuelve al login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto p-4">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bienvenido al Dashboard 🎉</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
             </div>
             <UsersTable />
        </div>
    </div>
  );
}
