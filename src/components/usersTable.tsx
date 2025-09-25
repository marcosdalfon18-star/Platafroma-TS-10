"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

type User = {
  id: string;
  email: string;
  role: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(usersCollection, 
      (snapshot) => {
        const usersData: User[] = [];
        snapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() } as User);
        });
        setUsers(usersData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error al obtener usuarios:", err);
        setError("No se pudieron cargar los usuarios.");
        setLoading(false);
      }
    );

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
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
