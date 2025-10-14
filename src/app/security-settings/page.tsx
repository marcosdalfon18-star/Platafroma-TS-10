"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Key, 
  Mail, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function SecuritySettings() {
  const { user, resetPassword, verifyEmail } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estados para configuraciones de seguridad
  const [securitySettings, setSecuritySettings] = useState({
    emailVerified: user?.uid ? true : false, // Simular estado
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30, // minutos
  });

  // Función para calcular la fortaleza de la contraseña
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    const levels = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      score,
      level: levels[score] || 'Muy débil',
      color: colors[score] || 'bg-red-500',
      percentage: (score / 5) * 100
    };
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    if (getPasswordStrength(passwordData.newPassword).score < 3) {
      toast({
        title: "Contraseña débil",
        description: "Por favor, usa una contraseña más fuerte",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Aquí iría la lógica real para cambiar contraseña
      // Por ahora solo mostramos un mensaje de éxito
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido cambiada exitosamente",
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo cambiar la contraseña",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      await verifyEmail();
      toast({
        title: "Email enviado",
        description: "Se ha enviado un correo de verificación",
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar el email de verificación",
        variant: "destructive"
      });
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    
    try {
      await resetPassword(user.email);
      toast({
        title: "Email enviado",
        description: "Se ha enviado un enlace para restablecer tu contraseña",
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar el email de restablecimiento",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Configuración de Seguridad
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona la seguridad de tu cuenta y protege tu información
        </p>
      </div>

      {/* Estado General de Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Estado de Seguridad
          </CardTitle>
          <CardDescription>
            Resumen del nivel de seguridad de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              {securitySettings.emailVerified ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-orange-500" />
              )}
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {securitySettings.emailVerified ? 'Verificado' : 'Sin verificar'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              {securitySettings.twoFactorEnabled ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-orange-500" />
              )}
              <div>
                <p className="font-medium">Autenticación 2FA</p>
                <p className="text-sm text-muted-foreground">
                  {securitySettings.twoFactorEnabled ? 'Activada' : 'Desactivada'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">Sesión</p>
                <p className="text-sm text-muted-foreground">
                  Timeout: {securitySettings.sessionTimeout}min
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cambio de Contraseña */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>
            Actualiza tu contraseña regularmente para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Indicador de fortaleza */}
              {passwordData.newPassword && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fortaleza:</span>
                    <Badge variant={getPasswordStrength(passwordData.newPassword).score >= 3 ? "default" : "destructive"}>
                      {getPasswordStrength(passwordData.newPassword).level}
                    </Badge>
                  </div>
                  <Progress 
                    value={getPasswordStrength(passwordData.newPassword).percentage} 
                    className="h-2"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Actualizando..." : "Cambiar Contraseña"}
              </Button>
              <Button type="button" variant="outline" onClick={handleResetPassword}>
                Enviar Reset por Email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Verificación de Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Verificación de Email
          </CardTitle>
          <CardDescription>
            Verifica tu dirección de correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {securitySettings.emailVerified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <p className="font-medium">{user?.email}</p>
                <p className="text-sm text-muted-foreground">
                  {securitySettings.emailVerified ? 'Email verificado' : 'Email sin verificar'}
                </p>
              </div>
            </div>
            
            {!securitySettings.emailVerified && (
              <Button onClick={handleSendVerificationEmail}>
                Enviar Verificación
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configuraciones de Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Configuraciones de Seguridad
          </CardTitle>
          <CardDescription>
            Personaliza las opciones de seguridad de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Autenticación de Dos Factores</p>
              <p className="text-sm text-muted-foreground">
                Agrega una capa extra de seguridad a tu cuenta
              </p>
            </div>
            <Switch
              checked={securitySettings.twoFactorEnabled}
              onCheckedChange={(checked) => 
                setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Notificaciones de Inicio de Sesión</p>
              <p className="text-sm text-muted-foreground">
                Recibe alertas cuando alguien acceda a tu cuenta
              </p>
            </div>
            <Switch
              checked={securitySettings.loginNotifications}
              onCheckedChange={(checked) => 
                setSecuritySettings(prev => ({ ...prev, loginNotifications: checked }))
              }
            />
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Timeout de Sesión</p>
              <span className="text-sm text-muted-foreground">{securitySettings.sessionTimeout} min</span>
            </div>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={securitySettings.sessionTimeout}
              onChange={(e) => 
                setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15 min</span>
              <span>2 horas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}