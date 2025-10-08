
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState("empleado");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "Las contraseñas no coinciden.",
      });
      return;
    }
    console.log('Simulating registration with:', { email, password, role });
    toast({
        title: "¡Registro simulado!",
        description: "Ahora puedes iniciar sesión con tus datos.",
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="signup-email">Email</Label>
          <Input
              type="email"
              id="signup-email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
      </div>
      <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="signup-password">Contraseña</Label>
          <Input
              type="password"
              id="signup-password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
      </div>
      <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
          <Input
              type="password"
              id="confirm-password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
          />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Tipo de cuenta</Label>
        <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role">
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
      <Button type="submit" className="w-full mt-2">Registrarse</Button>
    </form>
  );
}

export default function SignupPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Crear una cuenta</h1>
                <p className="text-muted-foreground">Únete a la plataforma para gestionar el talento.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Formulario de Registro</CardTitle>
                    <CardDescription>Completa tus datos para crear tu perfil.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
            </Card>
            <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/" className="font-semibold text-primary hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
      </div>
    );
  }
