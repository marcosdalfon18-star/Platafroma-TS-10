"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consultor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });

      setSuccess(`✅ ¡Usuario registrado con rol: ${role}! Ya puedes iniciar sesión.`);
      setEmail("");
      setPassword("");
      setRole("consultor");
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError("❌ El correo electrónico ya está en uso.");
      } else {
        setError("❌ Error al registrar: " + error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="consultor">Consultor</option>
          <option value="empresario">Empresario</option>
          <option value="empleado">Empleado</option>
          <option value="gestor">Gestor</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
       {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
       {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
    </div>
  );
}
