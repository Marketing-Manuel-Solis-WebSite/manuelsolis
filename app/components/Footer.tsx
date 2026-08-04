'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { m } from 'framer-motion'
import NewsletterSignup from './NewsletterSignup'

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear()

  // --- DATOS ---
  const footerLinks = [
    { name: language === 'es' ? 'INICIO' : 'HOME', href: `/${language}` },
    { name: language === 'es' ? 'SERVICIOS' : 'SERVICES', href: `/${language}/servicios` },
    { name: language === 'es' ? 'DETENIDOS' : 'DETAINED', href: `/${language}/clientes-detenidos` },
    { name: language === 'es' ? 'TESTIMONIALES' : 'TESTIMONIALS', href: `/${language}/testimonios` },
    { name: language === 'es' ? 'ABOGADOS' : 'ATTORNEYS', href: `/${language}/abogados` },
    { name: language === 'es' ? 'COLABORADORES' : 'COLLABORATORS', href: `/${language}/colaboradores` },
    { name: language === 'es' ? 'OFICINAS' : 'OFFICES', href: `/${language}/oficinas` },
    { name: language === 'es' ? 'INFORMACIÓN' : 'INFORMATION', href: `/${language}/nosotros` },
    { name: language === 'es' ? 'BLOG' : 'BLOG', href: `/${language}/blog` },
    { name: 'NEWSLETTER', href: `/${language}/newsletter` },
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/AbogadoManuelSolisOficial/', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/AbogadoMSolis', icon: Twitter },
    { name: 'Instagram', href: 'https://www.instagram.com/abogadomanuelsolisoficial/', icon: Instagram },
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg', icon: Youtube },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/manuel-solis-law-firm/', icon: Linkedin },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className={`relative bg-[#001540] text-white overflow-hidden`}>
      
      {/* 1. DECORACIÓN DE FONDO OPTIMIZADA */}
      
      {/* Ruido sutil para textura - Opacidad reducida */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }}></div>

      {/* Borde superior brillante */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent opacity-50`} />
      
      {/* Static ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B2904D]/15 blur-[60px] pointer-events-none rounded-full opacity-20" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        
        {/* LOGO & SOCIALS */}
        <div className="flex flex-col items-center mb-16">
          <Link href={`/${language}`} className="inline-block mb-10 group relative">
            {/* Blur reducido */}
            <div className={`absolute -inset-4 bg-[#B2904D]/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <Image
              src="/logo-manuel-solis.png"
              alt="Logo Manuel Solis"
              width={300}
              height={90}
              className="h-24 w-auto relative z-10 drop-shadow-lg"
            />
          </Link>

          <div className="flex gap-4 mb-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <m.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full 
                    bg-white/5 border border-white/10 backdrop-blur-sm
                    text-white transition-all duration-300
                    hover:bg-[#B2904D] hover:border-[#B2904D] hover:text-[#001540] hover:shadow-[0_0_10px_rgba(178,144,77,0.4)]
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                </m.a>
              )
            })}
          </div>
        </div>

        {/* NEWSLETTER SIGNUP */}
        <div className="mb-16 border-t border-white/10 pt-12">
          <NewsletterSignup variant="footer" />
        </div>

        {/* NAVIGATION LINKS (GRID) */}
        <nav aria-label="Footer navigation" className="mb-12 border-t border-white/10 border-b py-10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-12">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative group text-sm md:text-base font-medium tracking-wider text-blue-100/70 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                  {/* Underline animado */}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B2904D] transition-all duration-300 group-hover:w-full`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CITY × SERVICE LINK CLUSTER (SEO) */}
        <nav
          aria-label={language === 'es' ? 'Servicios por ciudad' : 'Services by city'}
          className="mb-12 border-b border-white/10 pb-10"
        >
          <p className="text-center text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#B2904D] mb-6">
            {language === 'es' ? 'Abogados por ciudad y servicio' : 'Attorneys by city and service'}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 max-w-5xl mx-auto text-[11px] md:text-xs text-blue-100/60">
            {[
              { slug: 'abogado-inmigracion-houston', es: 'Inmigración Houston', en: 'Immigration Houston' },
              { slug: 'abogado-inmigracion-dallas', es: 'Inmigración Dallas', en: 'Immigration Dallas' },
              { slug: 'abogado-inmigracion-chicago', es: 'Inmigración Chicago', en: 'Immigration Chicago' },
              { slug: 'abogado-inmigracion-los-angeles', es: 'Inmigración Los Ángeles', en: 'Immigration Los Angeles' },
              { slug: 'abogado-inmigracion-el-paso', es: 'Inmigración El Paso', en: 'Immigration El Paso' },
              { slug: 'abogado-inmigracion-memphis', es: 'Inmigración Memphis', en: 'Immigration Memphis' },
              { slug: 'abogado-inmigracion-denver', es: 'Inmigración Denver', en: 'Immigration Denver' },
              { slug: 'abogado-inmigracion-harlingen', es: 'Inmigración Harlingen', en: 'Immigration Harlingen' },
              { slug: 'abogado-accidentes-houston', es: 'Accidentes Houston', en: 'Accidents Houston' },
              { slug: 'abogado-accidentes-dallas', es: 'Accidentes Dallas', en: 'Accidents Dallas' },
              { slug: 'defensa-deportacion-houston', es: 'Deportación Houston', en: 'Deportation Houston' },
              { slug: 'defensa-deportacion-dallas', es: 'Deportación Dallas', en: 'Deportation Dallas' },
              { slug: 'defensa-deportacion-chicago', es: 'Deportación Chicago', en: 'Deportation Chicago' },
              { slug: 'defensa-deportacion-los-angeles', es: 'Deportación Los Ángeles', en: 'Deportation Los Angeles' },
              { slug: 'defensa-deportacion-el-paso', es: 'Deportación El Paso', en: 'Deportation El Paso' },
              { slug: 'visa-u-houston', es: 'Visa U Houston', en: 'U Visa Houston' },
              { slug: 'visa-u-dallas', es: 'Visa U Dallas', en: 'U Visa Dallas' },
              { slug: 'visa-u-chicago', es: 'Visa U Chicago', en: 'U Visa Chicago' },
              { slug: 'visa-u-los-angeles', es: 'Visa U Los Ángeles', en: 'U Visa Los Angeles' },
              { slug: 'vawa-houston', es: 'VAWA Houston', en: 'VAWA Houston' },
              { slug: 'vawa-dallas', es: 'VAWA Dallas', en: 'VAWA Dallas' },
              { slug: 'vawa-chicago', es: 'VAWA Chicago', en: 'VAWA Chicago' },
              { slug: 'asilo-politico-houston', es: 'Asilo Houston', en: 'Asylum Houston' },
              { slug: 'asilo-politico-chicago', es: 'Asilo Chicago', en: 'Asylum Chicago' },
              { slug: 'asilo-politico-los-angeles', es: 'Asilo Los Ángeles', en: 'Asylum Los Angeles' },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${language}/${item.slug}`}
                  className="hover:text-[#B2904D] transition-colors"
                >
                  {language === 'es' ? item.es : item.en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- TEXTO LEGAL SMS (NUEVO) --- */}
        <div className="max-w-4xl mx-auto text-center mb-12 opacity-60">
            <p className="text-[10px] md:text-xs leading-relaxed font-light tracking-wide text-blue-100">
                {language === 'es'
                    ? "Al proporcionar voluntariamente su número de teléfono y optar explícitamente por recibir mensajes de texto, usted consiente recibir comunicaciones SMS del Law Office of Manuel Solis relacionadas con responder a consultas sobre servicios de inmigración, programar consultas, enviar recordatorios de citas, solicitar documentos y proporcionar actualizaciones de casos. La frecuencia de los mensajes puede variar. Pueden aplicarse tarifas estándar de mensajes y datos. Su consentimiento para recibir mensajes SMS no es una condición para adquirir ningún servicio. Puede cancelar en cualquier momento respondiendo \"STOP\" a cualquier mensaje, y puede solicitar ayuda adicional respondiendo \"HELP\"."
                    : "By voluntarily providing your phone number and explicitly opting in to text messages, you consent to receive SMS communications from Law Office of Manuel Solis regarding respond to immigration service inquiries, schedule consultations, send appointment reminders, request documents, and provide case updates. Message frequency may vary. Standard messaging and data rates may apply. Your consent to receive SMS messages is not a condition of purchasing any service. You may opt out at any time by replying \"STOP\" to any message, and you may request additional assistance by replying \"HELP\"."
                }
            </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-blue-200/70">
          
          {/* Categorías (Links secundarios) */}
          <div className="flex flex-wrap justify-center gap-4">
             <Link href={`/${language}/privacidad`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/terminos`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/sms-terminos`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Términos de Servicio SMS' : 'SMS Terms of Service'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/category/proteccion-legal-para-migrantes`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Protección legal' : 'Legal Protection'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/category/derechos-de-migrantes`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Derechos de migrantes' : 'Migrant Rights'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/politica-editorial`} className="hover:text-[#B2904D] transition-colors">
               {language === 'es' ? 'Política Editorial' : 'Editorial Policy'}
             </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
             <p>
               © {currentYear} Manuel Solis Law Firm. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
             </p>
          </div>
          
        </div>

      </div>

      {/* Reserva la altura de MobileStickyBar, que es `fixed` + `sm:hidden` y por
          tanto solapa el final del pie por debajo de 640px. Va dentro del
          <footer> (no en body) para que el hueco herede el fondo navy en vez de
          mostrar el blanco del body. */}
      <div
        aria-hidden="true"
        className="sm:hidden"
        style={{ height: 'calc(3.5rem + env(safe-area-inset-bottom, 0px))' }}
      />

      {/* BOTÓN "BACK TO TOP" */}
      <m.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={language === 'es' ? 'Volver al inicio' : 'Scroll to top'}
        className={`absolute bottom-8 right-8 w-10 h-10 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 text-[#B2904D] flex items-center justify-center hover:bg-[#B2904D] hover:text-[#001540] transition-all duration-300 backdrop-blur-sm hidden md:flex`}
      >
        <ArrowUp size={18} />
      </m.button>
    </footer>
  )
}