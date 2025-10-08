
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrentRole } from './layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock User object to simulate login
const mockUser = {
    uid: "mock-user-uid",
    email: "consultor@test.com",
    displayName: "Mock User",
    photoURL: null,
    phoneNumber: null,
    providerId: "password",
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => "",
    getIdTokenResult: async () => ({
        token: "",
        authTime: "",
        issuedAtTime: "",
        signInProvider: null,
        signInSecondFactor: null,
        expirationTime: "",
        claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
};

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useCurrentRole();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Simulating login with:', { email, password });
    // Simulate a successful login
    setUser(mockUser);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
      </div>
      <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
      </div>
      <Button type="submit" className="w-full mt-2">Acceder</Button>
    </form>
  );
}


export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
       <div className="w-full max-w-md">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed">Bienvenido a TS Plataforma Digital</h1>
            <p className="text-muted-foreground leading-relaxed">Gestiona el talento de forma sostenible</p>
         </div>
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Accede a tu cuenta</CardTitle>
                <CardDescription>Ingresa tus credenciales para continuar.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
        <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
                ¿No tienes una cuenta?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                     Regístrate
                </Link>
            </p>
        </div>
       </div>
    </div>
  );
}
