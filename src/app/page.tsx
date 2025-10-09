'use client';

import { useState } from 'react';
import { useCurrentRole } from './layout';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock User object to simulate login
const mockUser = {
  uid: 'mock-user-uid',
  email: 'consultor@test.com',
  displayName: 'Mock User',
  photoURL: null,
  phoneNumber: null,
  providerId: 'password',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({
    token: '',
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    expirationTime: '',
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};


function LoginModal({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean, onClose: () => void, onLoginSuccess: () => void }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">TS</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta de TS Plataforma Digital</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</Label>
            <Input type="email" required placeholder="tu@email.com" />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</Label>
            <div className="relative">
              <Input type={passwordVisible ? 'text' : 'password'} required placeholder="••••••••" />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
            Acceder
          </Button>
        </form>
        <div className="text-center mt-4">
          <button onClick={() => alert('Forgot Password functionality not implemented yet.')} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">o continúa con</span></div>
        </div>
        <Button variant="outline" className="w-full">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg>
          Continuar con Google
        </Button>
        <div className="text-center mt-6">
          <span className="text-gray-600">¿No tienes cuenta? </span>
          <button onClick={() => alert('Register functionality not implemented yet.')} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
            Regístrate
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { setUser } = useCurrentRole();
    const router = useRouter();

    const handleLoginSuccess = () => {
      setUser(mockUser);
      router.push('/dashboard');
    }

    return (
        <div className="font-sans min-h-screen flex flex-col">
            {/* Hero Section */}
            <main id="inicio" className="flex-grow flex items-center justify-center gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            Bienvenido a
                            <span className="block text-yellow-300">TS Plataforma Digital</span>
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                            Tu solución integral para la transformación digital. Innovamos, creamos y potenciamos tu presencia en el mundo digital.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="animate-pulse bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
