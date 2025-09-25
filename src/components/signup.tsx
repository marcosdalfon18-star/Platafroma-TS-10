"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from "lucide-react";


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

      setSuccess(`✅ ¡Usuario registrado! Ya puedes iniciar sesión.`);
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
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
            <CardDescription>Regístrate para empezar a gestionar el talento de forma sostenible.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="signup-email">Correo</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="signup-password">Contraseña</Label>
                    <Input
                        id="signup-password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                 </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Quiero registrarme como</Label>
                     <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role" className="w-full">
                            <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="consultor">Consultor</SelectItem>
                            <SelectItem value="empresario">Empresario</SelectItem>
                            <SelectItem value="empleado">Empleado</SelectItem>
                            <SelectItem value="gestor">Gestor</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Registrando..." : "Registrarse"}
                </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
        </CardContent>
    </Card>
  );
}
