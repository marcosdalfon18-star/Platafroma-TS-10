"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada 👋");
    window.location.reload(); // refresca y te devuelve al login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-2xl font-bold mb-6">Bienvenido al Dashboard 🎉</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
