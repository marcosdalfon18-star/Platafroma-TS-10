"use client";
import React from 'react';

const mockUsers = [
  { id: '1', email: 'consultor@test.com', role: 'consultor' },
  { id: '2', email: 'empresario@test.com', role: 'empresario' },
  { id: '3', email: 'empleado@test.com', role: 'empleado' },
  { id: '4', email: 'gestor@test.com', role: 'gestor' },
];

export default function UsersTable() {
  // Simulamos la carga de usuarios sin llamar a Firebase
  const users = mockUsers;
  const loading = false;
  const error = null;

  if (loading) return <p className="text-center py-10">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500 text-center py-10">Error: {error}</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Lista de Usuarios (Simulación)</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2 text-left">Correo Electrónico</th>
                <th className="border px-4 py-2 text-left">Rol</th>
            </tr>
            </thead>
            <tbody>
            {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2 capitalize">{u.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
