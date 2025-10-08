'use client';

import { useState, type FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrentRole } from './layout';
import { useRouter } from 'next/navigation';
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


const LoginModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onShowRegister: () => void;
  onShowForgot: () => void;
}> = ({ isOpen, onClose, onShowRegister, onShowForgot }) => {
  const { setUser } = useCurrentRole();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(mockUser);
    router.push('/dashboard');
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
                {/* Icon will change based on state, simplified here */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
            Acceder
          </Button>
        </form>
        <div className="text-center mt-4">
          <button onClick={() => { onClose(); onShowForgot(); }} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
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
          <button onClick={() => { onClose(); onShowRegister(); }} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
            Regístrate
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RegisterModal: FC<{ isOpen: boolean; onClose: () => void; onShowLogin: () => void; }> = ({ isOpen, onClose, onShowLogin }) => {
   const router = useRouter();

   const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration and redirect
    router.push('/');
    onClose();
    setTimeout(() => {
        alert('¡Cuenta creada! Por favor, inicia sesión.');
        onShowLogin();
    }, 500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">TS</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
                <p className="text-gray-600">Únete a TS Plataforma Digital</p>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
                 <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</Label>
                    <Input type="text" required placeholder="Tu nombre completo" />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</Label>
                    <Input type="email" required placeholder="tu@email.com" />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</Label>
                    <Input type="password" required placeholder="••••••••" />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</Label>
                    <Input type="password" required placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Registrarse
                </Button>
            </form>
             <div className="text-center mt-6">
                <span className="text-gray-600">¿Ya tienes cuenta? </span>
                <button onClick={() => { onClose(); onShowLogin(); }} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                    Inicia sesión
                </button>
            </div>
        </DialogContent>
    </Dialog>
  )
};

const ForgotPasswordModal: FC<{isOpen: boolean; onClose: () => void; onShowLogin: () => void;}> = ({ isOpen, onClose, onShowLogin }) => {
    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
        alert('Se ha enviado un enlace para restablecer tu contraseña a tu correo.');
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
                 <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
                    <p className="text-gray-600">Te enviaremos un enlace para restablecerla</p>
                </div>
                <form onSubmit={handleForgot} className="space-y-6">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</Label>
                        <Input type="email" required placeholder="tu@email.com" />
                    </div>
                     <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                        Enviar Enlace
                    </Button>
                </form>
                <div className="text-center mt-6">
                    <button onClick={() => { onClose(); onShowLogin(); }} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                        ← Volver al inicio de sesión
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);

    return (
        <div className="bg-gray-50 font-sans">
             <header className="bg-white shadow-sm sticky top-0 z-40">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-xl">TS</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">TS Plataforma Digital</h1>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#inicio" className="text-gray-700 hover:text-purple-600 transition-colors">Inicio</a>
                            <a href="#servicios" className="text-gray-700 hover:text-purple-600 transition-colors">Servicios</a>
                            <a href="#nosotros" className="text-gray-700 hover:text-purple-600 transition-colors">Nosotros</a>
                            <a href="#contacto" className="text-gray-700 hover:text-purple-600 transition-colors">Contacto</a>
                        </div>
                        <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <section id="inicio" className="gradient-bg text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center animate-fade-in">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                Bienvenido a <span className="block text-yellow-300">TS Plataforma Digital</span>
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                                Tu solución integral para la transformación digital. Innovamos, creamos y potenciamos tu presencia en el mundo digital.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={() => setIsLoginOpen(true)} className="animate-pulse bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
                                    Iniciar Sesión
                                </button>
                                <a href="#servicios" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-900 transition-colors">
                                    Conocer Más
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="servicios" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h3>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Ofrecemos soluciones digitales completas para impulsar tu negocio al siguiente nivel
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Service Card 1 */}
                             <div className="card-hover bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Desarrollo Web</h4>
                                <p className="text-gray-600 mb-6">Creamos sitios web modernos, responsivos y optimizados para convertir visitantes en clientes.</p>
                                <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Saber más →</button>
                            </div>
                            {/* Service Card 2 */}
                             <div className="card-hover bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Apps Móviles</h4>
                                <p className="text-gray-600 mb-6">Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android.</p>
                                <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Saber más →</button>
                            </div>
                            {/* Service Card 3 */}
                            <div className="card-hover bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Marketing Digital</h4>
                                <p className="text-gray-600 mb-6">Estrategias de marketing digital para aumentar tu visibilidad y ventas online.</p>
                                <button className="text-green-600 font-semibold hover:text-green-800 transition-colors">Saber más →</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="nosotros" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-6">¿Por qué elegir TS Plataforma Digital?</h3>
                                <p className="text-lg text-gray-600 mb-8">
                                    Somos un equipo de expertos en tecnología digital comprometidos con el éxito de nuestros clientes. Combinamos creatividad, innovación y experiencia técnica para entregar soluciones que realmente funcionan.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <span className="text-gray-700 font-medium">Más de 5 años de experiencia</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <span className="text-gray-700 font-medium">100+ proyectos exitosos</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <span className="text-gray-700 font-medium">Soporte 24/7</span>
                                    </div>
                                </div>
                            </div>
                             <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-4">Transformación Digital</h4>
                                    <p className="text-lg opacity-90">
                                        Llevamos tu negocio al futuro con tecnología de vanguardia y estrategias innovadoras.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="contacto" className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                             <h3 className="text-4xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h3>
                             <p className="text-xl text-gray-600">Contáctanos hoy y descubre cómo podemos transformar tu presencia digital</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <form className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-2">Nombre</Label>
                                    <Input type="text" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
                                    <Input type="email" placeholder="tu@email.com" />
                                </div>
                                <div className="md:col-span-2">
                                     <Label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</Label>
                                     <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 h-auto">
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-12">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-xl">TS</span>
                                </div>
                                <h4 className="text-xl font-bold">TS Plataforma Digital</h4>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Transformamos ideas en experiencias digitales excepcionales. Tu éxito es nuestro compromiso.
                            </p>
                        </div>
                         <div>
                            <h5 className="font-semibold mb-4">Enlaces</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                                <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
                                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Contacto</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li>📧 info@tsplataforma.com</li>
                                <li>📱 +1 (555) 123-4567</li>
                                <li>📍 Ciudad, País</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TS Plataforma Digital. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)}
                onShowRegister={() => setIsRegisterOpen(true)}
                onShowForgot={() => setIsForgotOpen(true)}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onShowLogin={() => setIsLoginOpen(true)}
            />
            <ForgotPasswordModal
                isOpen={isForgotOpen}
                onClose={() => setIsForgotOpen(false)}
                onShowLogin={() => setIsLoginOpen(true)}
            />
        </div>
    );
}