
"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Circle, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";


const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Como no hay autenticación, simplemente redirigimos a la página de inicio.
    router.push('/');
  };

  return (
    <header className="p-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-bold hidden sm:block">TS Plataforma Digital</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Circle className={`absolute top-1 right-1 h-2 w-2 fill-current text-gray-400`} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notificaciones</h4>
                        <p className="text-sm text-muted-foreground">
                           Actualmente no hay notificaciones.
                        </p>
                    </div>
                </div>
            </PopoverContent>
          </Popover>
           <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar Sesión</span>
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
