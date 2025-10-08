
"use client";

import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center bg-gray-900 text-white p-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-12 w-12 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
            <span className="text-4xl font-bold">TS Plataforma Digital</span>
        </div>
        <p className="text-xl text-gray-300">Transformando la gestión del talento, de forma sostenible.</p>
      </div>

      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900/40 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:hidden">
              <div className="flex items-center justify-center gap-2 p-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                <span className="text-2xl font-bold">TS Plataforma Digital</span>
              </div>
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
