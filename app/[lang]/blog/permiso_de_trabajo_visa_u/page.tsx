'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, Tag, Eye, Sparkles, BookOpen, ChevronRight, CheckCircle2, AlertCircle, Lightbulb, FileText, Quote, TrendingUp, Award, Zap, Heart, Star, MessageCircle, Send, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { useParams } from 'next/navigation';

// --- IMPORTACIONES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// --- DATA DEL BLOG ---
const blogPost = {
  id: 1,
  title: { 
    es: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final', 
    en: 'U Visa Work Permit (Bona Fide) Before Final Approval' 
  },
  heroImage: '',
  category: { es: 'Visa U', en: 'U Visa' },
  author: 'Manuel Solís',
  authorBio: {
    es: 'Abogado principal con más de 30 años de experiencia en casos de inmigración y visas humanitarias.',
    en: 'Lead attorney with over 30 years of experience in immigration and humanitarian visa cases.'
  },
  authorImage: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png',
  date: '2025-01-15',
  readTime: '8 min',
  views: '2,341',
  likes: 324,
  comments: 47,
  
  sections: [
    {
      id: 'intro',
      title: { es: 'El Largo Camino de la Espera', en: 'The Long Road of Waiting' },
      icon: Clock,
      image: '',
      content: {
        es: 'La espera por la Visa U suele durar más de cinco años. Mientras tanto, muchas personas viven con ansiedad, sin poder trabajar legalmente, sostener a sus familias o acceder a servicios básicos. Es frustrante: colaboraste con las autoridades, fuiste víctima de un crimen, y aún así estás atrapado en una pausa indefinida.',
        en: 'The wait for the U Visa usually lasts more than five years...'
      },
      highlight: {
        es: 'Pero desde 2021, hay una salida: el permiso de trabajo por "Determinación Bona Fide".',
        en: 'But since 2021, there is a way out: the "Bona Fide Determination" work permit.'
      }
    },
    {
      id: 'que-es',
      title: { es: '¿Qué es la Determinación Bona Fide?', en: 'What is Bona Fide Determination?' },
      icon: Lightbulb,
      image: '',
      content: {
        es: 'La determinación Bona Fide (o BFD por sus siglas en inglés) es una evaluación inicial que hace USCIS para decidir si una solicitud de Visa U es legítima y completa. Si tu petición pasa esta revisión, podrías recibir beneficios importantes que cambiarán tu vida.',
        en: 'Bona Fide Determination (or BFD) is an initial evaluation that USCIS makes...'
      },
      benefits: [
        { 
          icon: Award,
          text: { es: 'Un permiso de trabajo válido por 4 años', en: 'A work permit valid for 4 years' }
        },
        { 
          icon: Heart,
          text: { es: 'Posibilidad de permanecer en EE. UU. legalmente', en: 'Possibility to remain in the U.S. legally' }
        }
      ],
      stats: [
        { number: '4', label: { es: 'años de trabajo legal', en: 'years of legal work' } },
        { number: '100%', label: { es: 'protección temporal', en: 'temporary protection' } }
      ]
    },
    {
      id: 'por-que',
      title: { es: 'Una Respuesta al Colapso del Sistema', en: 'A Response to System Collapse' },
      icon: AlertCircle,
      image: '',
      content: {
        es: 'USCIS implementó esta política en 2021 debido al creciente retraso en la aprobación de Visas U, que supera los 5 años en muchos casos. Es una forma de reconocer que los solicitantes no deben quedar "congelados" durante años sin ninguna protección.',
        en: 'USCIS implemented this policy in 2021...'
      },
      requirements: [
        { es: 'Presentaron solicitudes completas y genuinas', en: 'Submitted complete applications' },
        { es: 'Fueron víctimas de un crimen calificado', en: 'Were victims of a qualifying crime' },
        { es: 'Cooperaron con las autoridades', en: 'Cooperated with authorities' },
        { es: 'No tienen antecedentes graves', en: 'No serious criminal records' }
      ]
    },
    {
      id: 'requisitos',
      title: { es: 'Requisitos Clave para Calificar', en: 'Key Requirements to Qualify' },
      icon: CheckCircle2,
      image: '',
      content: {
        es: 'Para ser considerado para la determinación Bona Fide, debes cumplir con varios requisitos importantes. Cada uno es crucial para el éxito de tu aplicación.',
        en: 'To be considered for Bona Fide Determination...'
      },
      items: [
        { es: 'Haber presentado el formulario I-918 correctamente', en: 'Have properly filed Form I-918' },
        { es: 'Incluir el formulario I-918B firmado', en: 'Include signed Form I-918B' },
        { es: 'Documentación completa y coherente', en: 'Complete and coherent documentation' },
        { es: 'Sin antecedentes penales graves', en: 'No serious criminal records' },
        { es: 'Formulario I-765 para permiso de trabajo', en: 'Form I-765 for work permit' }
      ]
    },
    {
      id: 'tiempos',
      title: { es: 'Tiempos de Espera Actuales', en: 'Current Wait Times' },
      icon: TrendingUp,
      image: '',
      content: {
        es: 'En promedio, USCIS está tardando entre 12 y 18 meses en emitir la determinación Bona Fide. Aunque sigue siendo una espera considerable, es significativamente más corta que la aprobación total.',
        en: 'On average, USCIS is taking between 12 and 18 months...'
      },
      timeline: [
        { time: '0-6', label: { es: 'meses', en: 'months' }, desc: { es: 'Revisión inicial', en: 'Initial review' } },
        { time: '6-12', label: { es: 'meses', en: 'months' }, desc: { es: 'Evaluación completa', en: 'Full evaluation' } },
        { time: '12-18', label: { es: 'meses', en: 'months' }, desc: { es: 'Decisión Bona Fide', en: 'Bona Fide decision' } },
        { time: '5+', label: { es: 'años', en: 'years' }, desc: { es: 'Aprobación final', en: 'Final approval' } }
      ]
    },
    {
      id: 'caso-real',
      title: { es: 'Historia de Éxito: Myriam', en: 'Success Story: Myriam' },
      icon: Star,
      image: '',
      testimonial: {
        text: {
          es: 'Mi vida cambió completamente cuando recibí mi permiso de trabajo. Ahora puedo trabajar legalmente, mantener a mi familia y vivir sin miedo.',
          en: 'My life changed completely when I received my work permit...'
        },
        author: 'Myriam R.',
        date: '16 de enero, 2025'
      },
      content: {
        es: 'Myriam y su hijo vivieron un momento traumático cuando un hombre entró sin permiso a su casa. Durante mucho tiempo vivió con miedo, sin estabilidad económica. Pero gracias a una demanda estratégica, su vida dio un giro completo.',
        en: 'Myriam and her son lived through a traumatic moment...'
      },
      achievements: [
        { icon: Zap, text: { es: 'Empleo formal estable', en: 'Stable formal employment' } },
        { icon: Heart, text: { es: 'Estabilidad emocional', en: 'Emotional stability' } },
        { icon: Award, text: { es: 'Contribución legal al país', en: 'Legal contribution to country' } },
        { icon: CheckCircle2, text: { es: 'Plan de pagos completado', en: 'Payment plan completed' } }
      ]
    },
    {
      id: 'conclusion',
      title: { es: 'Tu Próximo Paso Hacia la Libertad', en: 'Your Next Step Towards Freedom' },
      icon: Send,
      image: '',
      content: {
        es: 'La espera de la Visa U no tiene que ser una sentencia de inmovilidad. El permiso de trabajo Bona Fide es tu oportunidad de recuperar el control de tu vida mientras esperas la aprobación final.',
        en: 'The U Visa wait doesn\'t have to be a sentence of immobility...'
      },
      cta: {
        es: 'No esperes más. Consulta con expertos y asegúrate de estar en la mejor posición para recibir este beneficio que puede transformar tu vida.',
        en: 'Don\'t wait any longer. Consult with experts...'
      }
    }
  ],
  
  tags: [
    { es: 'Visa U', en: 'U Visa' },
    { es: 'Bona Fide', en: 'Bona Fide' },
    { es: 'Permiso de Trabajo', en: 'Work Permit' },
    { es: 'USCIS', en: 'USCIS' },
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Derechos', en: 'Rights' }
  ],
  
  sources: [
    { es: 'USCIS – Política de Determinación Bona Fide', en: 'USCIS – Bona Fide Determination Policy' },
    { es: 'American Immigration Council – Visa U', en: 'American Immigration Council – U Visa' },
    { es: 'ILRC – Guía práctica para Visa U', en: 'ILRC – Practical guide for U Visa' }
  ]
};

