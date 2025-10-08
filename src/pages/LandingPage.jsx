import React, { useState } from "react";

export default function LandingPage() {
  const [modal, setModal] = useState(""); // "", "login", "register", "forgot"

  // Funciones de apertura/cierre
  const showLogin = () => setModal("login");
  const hideLogin = () => setModal("");
  const showRegister = () => setModal("register");
  const hideRegister = () => setModal("");
  const showForgot = () => setModal("forgot");
  const hideForgot = () => setModal("");

  // ¡Aquí puedes poner tus handlers reales!
  const handleLogin = (e) => {
    e.preventDefault();
    hideLogin();
    alert("¡Bienvenido a TS Plataforma Digital!");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    hideRegister();
    alert("¡Cuenta creada exitosamente! Ya puedes iniciar sesión.");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    hideForgot();
    alert("Revisa tu correo para restablecer tu contraseña.");
  };

  // Fondo gradiente y los mismos estilos CSS puedes ponerlos en tu index.css si quieres.
  return (
    <div className="h-full gradient-bg font-sans min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Bienvenido a
              <span className="block text-yellow-300">TS Plataforma Digital</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Tu solución integral para la transformación digital. Innovamos, creamos y potenciamos tu presencia en el mundo digital.
            </p>
            <div className="flex justify-center">
              <button
                onClick={showLogin}
                className="pulse-button bg-yellow-400 text-purple-900 px-12 py-5 rounded-lg font-semibold text-xl hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {modal === "login" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
            <button onClick={hideLogin} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">TS</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600">Accede a tu cuenta de TS Plataforma Digital</p>
            </div>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Acceder
              </button>
            </form>
            <div className="text-center mt-4">
              <button onClick={showForgot} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o continúa con</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continuar con Google</span>
            </button>
            <div className="text-center mt-6">
              <span className="text-gray-600">¿No tienes cuenta? </span>
              <button onClick={showRegister} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                Regístrate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {modal === "register" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
            <button onClick={hideRegister} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">TS</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
              <p className="text-gray-600">Únete a TS Plataforma Digital</p>
            </div>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Tu nombre completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Registrarse
              </button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o regístrate con</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continuar con Google</span>
            </button>
            <div className="text-center mt-6">
              <span className="text-gray-600">¿Ya tienes cuenta? </span>
              <button onClick={showLogin} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                Inicia sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {modal === "forgot" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
            <button onClick={hideForgot} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
              <p className="text-gray-600">Te enviaremos un enlace para restablecer tu contraseña</p>
            </div>
            <form className="space-y-6" onSubmit={handleForgot}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="tu@email.com" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Enviar Enlace
              </button>
            </form>
            <div className="text-center mt-6">
              <button onClick={showLogin} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                ← Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-button {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
