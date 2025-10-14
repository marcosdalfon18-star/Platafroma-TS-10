'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';


function Login() {
  const router = useRouter();
  const { login, register, resetPassword, verifyEmail } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: showDemo ? 'test@test.com' : '',
    password: showDemo ? 'Password123!' : ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 300; // 5 minutos en segundos

  // Efecto para manejar el temporizador de bloqueo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimeRemaining > 0) {
      interval = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimeRemaining]);

  // Función para bloquear temporalmente el login
  const blockLogin = () => {
    setIsBlocked(true);
    setBlockTimeRemaining(BLOCK_DURATION);
    toast({
      title: "Cuenta temporalmente bloqueada",
      description: `Demasiados intentos fallidos. Intenta nuevamente en ${Math.floor(BLOCK_DURATION / 60)} minutos.`,
      variant: "destructive"
    });
  };

  // Funciones de validación
  const validateEmail = (email: string): string => {
    if (!email) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email inválido';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase) return 'La contraseña debe contener al menos una mayúscula';
    if (!hasLowerCase) return 'La contraseña debe contener al menos una minúscula';
    if (!hasNumbers) return 'La contraseña debe contener al menos un número';
    if (!hasSpecialChar) return 'La contraseña debe contener al menos un carácter especial';
    
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Ingresa tu email para restablecer la contraseña' });
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsResettingPassword(true);
    try {
      await resetPassword(formData.email);
      toast({
        title: "Email enviado",
        description: "Se ha enviado un enlace de restablecimiento a tu correo",
      });
      setErrors({});
    } catch (error) {
      console.error('Error al enviar email de restablecimiento:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el email de restablecimiento",
        variant: "destructive"
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      const minutes = Math.floor(blockTimeRemaining / 60);
      const seconds = blockTimeRemaining % 60;
      toast({
        title: "Cuenta bloqueada",
        description: `Espera ${minutes}:${seconds.toString().padStart(2, '0')} antes de intentar nuevamente`,
        variant: "destructive"
      });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    console.log('Iniciando login con:', formData.email);
    
    try {
      await login(formData.email, formData.password);
      console.log('Login exitoso, redirigiendo...');
      
      // Resetear intentos en login exitoso
      setLoginAttempts(0);
      setIsBlocked(false);
      setBlockTimeRemaining(0);
      
      toast({
        title: "Login exitoso",
        description: "Bienvenido a la plataforma",
      });
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Error completo al iniciar sesión:', error);
      
      const firebaseError = error as { code?: string; message?: string };
      console.error('Código de error:', firebaseError.code);
      console.error('Mensaje de error:', firebaseError.message);
      
      // Incrementar intentos fallidos
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        blockLogin();
        return;
      }
      
      // Si el usuario no existe, crearlo automáticamente
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/invalid-credential' || firebaseError.code === 'auth/invalid-login-credentials') {
        try {
          console.log('Creando usuario de prueba automáticamente...');
          await register(formData.email, formData.password, 'Usuario de Prueba', 'empresario');
          console.log('Usuario creado exitosamente, enviando verificación de email...');
          
          // Enviar email de verificación para nuevos usuarios
          try {
            await verifyEmail();
            toast({
              title: "Usuario creado - Verificar email",
              description: "Se ha enviado un email de verificación. Por favor, verifica tu correo antes de continuar.",
              duration: 6000,
            });
          } catch (verifyError) {
            console.log('No se pudo enviar email de verificación:', verifyError);
          }
          
          toast({
            title: "Usuario creado y autenticado",
            description: "Se ha creado tu usuario de prueba. ¡Bienvenido!",
          });
          router.push('/dashboard');
        } catch (registerError: unknown) {
          const regError = registerError as { code?: string; message?: string };
          console.error('Error completo al crear usuario:', registerError);
          console.error('Código de error registro:', regError.code);
          toast({
            title: "Error al crear usuario",
            description: regError.message || "No se pudo crear el usuario de prueba",
            variant: "destructive"
          });
        }
      } else {
        const remainingAttempts = MAX_ATTEMPTS - newAttempts;
        toast({
          title: "Error al iniciar sesión",
          description: `${firebaseError.code}: ${firebaseError.message || "Error desconocido"}. Te quedan ${remainingAttempts} intentos.`,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Introduce tus credenciales para acceder a la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(prev => ({...prev, email: e.target.value}));
                          if (errors.email) setErrors(prev => ({...prev, email: ''}));
                        }}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData(prev => ({...prev, password: e.target.value}));
                            if (errors.password) setErrors(prev => ({...prev, password: ''}));
                          }}
                          className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.password}
                      </p>
                    )}
                    
                    {/* Indicador de fortaleza de contraseña */}
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Fortaleza:</span>
                          <span className={`font-medium ${
                            getPasswordStrength(formData.password).score >= 3 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {getPasswordStrength(formData.password).level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                            style={{ width: `${getPasswordStrength(formData.password).percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm font-medium">
                      Recordarme
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                    className="text-sm text-primary hover:underline disabled:opacity-50"
                  >
                    {isResettingPassword ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      '¿Olvidaste tu contraseña?'
                    )}
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || isBlocked}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isBlocked ? (
                    `Bloqueado (${Math.floor(blockTimeRemaining / 60)}:${(blockTimeRemaining % 60).toString().padStart(2, '0')})`
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
            </form>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setShowDemo(!showDemo)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {showDemo ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {showDemo ? 'Ocultar' : 'Mostrar'} credenciales de demo
                </button>
                {showDemo && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
              
              {showDemo && (
                <>
                  <p className="text-sm text-muted-foreground text-center mb-2">
                    Usuario de prueba: <code className="bg-muted px-1 rounded">test@test.com</code> / <code className="bg-muted px-1 rounded">Password123!</code>
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Si no existe, se creará automáticamente al hacer login
                  </p>
                </>
              )}
            </div>
        </CardContent>
    </Card>
  );
}

function Signup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
                <CardDescription>Funcionalidad de registro deshabilitada temporalmente.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center text-muted-foreground p-8">
                El registro de nuevos usuarios se activará en una futura versión.
               </div>
            </CardContent>
        </Card>
    );
}


export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (user) {
        return null; // Se está redirigiendo
    }

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