const uiText = {
  back: { es: 'Volver al blog', en: 'Back to blog' },
  share: { es: 'Compartir artículo', en: 'Share article' },
  about: { es: 'Sobre el autor', en: 'About the author' },
  tags: { es: 'Etiquetas', en: 'Tags' },
  sources: { es: 'Fuentes Citadas', en: 'Sources' },
  readMore: { es: 'Seguir leyendo', en: 'Read more' },
  contact: { es: 'Contactar', en: 'Contact' }
};

// Componente de Partícula Flotante
const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-[#B2904D]/30"
    animate={{
      y: [-20, -60, -20],
      x: [-10, 10, -10],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.5, 1]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

export default function BlogPostPage() {
  const params = useParams();
  const lang = (params?.lang as 'es' | 'en') || 'es';
  const t = (obj: any) => obj[lang] || obj.es;

  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setReadingProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  return (
    <>
      <Header />
      
      {/* Barra de progreso con animación */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D] origin-left z-[100] shadow-lg shadow-[#B2904D]/50"
        style={{ scaleX }}
      />
      
      <main className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
        
        {/* Background ÉPICO con múltiples capas */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Gradiente base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          {/* Orbes animados grandes */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] right-[5%] w-[700px] h-[700px] bg-gradient-to-br from-[#B2904D]/20 to-blue-600/20 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-[#B2904D]/20 rounded-full blur-[180px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] right-[30%] w-[500px] h-[500px] bg-gradient-to-r from-sky-400/15 to-purple-500/15 rounded-full blur-[120px]" 
          />
          
          {/* Partículas flotantes decorativas */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#B2904D]/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Grid decorativo */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(178,144,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(178,144,77,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 pt-[120px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Botón Volver MEJORADO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link href="/blog" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-[#B2904D]/50 transition-all duration-500">
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft size={20} className="text-white/60 group-hover:text-[#B2904D]" />
                </motion.div>
                <span className="text-white/80 group-hover:text-white font-medium">{t(uiText.back)}</span>
              </Link>
            </motion.div>

            {/* HERO ÉPICO con imagen grande */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20 relative"
            >
              {/* Imagen Hero con Parallax */}
              <motion.div 
                style={{ y: y1, opacity }}
                className="relative h-[600px] rounded-3xl overflow-hidden mb-12 group"
              >
                <Image
                  src={blogPost.heroImage}
                  alt={t(blogPost.title)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Overlays múltiples para profundidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-[#001540]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001540]/80 via-transparent to-[#001540]/80" />
                <div className="absolute inset-0 bg-[#B2904D]/5" />
                
                {/* Badge flotante con animación */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-8 left-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B2904D]/90 border border-white/30 backdrop-blur-xl shadow-2xl"
                >
                  <Sparkles className="text-white" size={16} />
                  <span className="text-white text-sm font-bold uppercase tracking-wider">{t(blogPost.category)}</span>
                </motion.div>

                {/* Stats flotantes */}
                <div className="absolute bottom-8 right-8 flex gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center gap-2"
                  >
                    <Eye size={16} className="text-[#B2904D]" />
                    <span className="text-white text-sm font-semibold">{blogPost.views}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLiked(!liked)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Heart size={16} className={`${liked ? 'text-red-500 fill-red-500' : 'text-[#B2904D]'} transition-all`} />
                    <span className="text-white text-sm font-semibold">{liked ? blogPost.likes + 1 : blogPost.likes}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center gap-2"
                  >
                    <MessageCircle size={16} className="text-[#B2904D]" />
                    <span className="text-white text-sm font-semibold">{blogPost.comments}</span>
                  </motion.div>
                </div>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-thin text-white mb-6 leading-tight drop-shadow-2xl"
                  >
                    {t(blogPost.title)}
                  </motion.h1>
                </div>
              </motion.div>

              {/* Meta Info Card flotante con glassmorphism ÉPICO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative -mt-20 mx-auto max-w-5xl"
              >
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* Glow effect animado */}
                  <motion.div 
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.98, 1.02, 0.98]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -inset-[2px] bg-gradient-to-r from-[#B2904D]/40 via-blue-500/40 to-[#B2904D]/40 rounded-3xl blur-xl -z-10" 
                  />
                  
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    {/* Autor con avatar */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-4"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg">
                        <Image
                          src={blogPost.authorImage}
                          alt={blogPost.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{blogPost.author}</p>
                        <p className="text-white/60 text-sm">{formatDate(blogPost.date)}</p>
                      </div>
                    </motion.div>

                    {/* Stats */}
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
                      >
                        <Clock size={18} className="text-[#B2904D]" />
                        <span className="text-white font-semibold">{blogPost.readTime}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
                      >
                        <TrendingUp size={18} className="text-[#B2904D]" />
                        <span className="text-white font-semibold">{Math.floor(readingProgress)}%</span>
                      </motion.div>
                    </div>

                    {/* Botones de compartir con animaciones */}
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 text-sm font-medium hidden sm:block">{t(uiText.share)}</span>
                      <div className="flex gap-2">
                        {[
                          { Icon: Facebook, color: '#1877F2' },
                          { Icon: Twitter, color: '#1DA1F2' },
                          { Icon: Linkedin, color: '#0A66C2' },
                          { Icon: Mail, color: '#B2904D' }
                        ].map(({ Icon, color }, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative p-3 rounded-full bg-white/10 border border-white/20 group overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ backgroundColor: color }}
                            />
                            <Icon size={18} className="text-white relative z-10" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Grid Layout Principal */}
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Contenido Principal - Secciones con imágenes y efectos */}
              <div className="lg:col-span-8 space-y-12">
                
                {blogPost.sections.map((section, idx) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  >
                    {/* Card de sección con imagen lateral */}
                    <div className="relative group">
                      {/* Glow animado */}
                      <motion.div
                        animate={{ 
                          opacity: [0.2, 0.4, 0.2],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-[2px] bg-gradient-to-r from-[#B2904D]/30 via-blue-500/30 to-[#B2904D]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                        {/* Header con ícono */}
                        <div className="p-8 pb-6 border-b border-white/10">
                          <motion.div 
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="flex items-center gap-4 mb-4"
                          >
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#B2904D]/20 to-blue-500/20 border border-[#B2904D]/30">
                              <section.icon className="text-[#B2904D]" size={28} />
                            </div>
                            <h2 className="text-3xl font-thin text-white">{t(section.title)}</h2>
                          </motion.div>
                        </div>

                        {/* Grid de contenido con imagen */}
                        <div className="grid md:grid-cols-5 gap-0">
                          {/* Imagen lateral */}
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="md:col-span-2 relative h-64 md:h-auto overflow-hidden"
                          >
                            <Image
                              src={section.image}
                              alt={t(section.title)}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001540]/80" />
                          </motion.div>

                          {/* Contenido */}
                          <div className="md:col-span-3 p-8">
                            <p className="text-white text-lg leading-relaxed mb-6">
                              {t(section.content)}
                            </p>

                            {/* Highlight especial */}
                            {section.highlight && (
                              <motion.div 
                                whileHover={{ x: 5 }}
                                className="p-6 rounded-2xl bg-gradient-to-r from-[#B2904D]/20 to-blue-500/20 border-l-4 border-[#B2904D] mb-6"
                              >
                                <div className="flex items-start gap-3">
                                  <Quote className="text-[#B2904D] shrink-0 mt-1" size={24} />
                                  <p className="text-white font-medium text-lg leading-relaxed">
                                    {t(section.highlight)}
                                  </p>
                                </div>
                              </motion.div>
                            )}

                            {/* Benefits con iconos */}
                            {section.benefits && (
                              <div className="space-y-3 mb-6">
                                {section.benefits.map((benefit, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
                                  >
                                    <div className="p-2 rounded-lg bg-[#B2904D]/20">
                                      <benefit.icon className="text-[#B2904D]" size={20} />
                                    </div>
                                    <span className="text-white font-medium">{t(benefit.text)}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Stats visuales */}
                            {section.stats && (
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                {section.stats.map((stat, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="p-6 rounded-2xl bg-gradient-to-br from-[#B2904D]/20 to-blue-500/20 border border-[#B2904D]/30 text-center cursor-pointer"
                                  >
                                    <motion.div 
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: i * 0.2 + 0.2 }}
                                      className="text-5xl font-bold text-[#B2904D] mb-2"
                                    >
                                      {stat.number}
                                    </motion.div>
                                    <div className="text-white/80 text-sm uppercase tracking-wider">
                                      {t(stat.label)}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Requirements lista */}
                            {section.requirements && (
                              <ul className="space-y-3">
                                {section.requirements.map((req, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-start gap-3 text-white group cursor-pointer"
                                  >
                                    <CheckCircle2 className="text-[#B2904D] shrink-0 mt-1 group-hover:scale-125 transition-transform" size={20} />
                                    <span className="leading-relaxed">{t(req)}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            )}

                            {/* Items lista */}
                            {section.items && (
                              <ul className="space-y-3">
                                {section.items.map((item, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-start gap-3 text-white group cursor-pointer"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-[#B2904D] mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                                    <span className="leading-relaxed">{t(item)}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            )}

                            {/* Timeline visual */}
                            {section.timeline && (
                              <div className="space-y-4 mt-6">
                                {section.timeline.map((phase, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    whileHover={{ x: 10 }}
                                    className="relative pl-8 pb-6 border-l-2 border-[#B2904D]/30 last:border-l-0 last:pb-0 group cursor-pointer"
                                  >
                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#B2904D] border-4 border-[#001540] group-hover:scale-150 transition-transform" />
                                    <div className="flex items-baseline gap-3 mb-2">
                                      <span className="text-3xl font-bold text-[#B2904D]">{phase.time}</span>
                                      <span className="text-white/60 text-sm">{t(phase.label)}</span>
                                    </div>
                                    <p className="text-white">{t(phase.desc)}</p>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Testimonial */}
                            {section.testimonial && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="p-6 rounded-2xl bg-gradient-to-r from-[#B2904D]/20 to-blue-500/20 border border-[#B2904D]/30 mt-6"
                              >
                                <div className="flex items-start gap-4 mb-4">
                                  <Quote className="text-[#B2904D] shrink-0" size={32} />
                                  <p className="text-white text-lg italic leading-relaxed">
                                    "{t(section.testimonial.text)}"
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 ml-12">
                                  <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D] to-transparent" />
                                  <div className="text-right">
                                    <p className="text-white font-bold">{section.testimonial.author}</p>
                                    <p className="text-white/60 text-sm">{section.testimonial.date}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Achievements con iconos */}
                            {section.achievements && (
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                {section.achievements.map((achievement, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-3 cursor-pointer group"
                                  >
                                    <div className="p-3 rounded-full bg-[#B2904D]/20 group-hover:bg-[#B2904D]/30 transition-colors">
                                      <achievement.icon className="text-[#B2904D]" size={24} />
                                    </div>
                                    <span className="text-white text-sm font-medium">{t(achievement.text)}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* CTA especial */}
                            {section.cta && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#B2904D] to-blue-600 relative overflow-hidden group cursor-pointer"
                              >
                                <motion.div
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                                <p className="text-white font-semibold text-center relative z-10">
                                  {t(section.cta)}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Separador decorativo animado */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  className="relative h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent my-16"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#B2904D] rounded-full"
                      style={{ left: `${20 * (i + 1)}%` }}
                    />
                  ))}
                </motion.div>

                {/* TAGS Card PREMIUM */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-[#B2904D]/10 via-blue-500/10 to-[#B2904D]/10 opacity-50"
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-[#B2904D]/20">
                          <Tag size={24} className="text-[#B2904D]" />
                        </div>
                        <h3 className="text-2xl font-light text-white">{t(uiText.tags)}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {blogPost.tags.map((tag, i: number) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium cursor-pointer group overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-[#B2904D]/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="relative z-10">{t(tag)}</span>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FUENTES Card PREMIUM */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-blue-500/20">
                        <BookOpen size={24} className="text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-light text-white">{t(uiText.sources)}</h3>
                    </div>
                    
                    <ul className="space-y-4">
                      {blogPost.sources.map((source, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer group"
                        >
                          <ArrowUpRight className="text-[#B2904D] group-hover:rotate-45 transition-transform" size={20} />
                          <span className="text-white text-sm">{t(source)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* SIDEBAR Sticky PREMIUM */}
              <aside className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  
                  {/* Card Autor PREMIUM */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative group"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-[2px] bg-gradient-to-r from-[#B2904D] via-blue-500 to-[#B2904D] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"
                    />
                    
                    <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                      <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                        <User size={20} className="text-[#B2904D]" />
                        {t(uiText.about)}
                      </h3>
                      
                      <div className="flex flex-col items-center text-center gap-6">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#B2904D] shadow-2xl"
                        >
                          <Image
                            src={blogPost.authorImage}
                            alt={blogPost.author}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        
                        <div>
                          <p className="text-white font-bold text-xl mb-2">{blogPost.author}</p>
                          <p className="text-white/80 text-sm leading-relaxed mb-4">{t(blogPost.authorBio)}</p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#B2904D] to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-[#B2904D]/50 transition-shadow"
                        >
                          {t(uiText.contact)}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Progress Ring Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                  >
                    <h3 className="text-lg font-medium text-white mb-6 text-center">Progreso de lectura</h3>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - readingProgress / 100)}`}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.3s ease" }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#B2904D" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">{Math.floor(readingProgress)}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}