'use client';

import React from 'react';
import { m, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  FileText,
  MessageSquare,
  CreditCard,
  Bell,
  Calendar,
  LogIn,
  Lock,
  Sparkles,
  Smartphone,
  CheckCircle2,
  FileCheck2,
  Award,
  Globe,
  Clock3,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

const PORTAL_URL = 'https://solislawfirm.com/login';

type Bilingual = string | { es: string; en?: string };

const getText = (obj: Bilingual, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es || '';
};

const ui = {
  badge: { es: 'Portal Seguro de Clientes', en: 'Secure Client Portal' },
  heroTitle1: { es: 'Obtenga avances sobre su caso', en: 'Get updates on your case' },
  heroTitle2: { es: 'en tan solo un clic.', en: 'in just one click.' },
  heroDescription: {
    es: 'Bienvenido al nuevo portal de clientes de Law Offices of Manuel Solís. Aquí podrá dar seguimiento a su caso y mantenerse informado de cada avance — desde cualquier lugar y en cualquier momento.',
    en: 'Welcome to the new client portal of the Law Offices of Manuel Solís. Here you can track your case and stay informed of every update — from anywhere, at any time.',
  },
  ctaPrimary: { es: 'Iniciar Sesión', en: 'Sign In' },
  ctaPrimaryHint: { es: 'Acceda con las credenciales que su abogado le entregó', en: 'Use the credentials your attorney provided' },

  whatTitle: { es: '¿Qué es el Portal de Clientes?', en: 'What is the Client Portal?' },
  whatDesc: {
    es: 'Es una plataforma privada y encriptada, diseñada exclusivamente para clientes activos de la firma. Centraliza toda la información de su caso en un mismo lugar para que usted no tenga que hacer llamadas para conocer el siguiente paso. Es la forma más rápida, segura y transparente de mantenerse en contacto con su equipo legal.',
    en: 'It is a private, encrypted platform designed exclusively for active clients of the firm. It centralizes all your case information in one place so you do not have to make phone calls to learn the next step. It is the fastest, safest, and most transparent way to stay in touch with your legal team.',
  },

  benefitsBadge: { es: 'Beneficios', en: 'Benefits' },
  benefitsTitle: { es: 'Todo lo que su caso necesita, en un solo lugar', en: 'Everything your case needs, in one place' },

  howBadge: { es: 'Así de Fácil', en: 'How It Works' },
  howTitle: { es: 'Comience en 3 pasos', en: 'Get started in 3 steps' },

  finalTitle: { es: '¿Listo para acceder a su portal?', en: 'Ready to access your portal?' },
  finalDesc: {
    es: 'Use las credenciales que recibió por correo electrónico o solicítelas a su equipo legal. Si necesita ayuda para iniciar sesión, contáctenos.',
    en: 'Use the credentials you received by email or request them from your legal team. If you need help signing in, contact us.',
  },
  finalCta: { es: 'Ir a Iniciar Sesión', en: 'Go to Sign In' },
  finalSecondary: { es: 'Contactar a mi abogado', en: 'Contact my attorney' },

  noCredentialsTitle: { es: '¿Aún no tiene credenciales?', en: 'No credentials yet?' },
  noCredentialsDesc: {
    es: 'Su acceso al portal se genera al firmar la representación legal. Si es cliente activo y no recibió su invitación, contáctenos y le enviaremos un nuevo enlace de acceso.',
    en: 'Your portal access is created when you sign your legal representation agreement. If you are an active client and did not receive your invitation, contact us and we will send a new access link.',
  },
};

const benefits: { icon: any; title: { es: string; en: string }; desc: { es: string; en: string } }[] = [
  {
    icon: FileText,
    title: { es: 'Estado de su caso 24/7', en: 'Case status 24/7' },
    desc: {
      es: 'Vea en tiempo real la etapa actual de su trámite, próximas fechas importantes y documentos pendientes.',
      en: 'See in real time the current stage of your process, upcoming important dates, and pending documents.',
    },
  },
  {
    icon: Shield,
    title: { es: 'Documentos cifrados', en: 'Encrypted documents' },
    desc: {
      es: 'Suba y descargue evidencia, formularios y respuestas de USCIS de forma segura, con cifrado de extremo a extremo.',
      en: 'Upload and download evidence, forms, and USCIS responses securely, with end-to-end encryption.',
    },
  },
  {
    icon: MessageSquare,
    title: { es: 'Comunicación directa', en: 'Direct communication' },
    desc: {
      es: 'Envíe mensajes a su abogado y a su asistente legal sin perderse entre correos o llamadas.',
      en: 'Send messages to your attorney and legal assistant without getting lost in emails or calls.',
    },
  },
  {
    icon: CreditCard,
    title: { es: 'Pagos en línea', en: 'Online payments' },
    desc: {
      es: 'Pague honorarios y costos de gobierno de forma segura, con confirmación inmediata y recibo digital.',
      en: 'Pay legal fees and government costs securely, with instant confirmation and digital receipts.',
    },
  },
  {
    icon: Bell,
    title: { es: 'Notificaciones inteligentes', en: 'Smart notifications' },
    desc: {
      es: 'Reciba alertas cuando USCIS actualice su caso, cuando se firme un documento o se acerque una cita.',
      en: 'Get alerts when USCIS updates your case, a document is signed, or an appointment is approaching.',
    },
  },
  {
    icon: Calendar,
    title: { es: 'Citas y recordatorios', en: 'Appointments & reminders' },
    desc: {
      es: 'Agende reuniones con su abogado y reciba recordatorios automáticos para entrevistas y biométricas.',
      en: 'Schedule meetings with your attorney and get automatic reminders for interviews and biometrics.',
    },
  },
];

const steps: { n: string; title: { es: string; en: string }; desc: { es: string; en: string }; icon: any }[] = [
  {
    n: '01',
    icon: Sparkles,
    title: { es: 'Reciba su invitación', en: 'Receive your invitation' },
    desc: {
      es: 'Tras contratar nuestros servicios, le enviamos por correo el enlace y las credenciales para activar su cuenta.',
      en: 'After hiring our services, we email you the link and credentials to activate your account.',
    },
  },
  {
    n: '02',
    icon: Lock,
    title: { es: 'Inicie sesión seguro', en: 'Sign in securely' },
    desc: {
      es: 'Acceda con su correo y contraseña. Su información viaja cifrada y solo usted y su equipo legal la pueden ver.',
      en: 'Sign in with your email and password. Your information is encrypted; only you and your legal team can see it.',
    },
  },
  {
    n: '03',
    icon: Smartphone,
    title: { es: 'Gestione su caso', en: 'Manage your case' },
    desc: {
      es: 'Consulte avances, suba documentos, escriba a su abogado y pague desde su computadora o teléfono.',
      en: 'Check progress, upload documents, message your attorney, and pay from your computer or phone.',
    },
  },
];

/* Capas decorativas del hero con @keyframes CSS (solo transform/opacity, corren
   en el compositor) en lugar de loops infinitos de framer-motion: eran 27
   animaciones simultaneas ocupando rAF en el hilo principal durante toda la
   visita. Las particulas usan longhands porque su duracion y su delay se
   calculan por particula y llegan en el style inline; la opacidad de reposo
   vive en la clase para que con `animation: none` (reduced-motion) queden
   invisibles en vez de saltar a opacity 1. */
const HERO_MOTION_CSS = `
  @keyframes acceso-particle {
    from { transform: translateY(110%); opacity: 0; }
    50% { opacity: 0.6; }
    to { transform: translateY(-20%); opacity: 0; }
  }
  @keyframes acceso-scan { from { transform: translateY(0); } to { transform: translateY(100vh); } }
  @keyframes acceso-float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes acceso-float-down { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
  .acceso-particle {
    opacity: 0;
    animation-name: acceso-particle;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  .acceso-scan { animation: acceso-scan 8s linear infinite both; }
  .acceso-float-up { animation: acceso-float-up 5s ease-in-out infinite both; }
  .acceso-float-down { animation: acceso-float-down 6s ease-in-out 1s infinite both; }
  @media (prefers-reduced-motion: reduce) {
    .acceso-particle, .acceso-scan, .acceso-float-up, .acceso-float-down { animation: none; }
  }
`;

export default function AccesoClientesClient() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  const gT = (obj: Bilingual): string => getText(obj, lang);

  // Mouse spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(178,144,77,0.18), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const trustItems = [
    { icon: Award, label: { es: '35+ Años', en: '35+ Years' } },
    { icon: Shield, label: { es: 'Cifrado AES-256', en: 'AES-256 Encrypted' } },
    { icon: Clock3, label: { es: 'Acceso 24/7', en: '24/7 Access' } },
    { icon: Globe, label: { es: 'ES / EN', en: 'ES / EN' } },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#001026] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* ============================================================ */}
        {/* PREMIUM HERO — fullscreen cinematic                            */}
        {/* ============================================================ */}
        <section
          onMouseMove={handleMouseMove}
          className="relative min-h-screen flex items-center justify-center px-4 z-10 overflow-hidden"
        >
          {/* Layer 1: Deep gradient base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_#002868_0%,_#001540_45%,_#000a1f_100%)] z-0" />

          {/* Layer 2: Animated SVG grid */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none">
            <defs>
              <pattern id="acceso-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#B2904D" strokeWidth="0.4" opacity="0.18" />
              </pattern>
              <radialGradient id="acceso-fade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="acceso-mask">
                <rect width="100%" height="100%" fill="url(#acceso-fade)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="url(#acceso-grid)" mask="url(#acceso-mask)" />
          </svg>

          {/* Layer 4: Mouse spotlight */}
          <m.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

          {/* Layer 5: Orbs (static) */}
          <div
            className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] bg-[#B2904D]/15 rounded-full blur-[120px] pointer-events-none z-0 opacity-40"
          />
          <div
            className="absolute bottom-[5%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0 opacity-30"
          />

          {/* Layer 6: Floating gold particles */}
          {[...Array(24)].map((_, i) => {
            const startX = ((i * 37) % 100);
            const size = ((i * 13) % 4) + 2;
            const duration = ((i * 7) % 12) + 10;
            const delay = (i * 0.4) % 6;
            return (
              <div
                key={i}
                aria-hidden="true"
                className="acceso-particle absolute bg-[#B2904D] rounded-full pointer-events-none z-0"
                style={{
                  left: `${startX}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: '0 0 6px #B2904D',
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}

          {/* Layer 7: Diagonal scan line */}
          <div
            aria-hidden="true"
            className="acceso-scan absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D]/40 to-transparent pointer-events-none z-0"
          />

          <style dangerouslySetInnerHTML={{ __html: HERO_MOTION_CSS }} />

          {/* Layer 8: Gold corner brackets */}
          <div className="absolute top-28 left-6 md:left-10 w-10 h-10 md:w-14 md:h-14 border-l-2 border-t-2 border-[#B2904D]/50 z-10 pointer-events-none" />
          <div className="absolute top-28 right-6 md:right-10 w-10 h-10 md:w-14 md:h-14 border-r-2 border-t-2 border-[#B2904D]/50 z-10 pointer-events-none" />
          <div className="absolute bottom-12 left-6 md:left-10 w-10 h-10 md:w-14 md:h-14 border-l-2 border-b-2 border-[#B2904D]/50 z-10 pointer-events-none" />
          <div className="absolute bottom-12 right-6 md:right-10 w-10 h-10 md:w-14 md:h-14 border-r-2 border-b-2 border-[#B2904D]/50 z-10 pointer-events-none" />

          {/* ============================================================ */}
          {/* CONTENT                                                        */}
          {/* ============================================================ */}
          <div className="relative z-20 w-full max-w-6xl mx-auto text-center pt-48 md:pt-52 lg:pt-56 pb-20">

            {/* Top badge with pulsing dot */}
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#B2904D]/40 bg-[#001026]/70 backdrop-blur-md mb-10 shadow-[0_0_25px_rgba(178,144,77,0.15)]"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#B2904D] opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#B2904D]" />
              </span>
              <span className="text-[#B2904D] text-[11px] font-bold tracking-[0.3em] uppercase">
                {gT(ui.badge)}
              </span>
            </m.div>

            {/* Hero Title */}
            <m.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tighter leading-[1] mb-8"
            >
              <m.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block text-white/95 mb-2"
              >
                {gT(ui.heroTitle1)}
              </m.span>
              <m.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block font-black bg-clip-text text-transparent bg-[linear-gradient(110deg,#B2904D_0%,#F3E5AB_25%,#FFFFFF_50%,#F3E5AB_75%,#B2904D_100%)] bg-[length:200%_auto] animate-acceso-shine drop-shadow-[0_0_30px_rgba(178,144,77,0.4)]"
              >
                {gT(ui.heroTitle2)}
              </m.span>
            </m.h1>

            {/* Decorative line */}
            <m.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 96, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-10"
            />

            {/* Subtitle */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base md:text-xl text-blue-100/75 font-light max-w-2xl mx-auto leading-relaxed mb-14"
            >
              {gT(ui.heroDescription)}
            </m.p>

            {/* CENTER CTA — refined */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col items-center gap-3 mb-14"
            >
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-b from-[#D4AF37] to-[#B2904D] hover:from-[#E0C04A] hover:to-[#C99D52] text-[#001540] font-bold rounded-lg text-sm tracking-wide shadow-[0_4px_20px_-2px_rgba(178,144,77,0.45)] hover:shadow-[0_8px_28px_-2px_rgba(178,144,77,0.65)] transition-all duration-200 hover:-translate-y-0.5 ring-1 ring-[#F3E5AB]/40"
              >
                <LogIn size={16} />
                <span>{gT(ui.ctaPrimary)}</span>
                <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <span className="text-[10px] text-blue-100/45 font-light tracking-[0.2em] uppercase">
                {gT(ui.ctaPrimaryHint)}
              </span>
            </m.div>

            {/* Trust strip */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-3xl mx-auto pt-4"
            >
              {trustItems.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2.5 text-white/70">
                    <item.icon size={14} className="text-[#B2904D]" />
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase">
                      {gT(item.label)}
                    </span>
                  </div>
                  {i < trustItems.length - 1 && (
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#B2904D]/40" />
                  )}
                </React.Fragment>
              ))}
            </m.div>
          </div>

          {/* ============================================================ */}
          {/* FLOATING MOCKUP CARDS — only at 2xl, contained                 */}
          {/* ============================================================ */}

          {/* Left card — Case status */}
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, x: -40, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden 2xl:block absolute left-[3%] bottom-[12%] z-30 w-60 pointer-events-none"
          >
            <div className="acceso-float-up p-4 rounded-2xl bg-gradient-to-br from-[#001540]/95 to-[#001026]/95 backdrop-blur-xl border border-[#B2904D]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] text-white/50 tracking-widest uppercase font-bold">
                  {lang === 'es' ? 'Caso Activo' : 'Active Case'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[8px] font-bold tracking-wider uppercase">
                  {lang === 'es' ? 'Aprobado' : 'Approved'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#B2904D]/20 flex items-center justify-center flex-shrink-0">
                  <FileCheck2 size={16} className="text-[#B2904D]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-bold text-xs truncate">USCIS-887421</p>
                  <p className="text-white/50 text-[10px] truncate">
                    {lang === 'es' ? 'Visa U — Petición' : 'U Visa — Petition'}
                  </p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-1.5">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ delay: 2, duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-[#B2904D] to-[#D4AF37]"
                />
              </div>
              <div className="flex justify-between text-[9px] text-white/40">
                <span>{lang === 'es' ? 'Progreso' : 'Progress'}</span>
                <span className="text-[#B2904D] font-bold">92%</span>
              </div>
            </div>
          </m.div>

          {/* Right card — Notification */}
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 40, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ delay: 1.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden 2xl:block absolute right-[3%] bottom-[14%] z-30 w-60 pointer-events-none"
          >
            <div className="acceso-float-down p-4 rounded-2xl bg-gradient-to-br from-[#001540]/95 to-[#001026]/95 backdrop-blur-xl border border-[#B2904D]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              <div className="flex items-start gap-2.5 mb-2">
                <div className="relative w-8 h-8 rounded-lg bg-[#B2904D]/20 flex items-center justify-center flex-shrink-0">
                  <Bell size={16} className="text-[#B2904D]" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#001026]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-white/50 tracking-widest uppercase font-bold mb-0.5">
                    {lang === 'es' ? 'Notificación' : 'Notification'}
                  </p>
                  <p className="text-white font-bold text-xs leading-tight">
                    {lang === 'es' ? 'Cita biométrica' : 'Biometrics appt.'}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-[10px] leading-snug">
                {lang === 'es'
                  ? '15 May 2026 · 10:30 AM · Houston'
                  : 'May 15, 2026 · 10:30 AM · Houston'}
              </p>
              <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-white/5">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 rounded-full bg-[#B2904D] border border-[#001026]" />
                  <div className="w-4 h-4 rounded-full bg-blue-400 border border-[#001026]" />
                </div>
                <span className="text-[9px] text-white/40 truncate">
                  {lang === 'es' ? 'Equipo legal al tanto' : 'Legal team on it'}
                </span>
              </div>
            </div>
          </m.div>
        </section>

        {/* Shine animation keyframes */}
        <style jsx global>{`
          @keyframes acceso-shine {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
          .animate-acceso-shine {
            animation: acceso-shine 6s linear infinite;
          }
        `}</style>

        {/* --- WHAT IS IT --- */}
        <section className="relative py-20 md:py-28 px-4 z-10 bg-[#001026] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#B2904D]/40 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* IMAGE */}
              <m.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/MSTeam.png"
                    alt={lang === 'es' ? 'Equipo legal de Manuel Solis' : 'Manuel Solis legal team'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#001026] via-[#001026]/30 to-transparent" />
                  {/* Bottom badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#001026]/80 backdrop-blur-md border border-[#B2904D]/30">
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-[#B2904D] flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#B2904D] font-bold tracking-widest uppercase mb-0.5">
                          {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
                        </p>
                        <p className="text-white text-sm font-light">
                          {lang === 'es'
                            ? 'Solo clientes activos de la firma'
                            : 'Active firm clients only'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative orb */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#B2904D]/20 rounded-full blur-[60px] pointer-events-none -z-10" />
              </m.div>

              {/* TEXT */}
              <div>
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                >
                  <Sparkles size={14} className="text-[#B2904D]" />
                  <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                    {lang === 'es' ? 'La Plataforma' : 'The Platform'}
                  </span>
                </m.div>
                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight"
                >
                  {gT(ui.whatTitle)}
                </m.h2>
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-1 bg-[#B2904D] rounded-full mb-8"
                />
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-lg text-blue-100/80 font-light leading-relaxed"
                >
                  {gT(ui.whatDesc)}
                </m.p>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENEFITS GRID --- */}
        <section className="relative py-24 md:py-32 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles size={14} className="text-[#B2904D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {gT(ui.benefitsBadge)}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {gT(ui.benefitsTitle)}
              </h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {benefits.map((benefit, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#B2904D]/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B2904D]/0 to-[#B2904D]/0 group-hover:from-[#B2904D]/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center mb-6 shadow-lg shadow-[#B2904D]/20">
                      <benefit.icon size={26} className="text-[#001540]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                      {gT(benefit.title)}
                    </h3>
                    <p className="text-blue-100/70 font-light leading-relaxed text-base">
                      {gT(benefit.desc)}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROMISE BANNER --- */}
        <section className="relative py-20 md:py-24 px-4 z-10 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative grid md:grid-cols-5 gap-8 md:gap-12 items-center bg-gradient-to-br from-[#001540] to-[#001026] rounded-[2.5rem] p-8 md:p-12 border border-white/10 overflow-hidden"
            >
              {/* Background image */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <Image
                  src="/apretondemanos.png"
                  alt=""
                  fill
                  className="object-cover object-right"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001540] via-[#001540]/70 to-transparent" />
              </div>

              {/* Image side */}
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:col-span-2 relative z-10 hidden md:block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#B2904D]/30 shadow-2xl">
                  <Image
                    src="/abogado-manuel-solis.jpg"
                    alt="Manuel Solis"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 0px, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001026]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] text-[#B2904D] font-bold tracking-widest uppercase">
                      Manuel Solis
                    </p>
                    <p className="text-white text-sm font-light">
                      {lang === 'es' ? 'Abogado fundador' : 'Founding Attorney'}
                    </p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#B2904D]/30 rounded-full blur-2xl pointer-events-none -z-10" />
              </m.div>

              {/* Quote text */}
              <div className="md:col-span-3 relative z-10">
                <span className="block text-[#B2904D] text-5xl md:text-6xl font-serif leading-none mb-2">“</span>
                <p className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight tracking-tight mb-6">
                  {lang === 'es'
                    ? 'Más que un portal: es nuestra forma de estar a su lado en cada paso, sin barreras y sin esperas.'
                    : 'More than a portal — it is our way of being by your side every step of the way, without barriers or waiting.'}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[#B2904D]" />
                  <span className="text-xs text-[#B2904D] font-bold tracking-[0.25em] uppercase">
                    {lang === 'es' ? 'Compromiso de la Firma' : 'Firm Commitment'}
                  </span>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* --- HOW IT WORKS --- */}
        <section className="relative py-24 md:py-32 px-4 z-10 bg-[#001f5f]/30">
          <div className="max-w-7xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <CheckCircle2 size={14} className="text-[#B2904D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {gT(ui.howBadge)}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {gT(ui.howTitle)}
              </h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
            </m.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#B2904D]/40 to-transparent z-0" />
              {steps.map((step, i) => (
                <m.div
                  key={step.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative z-10"
                >
                  <div className="bg-[#001026] p-8 rounded-[2rem] border border-white/10 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300">
                        <step.icon size={28} className="text-white/80 group-hover:text-[#001540] transition-colors" />
                      </div>
                      <span className="text-5xl font-black text-white/5 group-hover:text-[#B2904D]/20 transition-colors">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-3">{gT(step.title)}</h3>
                    <p className="text-blue-100/65 text-sm leading-relaxed font-light">
                      {gT(step.desc)}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA (CENTER BUTTON) --- */}
        <section className="relative py-28 md:py-36 px-4 z-10 overflow-hidden">
          {/* Backdrop image */}
          <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
            <Image
              src="/home-image.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#001540] via-[#001540]/60 to-[#001540]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-10 md:p-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl text-center overflow-hidden"
            >
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#B2904D]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <m.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 180 }}
                  className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-[0_0_40px_rgba(178,144,77,0.4)]"
                >
                  <LogIn size={28} className="text-[#001540]" />
                </m.div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">
                  {gT(ui.finalTitle)}
                </h2>
                <p className="text-base md:text-lg text-blue-100/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                  {gT(ui.finalDesc)}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-b from-[#D4AF37] to-[#B2904D] hover:from-[#E0C04A] hover:to-[#C99D52] text-[#001540] font-bold rounded-lg text-sm tracking-wide shadow-[0_4px_20px_-2px_rgba(178,144,77,0.45)] hover:shadow-[0_8px_28px_-2px_rgba(178,144,77,0.65)] transition-all duration-200 hover:-translate-y-0.5 ring-1 ring-[#F3E5AB]/40"
                  >
                    <LogIn size={16} />
                    <span>{gT(ui.finalCta)}</span>
                    <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <Link
                    href={`/${lang}/consulta`}
                    className="group inline-flex items-center gap-2 px-6 py-3 border border-[#B2904D]/40 hover:border-[#B2904D] hover:bg-[#B2904D]/5 text-[#B2904D] hover:text-white font-medium rounded-lg text-sm tracking-wide transition-all"
                  >
                    {gT(ui.finalSecondary)}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </m.div>

            {/* No credentials helper */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#B2904D]/15 flex items-center justify-center flex-shrink-0">
                <Bell size={22} className="text-[#B2904D]" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg mb-1">{gT(ui.noCredentialsTitle)}</h4>
                <p className="text-blue-100/65 text-sm font-light leading-relaxed">
                  {gT(ui.noCredentialsDesc)}
                </p>
              </div>
            </m.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
