"use client";
import React from "react";
import UsersTable from "@/components/usersTable";

export default function ConsultorDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto p-4">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard del Consultor 🧐</h1>
             </div>
             <UsersTable />
        </div>
    </div>
  );
}
