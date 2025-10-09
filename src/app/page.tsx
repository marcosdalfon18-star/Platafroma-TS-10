"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/login';
import Signup from '@/components/signup';

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
