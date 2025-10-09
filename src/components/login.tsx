"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';


export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Introduce tus credenciales para acceder a la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Correo</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        required
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        required
                    />
                 </div>
                <Button 
                    type="submit" 
                    className="w-full"
                >
                  Entrar
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
