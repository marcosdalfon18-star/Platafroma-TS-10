
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Circle, LogOut } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCurrentRole } from "@/app/layout";

type Role = "consultor" | "empresario" | "empleado" | "gestor";

interface HeaderProps {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
    const { user, setUser } = useCurrentRole();
    const {
        permissionStatus,
        requestPermission,
        sendTestNotification
    } = usePushNotifications();

    const handleLogout = () => {
        // Simulate logout by setting user to null
        setUser(null);
    };

    const getStatusColor = () => {
        switch (permissionStatus) {
            case "granted": return "text-green-500";
            case "denied": return "text-red-500";
            default: return "text-gray-400";
        }
    }

  return (
    <header className="p-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-bold hidden sm:block">TS Plataforma Digital (Dev)</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.email === 'consultor@test.com' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline">Ver como:</span>
              <Button variant={userRole === 'consultor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("consultor")}>Consultor</Button>
              <Button variant={userRole === 'empresario' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empresario")}>Empresario</Button>
              <Button variant={userRole === 'empleado' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("empleado")}>Empleado</Button>
              <Button variant={userRole === 'gestor' ? 'default' : 'outline'} size="sm" onClick={() => setUserRole("gestor")}>Gestor</Button>
            </div>
          )}
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Circle className={`absolute top-1 right-1 h-2 w-2 fill-current ${getStatusColor()}`} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notificaciones Push</h4>
                        <p className="text-sm text-muted-foreground">
                           Gestiona los permisos para recibir alertas en tiempo real.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                             <span className="text-sm font-medium">Estado actual:</span>
                             <span className={`text-sm font-semibold capitalize ${getStatusColor()}`}>{permissionStatus}</span>
                        </div>
                        {permissionStatus === 'default' && (
                            <Button onClick={requestPermission}>Activar Notificaciones</Button>
                        )}
                        {permissionStatus === 'denied' && (
                            <p className="text-xs text-center text-red-500">Has bloqueado las notificaciones. Debes activarlas en la configuración de tu navegador.</p>
                        )}
                        {permissionStatus === 'granted' && (
                             <Button variant="outline" onClick={() => sendTestNotification("¡Notificación de prueba! 🚀", "Si ves esto, todo funciona correctamente.")}>
                                Enviar prueba
                             </Button>
                        )}
                    </div>
                </div>
            </PopoverContent>
          </Popover>
           <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
