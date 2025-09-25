
"use client";

import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <div className="w-full max-w-md p-6">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                    <span className="text-2xl font-bold">TS Plataforma Digital</span>
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
  );
}
