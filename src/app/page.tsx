'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import LoginForm from '@/components/LoginForm';

// Login extraído a componente dedicado LoginForm

function Signup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
                <CardDescription>Funcionalidad de registro deshabilitada temporalmente.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center text-muted-foreground p-8">
                El registro de nuevos usuarios se activará en una futura versión.
               </div>
            </CardContent>
        </Card>
    );
}


export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (user) {
        return null; // Se está redirigiendo
    }

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
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <Signup />
                </TabsContent>
            </Tabs>
        </div>
    );
}
