
"use client";

import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 p-2 mb-2">
            <span className="text-2xl font-bold">TS Plataforma Digital</span>
          </div>
          <p className="text-muted-foreground">
            Tu plataforma de gestión de talento sostenible.
          </p>
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
