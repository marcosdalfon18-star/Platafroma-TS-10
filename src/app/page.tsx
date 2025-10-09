"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navegación directa al dashboard sin autenticación real
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
                        defaultValue="test@test.com"
                        required
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        defaultValue="password"
                        required
                    />
                 </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}

function Signup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
                <CardDescription>Funcionalidad de registro deshabilitada temporalmente.</CardDescription>
            </Header>
            <CardContent>
               <div className="text-center text-muted-foreground p-8">
                El registro de nuevos usuarios se activará en una futura versión.
               </div>
            </CardContent>
        </Card>
    );
}


export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary rounded-full mb-4">
                    <span className="text-white font-bold text-3xl">TS</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Bienvenido a <span className="text-primary">TS Plataforma Digital</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Tu solución integral para la transformación digital.
                </p>
            </div>
            
            <Tabs defaultValue="login" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                    <TabsTrigger value="signup">Crear Cuenta</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="signup">
                    <Signup />
                </TabsContent>
            </Tabs>
        </div>
    );
}
