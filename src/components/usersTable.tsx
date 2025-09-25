"use client";
import { useEffect, useState } from "react";

// URL de la Cloud Function
const API_URL = "https://getusers-f33kzu6gwa-uc.a.run.app";

type User = {
  id: number;
  name: string;
  role: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-10">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500 text-center py-10">Error: {error}</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Nombre</th>
                <th className="border px-4 py-2 text-left">Rol</th>
            </tr>
            </thead>
            <tbody>
            {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2 capitalize">{u.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
