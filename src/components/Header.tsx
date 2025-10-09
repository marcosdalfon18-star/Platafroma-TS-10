
"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Circle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface HeaderProps {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {

  return (
    <header className="p-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-bold hidden sm:block">TS Plataforma Digital (Dev)</h1>
        </div>
        
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline">Ver como:</span>
              <Button variant={userRole === 'consultor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("consultor")}>Consultor</Button>
              <Button variant={userRole === 'empresario' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empresario")}>Empresario</Button>
              <Button variant={userRole === 'empleado' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empleado")}>Empleado</Button>
              <Button variant={userRole === 'gestor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("gestor")}>Gestor</Button>
            </div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
