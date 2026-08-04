import React from 'react';
import { Newspaper, Hammer, ArrowRight, Construction, HardHat, Compass } from 'lucide-react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function NoticiasClient({ lang }: { lang: 'es' | 'en' }) {
  return (
    // Se mantiene el fondo base Navy
    <div className="min-h-screen flex flex-col bg-[#002342] text-white overflow-hidden relative">

      <Header />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main id="main-content" tabIndex={-1} className="flex-grow flex items-center justify-center relative pt-36 md:pt-44 pb-20 px-4">

        {/* 1. FONDO (estático) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            {/* Luz central profunda */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#003366] rounded-full mix-blend-screen filter blur-[150px] opacity-40"></div>

            {/* Patrón de Red Geométrica y Líneas de Construcción */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#B2904D" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                {/* Red de fondo */}
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Líneas diagonales grandes cruzando la pantalla */}
                <line
                  x1="0" y1="100%" x2="100%" y2="0"
                  stroke="#B2904D" strokeWidth="1" opacity="0.2"
                />
                <line
                  x1="-20%" y1="50%" x2="120%" y2="50%"
                  stroke="#B2904D" strokeWidth="1" opacity="0.1"
                  strokeDasharray="10,10"
                />
            </svg>

            {/* Partículas Doradas (estáticas) */}
            {[...Array(15)].map((_, i) => (
                <span
                    key={i}
                    className="absolute bg-[#B2904D] rounded-full opacity-30"
                    style={{
                        left: ((i * 37) % 100) + '%',
                        top: ((i * 53) % 100) + '%',
                        width: ((i % 5) + 3) + 'px',
                        height: ((i % 5) + 3) + 'px',
                    }}
                />
            ))}
        </div>

        {/* 2. TARJETA CENTRAL (Glassmorphism) */}
        <div
            className="relative z-10 w-full max-w-3xl bg-[#001a33]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 text-center shadow-2xl ring-1 ring-[#B2904D]/20"
        >
            {/* Decoración superior de la tarjeta */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent opacity-70"></div>

            {/* Icono Central */}
            <div className="flex justify-center mb-8 relative">
                <div
                    className="relative z-10 bg-gradient-to-br from-[#002342] to-[#00152b] p-6 rounded-full border-[3px] border-[#B2904D] shadow-[0_0_35px_rgba(178,144,77,0.4)]"
                >
                    <Newspaper size={64} className="text-white/90" />

                    {/* Martillo y Brújula */}
                    <div
                        className="absolute -right-5 -top-2 bg-[#B2904D] p-2 rounded-full text-[#002342] shadow-lg"
                    >
                        <Hammer size={22} />
                    </div>
                    <div className="absolute -left-4 bottom-0 text-[#B2904D] opacity-70">
                       <Compass size={28} />
                    </div>
                </div>
            </div>

            {/* Texto Principal */}
            <h1
                className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    Estamos Cimentando
                </span> <br />
                <span className="text-[#B2904D] drop-shadow-md">La Verdad</span>
            </h1>

            <p
                className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed font-light"
            >
                Nuestra sección de <strong>Noticias</strong> está bajo una reconstrucción estratégica.
                Pronto encontrará aquí análisis jurídicos profundos y actualizaciones migratorias esenciales.
            </p>

            {/* --- Barra de Progreso 26% --- */}
            <div className="max-w-md mx-auto mb-12 relative">
                <div className="flex justify-between text-xs text-[#B2904D]/80 font-bold uppercase tracking-[0.2em] mb-3">
                    <span>Fase Inicial de Arquitectura</span>
                    <span className="text-[#B2904D]">26%</span>
                </div>

                {/* Contenedor de la barra */}
                <div className="h-3 w-full bg-[#001021] rounded-full overflow-hidden relative border border-white/10 box-shadow-inner">
                    {/* Barra de relleno (estática) */}
                    <div
                        className="h-full bg-gradient-to-r from-[#B2904D] to-[#d4af67] absolute top-0 left-0 rounded-full relative overflow-hidden"
                        style={{ width: '26%' }}
                    >
                         {/* Brillo intenso en la punta de la barra */}
                         <div className="absolute right-0 top-0 h-full w-[5px] bg-white blur-[3px]"></div>
                    </div>
                </div>
            </div>

            {/* Botones de Acción */}
            <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href={`/${lang}`} className="group relative px-8 py-4 bg-white text-[#002342] font-bold rounded-full overflow-hidden shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_5px_20px_rgba(255,255,255,0.2)] transition-all">
                    <span className="relative z-10 flex items-center gap-2">
                        Volver al Inicio
                    </span>
                </Link>

                <Link href={`/${lang}#oficinas`} className="group relative px-8 py-4 text-[#B2904D] font-bold rounded-full overflow-hidden transition-all flex items-center justify-center gap-2 border-2 border-[#B2904D]/50 hover:border-[#B2904D]">
                     <span className="relative z-10 flex items-center gap-2">
                        Contactar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                     {/* Fondo sutil al hacer hover */}
                    <div className="absolute inset-0 bg-[#B2904D] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
            </div>

        </div>

        {/* Elementos decorativos flotantes del fondo (estáticos) */}
        <div
            className="absolute bottom-20 left-10 opacity-20 hidden lg:block pointer-events-none"
        >
            <Construction size={120} className="text-[#B2904D] blur-[2px]" />
        </div>
        <div
            className="absolute top-40 right-10 opacity-10 hidden lg:block pointer-events-none"
        >
            <HardHat size={100} className="text-white blur-[2px]" />
        </div>

      </main>

      <Footer />
    </div>
  );
}
