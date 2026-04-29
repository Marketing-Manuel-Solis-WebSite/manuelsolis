'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
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
  ChevronDown,
  FileCheck2,
  Award,
  Globe,
  Clock3,
} from 'lucide-react';
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
  heroTitle1: { es: 'Su caso, siempre', en: 'Your case, always' },
  heroTitle2: { es: 'a un clic.', en: 'one click away.' },
  heroDescription: {
    es: 'Bienvenido al nuevo espacio digital de Manuel Solis Law Firm. Aquí podrá dar seguimiento a su caso, compartir documentos con su equipo legal y mantenerse informado de cada avance — desde cualquier lugar y en cualquier momento.',
    en: 'Welcome to the new digital space of Manuel Solis Law Firm. Here you can track your case, share documents with your legal team, and stay informed of every update — from anywhere, at any time.',
  },
  ctaPrimary: { es: 'Iniciar Sesión', en: 'Sign In' },
  ctaPrimaryHint: { es: 'Acceda con las credenciales que su abogado le entregó', en: 'Use the credentials your attorney provided' },

  whatTitle: { es: '¿Qué es el Portal de Clientes?', en: 'What is the Client Portal?' },
  whatDesc: {
    es: 'Es una plataforma privada y encriptada, diseñada exclusivamente para clientes activos del despacho. Centraliza toda la información de su caso en un mismo lugar para que usted no tenga que hacer llamadas para conocer el siguiente paso. Es la forma más rápida, segura y transparente de mantenerse en contacto con su equipo legal.',
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
        <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

        {/* Layer 5: Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] bg-[#B2904D]/15 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[5%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0"
        />

        {/* Layer 6: Floating gold particles */}
        {[...Array(24)].map((_, i) => {
          const startX = ((i * 37) % 100);
          const size = ((i * 13) % 4) + 2;
          const duration = ((i * 7) % 12) + 10;
          const delay = (i * 0.4) % 6;
          return (
            <motion.div
              key={i}
              className="absolute bg-[#B2904D] rounded-full pointer-events-none z-0"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '-20%', opacity: [0, 0.6, 0] }}
              transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
              style={{ left: `${startX}%`, width: `${size}px`, height: `${size}px`, boxShadow: '0 0 6px #B2904D' }}
            />
          );
        })}

        {/* Layer 7: Diagonal scan line */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D]/40 to-transparent pointer-events-none z-0"
          initial={{ y: '0%' }}
          animate={{ y: '100vh' }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Layer 8: Gold corner brackets */}
        <div className="absolute top-28 left-6 md:left-10 w-10 h-10 md:w-14 md:h-14 border-l-2 border-t-2 border-[#B2904D]/50 z-10 pointer-events-none" />
        <div className="absolute top-28 right-6 md:right-10 w-10 h-10 md:w-14 md:h-14 border-r-2 border-t-2 border-[#B2904D]/50 z-10 pointer-events-none" />
        <div className="absolute bottom-12 left-6 md:left-10 w-10 h-10 md:w-14 md:h-14 border-l-2 border-b-2 border-[#B2904D]/50 z-10 pointer-events-none" />
        <div className="absolute bottom-12 right-6 md:right-10 w-10 h-10 md:w-14 md:h-14 border-r-2 border-b-2 border-[#B2904D]/50 z-10 pointer-events-none" />

        {/* ============================================================ */}
        {/* CONTENT                                                        */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full max-w-6xl mx-auto text-center pt-32 md:pt-28 pb-20">

          {/* Top badge with pulsing dot */}
          <motion.div
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
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-thin text-white tracking-tighter leading-[0.95] mb-8"
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white/95 mb-2"
            >
              {gT(ui.heroTitle1)}
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block font-black bg-clip-text text-transparent bg-[linear-gradient(110deg,#B2904D_0%,#F3E5AB_25%,#FFFFFF_50%,#F3E5AB_75%,#B2904D_100%)] bg-[length:200%_auto] animate-acceso-shine drop-shadow-[0_0_30px_rgba(178,144,77,0.4)]"
            >
              {gT(ui.heroTitle2)}
            </motion.span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-10"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base md:text-xl text-blue-100/75 font-light max-w-2xl mx-auto leading-relaxed mb-14"
          >
            {gT(ui.heroDescription)}
          </motion.p>

          {/* CENTER MEGA CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col items-center gap-5 mb-16"
          >
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D] text-[#001540] font-black rounded-2xl text-base md:text-lg uppercase tracking-[0.2em] shadow-[0_15px_60px_-12px_rgba(178,144,77,0.7)] hover:shadow-[0_25px_80px_-10px_rgba(178,144,77,0.9)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Outer glow */}
              <span className="absolute -inset-1 bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
              {/* Shine sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <LogIn size={22} className="relative z-10" />
              <span className="relative z-10">{gT(ui.ctaPrimary)}</span>
              <ArrowUpRight size={20} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[10px] md:text-xs text-blue-100/50 font-light tracking-[0.25em] uppercase">
              {gT(ui.ctaPrimaryHint)}
            </span>
          </motion.div>

          {/* Trust strip */}
          <motion.div
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
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* FLOATING MOCKUP CARDS                                          */}
        {/* ============================================================ */}

        {/* Left card — Case status */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block absolute left-8 top-[45%] z-30 w-72 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#001540]/95 to-[#001026]/95 backdrop-blur-xl border border-[#B2904D]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">
                {lang === 'es' ? 'Caso Activo' : 'Active Case'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] font-bold tracking-wider uppercase">
                {lang === 'es' ? 'Aprobado' : 'Approved'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#B2904D]/20 flex items-center justify-center flex-shrink-0">
                <FileCheck2 size={20} className="text-[#B2904D]" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">USCIS-887421</p>
                <p className="text-white/50 text-[11px]">{lang === 'es' ? 'Visa U — Petición' : 'U Visa — Petition'}</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                transition={{ delay: 2, duration: 1.5 }}
                className="h-full bg-gradient-to-r from-[#B2904D] to-[#D4AF37]"
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/40">
              <span>{lang === 'es' ? 'Progreso' : 'Progress'}</span>
              <span className="text-[#B2904D] font-bold">92%</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right card — Notification */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 7 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block absolute right-8 top-[42%] z-30 w-72 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#001540]/95 to-[#001026]/95 backdrop-blur-xl border border-[#B2904D]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#B2904D]/20 flex items-center justify-center flex-shrink-0">
                <Bell size={20} className="text-[#B2904D]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#001026]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold mb-0.5">
                  {lang === 'es' ? 'Notificación' : 'Notification'}
                </p>
                <p className="text-white font-bold text-sm leading-tight">
                  {lang === 'es' ? 'Cita biométrica agendada' : 'Biometrics appointment scheduled'}
                </p>
              </div>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed pl-13">
              {lang === 'es'
                ? '15 May 2026, 10:30 AM — USCIS Application Support Center, Houston.'
                : 'May 15, 2026, 10:30 AM — USCIS Application Support Center, Houston.'}
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-[#B2904D] border border-[#001026]" />
                <div className="w-5 h-5 rounded-full bg-blue-400 border border-[#001026]" />
              </div>
              <span className="text-[10px] text-white/40">
                {lang === 'es' ? 'Tu equipo legal está al tanto' : 'Your legal team is on it'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 2, duration: 1 }, y: { duration: 2, repeat: Infinity, delay: 2 } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">
            {lang === 'es' ? 'Descubre más' : 'Discover more'}
          </span>
          <ChevronDown size={18} />
        </motion.div>
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
      <section className="relative py-20 md:py-28 px-4 z-10 bg-[#001026]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight"
          >
            {gT(ui.whatTitle)}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-[#B2904D] rounded-full mx-auto mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100/80 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {gT(ui.whatDesc)}
          </motion.p>
        </div>
      </section>

      {/* --- BENEFITS GRID --- */}
      <section className="relative py-24 md:py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
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
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="relative py-24 md:py-32 px-4 z-10 bg-[#001f5f]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#B2904D]/40 to-transparent z-0" />
            {steps.map((step, i) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA (CENTER BUTTON) --- */}
      <section className="relative py-28 md:py-36 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
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
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 180 }}
                className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-[0_0_40px_rgba(178,144,77,0.4)]"
              >
                <LogIn size={36} className="text-[#001540]" />
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight">
                {gT(ui.finalTitle)}
              </h2>
              <p className="text-base md:text-lg text-blue-100/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                {gT(ui.finalDesc)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-black rounded-xl transition-all shadow-[0_0_30px_rgba(178,144,77,0.4)] hover:shadow-[0_0_50px_rgba(178,144,77,0.6)] hover:-translate-y-1 inline-flex items-center gap-3 group text-lg uppercase tracking-wider"
                >
                  <LogIn size={22} />
                  {gT(ui.finalCta)}
                  <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={`/${lang}/contacto`}
                  className="px-8 py-5 border-2 border-[#B2904D]/40 hover:border-[#B2904D] text-[#B2904D] hover:text-white font-bold rounded-xl transition-all inline-flex items-center gap-3 group text-base"
                >
                  {gT(ui.finalSecondary)}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* No credentials helper */}
          <motion.div
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
