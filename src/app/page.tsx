
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="relative hidden lg:flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <Image
            src="https://picsum.photos/seed/loginbg/1200/1800"
            alt="Fondo de la página de autenticación"
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 z-0 opacity-40"
            data-ai-hint="office background"
        />
        <div className="relative z-10 p-8 text-center">
            <div className="flex items-center justify-center gap-2 p-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-10 w-10 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                <span className="text-4xl font-bold">TS Digital</span>
            </div>
            <h1 className="text-3xl font-bold">Bienvenido a la revolución del talento</h1>
            <p className="text-muted-foreground mt-2">La plataforma integral para potenciar el crecimiento de tu PYME.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 min-h-screen lg:p-12">
        <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
                <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                    <span className="text-2xl font-bold">TS Digital</span>
                </div>
                <h1 className="text-2xl font-bold">Accede a tu cuenta</h1>
                <p className="text-muted-foreground">Tu plataforma de gestión de talento sostenible.</p>
            </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <Login />
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <Signup />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
