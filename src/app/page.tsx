
"use client";

import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full flex-wrap">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-800 p-12">
        <div className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-12 w-12 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                <h1 className="text-3xl font-bold">TS Plataforma Digital</h1>
            </div>
          <p className="text-lg text-muted-foreground">Tu plataforma de gestión de talento sostenible.</p>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden text-center mb-8">
                 <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                    <span className="text-2xl font-bold">TS Plataforma Digital</span>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold">Accede a tu cuenta</h2>
                <p className="text-muted-foreground">Introduce tus credenciales para continuar.</p>
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
