'use client';

interface HeroSectionProps {
  onShowLogin: () => void;
}

export default function HeroSection({ onShowLogin }: HeroSectionProps) {
  return (
    <main className="h-full flex items-center justify-center">
        <section id="inicio" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Bienvenido a
                        <span className="block text-yellow-300">TS Plataforma Digital</span>
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                        Tu solución integral para la transformación digital. Innovamos, creamos y potenciamos tu presencia en el mundo digital.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={onShowLogin}
                            className="animate-pulse bg-yellow-400 text-purple-900 px-12 py-5 rounded-lg font-semibold text-xl hover:bg-yellow-300 transition-colors shadow-lg h-auto text-lg"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
