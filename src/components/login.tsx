"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import React from "react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // El onAuthStateChanged en la página principal se encargará de redirigir
    } catch (err: any) {
      setError("Correo o contraseña incorrectos.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
    </div>
  );
}
