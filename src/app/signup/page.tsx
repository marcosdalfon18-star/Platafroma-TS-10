'use client';

import Link from 'next/link';

export default function SignupPage() {
    
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        alert('¡Cuenta creada! Ahora puedes iniciar sesión.');
        // En una app real, aquí redirigiríamos al login
        // router.push('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
                    <p className="mt-2 text-gray-600">Únete a TS Plataforma Digital</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-primary focus:border-primary"
                            placeholder="Tu nombre completo"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-primary focus:border-primary"
                            placeholder="tu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 font-semibold text-white bg-primary rounded-md hover:bg-primary/90"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                 <p className="text-sm text-center text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/" className="font-medium text-primary hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
