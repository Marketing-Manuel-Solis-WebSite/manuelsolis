'use client'

import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm' 
import { useLanguage } from '../../context/LanguageContext' // Usamos el import real
import { motion, Variants } from 'framer-motion' 
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { Shield, Mail, Phone, Clock, FileText } from 'lucide-react' 

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700'] 
})

// --- TEXTOS UI (PRIVACIDAD) ---
const interfaceTexts = {
  hero: {
    title: { es: 'POLÍTICAS DE PRIVACIDAD', en: 'PRIVACY POLICY' },
    subtitle: { es: 'Proteger su información privada es nuestra prioridad.', en: 'Protecting your private information is our priority.' },
  },
  section1: {
    title: { es: 'Declaración General y Aplicabilidad', en: 'General Statement and Applicability' },
    content: {
      es: "Esta Declaración de Privacidad se aplica a **www.manuelsolis.com** y a las **Oficinas Legales de Manuel E Solis** y rige la recopilación y el uso de datos. A menos que se indique lo contrario, todas las referencias a las Oficinas Legales de Manuel E Solis incluyen www.manuelsolis.com. El sitio web de Manuel Solís Law Offices es un sitio web para un bufete de abogados. Al utilizar este sitio web, usted acepta las prácticas de datos descritas en esta declaración.",
      en: "This Privacy Statement applies to **www.manuelsolis.com** and the **Law Offices of Manuel E Solis** and governs data collection and use. Unless otherwise noted, all references to the Law Offices of Manuel E Solis include www.manuelsolis.com. The Manuel Solis Law Offices website is a law firm site. By using this website, you consent to the data practices described in this statement."
    }
  },
  section2: {
    title: { es: 'Recopilación de Información Personal', en: 'Collection of Personal Information' },
    content1: {
      es: "Para poder brindarle mejor los productos y servicios que se ofrecen en nuestro Sitio, las Oficinas Legales de Manuel Solís pueden recopilar información de identificación personal. No recopilamos ninguna información personal sobre usted a menos que usted nos la proporcione voluntariamente. Sin embargo, es posible que deba proporcionarnos cierta información personal cuando elija utilizar determinados productos o servicios disponibles en el Sitio. Esto incluye la creación de una cuenta o el envío de información de pago.",
      en: "To better provide you with the products and services offered on our Site, the Law Offices of Manuel Solis may collect personally identifiable information. We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information when you choose to use certain products or services available on the Site. This includes registering for an account or submitting payment information."
    },
    itemsTitle: { es: "La información que se puede recopilar incluye:", en: "Information that may be collected includes:" },
    items: [
      { es: "Nombre y apellido", en: "First and Last Name" },
      { es: "Dirección de correo electrónico", en: "Email Address" },
      { es: "Número de teléfono", en: "Phone Number" },
      { es: "Información sobre el tipo de caso legal que el visitante está pidiendo una consulta para", en: "Information about the type of legal case the visitor is seeking consultation for" },
    ],
    usage: {
      es: "Utilizaremos su información para, entre otros, comunicarnos con usted en relación con los servicios y / o productos que nos haya solicitado. También podemos recopilar información personal o no personal adicional en el futuro.",
      en: "We will use your information to, among others, communicate with you regarding the services and/or products you have requested. We may also collect additional personal or non-personal information in the future."
    }
  },
  section3: {
    title: { es: 'Uso, Compartición y Divulgación', en: 'Use, Sharing, and Disclosure' },
    usage: {
      es: "Las oficinas legales de Manuel Solís recopilan y utilizan su información personal para operar su(s) sitio(s) web y entregar los servicios que ha solicitado. También podemos usar su información de identificación personal para informarle sobre otros productos o servicios disponibles.",
      en: "The Law Offices of Manuel Solis collect and use your personal information to operate its website(s) and deliver the services you have requested. We may also use your personally identifiable information to inform you of other available products or services."
    },
    sharing: {
      es: "Las oficinas legales de Manuel Solís **no venden, alquilan o arriendan** sus listas de clientes a terceros. Podemos compartir datos con socios de confianza para ayudar a realizar análisis estadísticos, enviar correo electrónico o postal, brindar asistencia al cliente o coordinar las entregas. Todos los terceros están obligados a mantener la confidencialidad de su información.",
      en: "The Law Offices of Manuel Solis **do not sell, rent, or lease** its customer lists to third parties. We may share data with trusted partners to help perform statistical analysis, send email or postal mail, provide customer support, or arrange for deliveries. All third parties are required to maintain the confidentiality of your information."
    },
    legalDisclosure: {
      es: "Las Oficinas Legales de Manuel Solís pueden divulgar su información personal, sin previo aviso, si así lo requiere la ley o en la creencia de buena fe de que tal acción es necesaria para: (a) Cumplir con los decretos de la ley; (b) Proteger y defender los derechos o propiedad; y/o (c) Actuar en circunstancias extremas para proteger la seguridad personal de los usuarios o del público.",
      en: "The Law Offices of Manuel Solis may disclose your personal information without notice if required by law or in the good faith belief that such action is necessary to: (a) Conform to the edicts of the law; (b) Protect and defend the rights or property; and/or (c) Act under exigent circumstances to protect the personal safety of users or the public."
    },
    mobileNote: {
      es: "Nota móvil: No se compartirá ninguna información móvil con terceros/afiliados con fines de marketing/promoción. Todas las categorías anteriores excluyen los datos de aceptación y el consentimiento del originador de mensajes de texto; esta información no será compartida con terceros.",
      en: "Mobile Note: No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging opt-in data and consent; this information will not be shared with any third parties."
    }
  },
  section4: {
    title: { es: 'Seguimiento del Comportamiento y Contacto', en: 'Behavioral Tracking and Contact' },
    tracking: {
      es: "Las oficinas legales de Manuel Solís pueden rastrear los sitios web y las páginas que visitan nuestros usuarios, incluida la recopilación de información automáticamente (como la URL de referencia, la hora de acceso, etc.), para determinar cuáles son los servicios más populares. Estos datos se utilizan para entregar contenido personalizado y mejorar la experiencia del visitante. Podría ocurrir algún tipo de grabación anónima de clics.",
      en: "The Law Offices of Manuel Solis may track the websites and pages our users visit, including automatically collected information (like referring URL, time of access, etc.), to determine what the most popular services are. This data is used to deliver customized content and improve the visitor experience. Some form of anonymous click recording might occur."
    }
  },
  contactInfo: {
    address: 'Navigation Boulevard Houston, Texas 77011',
    email: 'info@manuelsolis.com',
    phone: '1-888-370-7022',
    effectiveDate: { es: 'Vigente a partir del 5 de Junio de 2019.', en: 'Effective as of June 5, 2019.' }
  }
};

// --- UTILIDADES ---
const parseContent = (text: string) => {
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\n/g, '<br />');
  // Envuelve en <p> para párrafos
  parsed = parsed.split('<br /><br />').map(p => `<p>${p}</p>`).join('');
  return parsed;
};

// --- COMPONENTE TÍTULO DE SECCIÓN ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
);

// --- PÁGINA DE PRIVACIDAD ---
export default function PrivacidadPage() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  // Función 't' robusta para evitar errores de undefined
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) current = current[part];
      else return ''; 
    }
    if (typeof current === 'object' && (current.es || current.en)) return current[lang] || current.es || '';
    if (typeof current === 'string') return current;
    return ''; 
  };

  const parseText = (key: string) => parseContent(t(key));
  
  // Variants para las secciones de contenido legal
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      } 
    },
  };

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      <Header />

      {/* =========================================================================
          FONDO ANIMADO (Fixed - Cubre toda la página)
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540]">
          {/* Gradiente Azul Profundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          {/* Ruido de textura */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

          {/* Orbes de luz con movimiento suave */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3], 
              scale: [1, 1.2, 1], 
              x: [0, 50, 0], 
              y: [0, -30, 0] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" 
          />
          <motion.div 
             animate={{ 
               opacity: [0.2, 0.4, 0.2], 
               scale: [1, 1.3, 1], 
               x: [0, -40, 0],
               y: [0, 40, 0]
             }}
             transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[150px]" 
          />
          
          {/* Texto de Fondo Sutil */}
          <motion.div
            initial={{ x: "20%" }} 
            animate={{ x: "-20%" }} 
            transition={{ 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear", 
              repeatType: "mirror"
            }}
            className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden"
          >
            <span className="text-[80vh] font-black italic text-white tracking-tighter whitespace-nowrap">
                PRIVACIDAD
            </span>
          </motion.div>
      </div>
      
      {/* =========================================================================
          CONTENIDO
      ========================================================================= */}
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-16 z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* IZQUIERDA: IMAGEN LOGO INFORMACION */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative flex items-center justify-center h-[300px] lg:h-[400px]"
            >
                <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Image
                       src="/LogoInformacion.png"
                       alt="Law Offices of Manuel Solis"
                       width={600}
                       height={600}
                       className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:scale-105 transition-transform duration-700"
                       priority
                    />
                </div>
            </motion.div>

            {/* DERECHA: TÍTULO Y SUBTÍTULO */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative z-20">
              
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-none">
                  <span className="block text-white/90 font-extralight mb-2">
                    {t('hero.title').split(' ')[0]} 
                  </span>
                  <span className="block font-medium text-[#B2904D] drop-shadow-2xl">
                    {t('hero.title').split(' ').slice(1).join(' ')} 
                  </span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative pl-6 border-l-2 border-[#B2904D]/50"
              >
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
              >
                 <div dangerouslySetInnerHTML={{ __html: parseText('section1.content') }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PRINCIPAL DE POLÍTICA DE PRIVACIDAD --- */}
      <section className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        
        {/* SECCIÓN 2: RECOPILACIÓN */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section2.title')} />
            <div className="grid lg:grid-cols-3 gap-8 p-6 bg-[#000814]/60 rounded-2xl border border-white/10 shadow-lg">
                <div className="lg:col-span-2 text-base text-blue-100/80 font-light space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section2.content1') }} />
                    <div dangerouslySetInnerHTML={{ __html: parseText('section2.usage') }} />
                </div>
                <div className="lg:col-span-1 p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20 space-y-3">
                    <h3 className="text-lg font-bold text-[#B2904D] mb-3 flex items-center gap-2"><FileText size={20}/> {t('section2.itemsTitle')}</h3>
                    <ul className="text-sm list-disc list-inside space-y-2">
                        {interfaceTexts.section2.items.map((item, index) => (
                             <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>

        {/* SECCIÓN 3: USO, COMPARTICIÓN Y DIVULGACIÓN */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section3.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-base text-blue-100/80 font-light space-y-4">
                        <h3 className="text-xl font-medium text-white flex items-center gap-2"><Shield size={24}/> {lang === 'es' ? 'Uso Principal' : 'Primary Use'}</h3>
                        <div dangerouslySetInnerHTML={{ __html: parseText('section3.usage') }} />
                    </div>
                    <div className="text-base text-blue-100/80 font-light space-y-4">
                        <h3 className="text-xl font-medium text-white flex items-center gap-2"><Mail size={24}/> {lang === 'es' ? 'Compartición de Datos' : 'Data Sharing'}</h3>
                        <div dangerouslySetInnerHTML={{ __html: parseText('section3.sharing') }} />
                    </div>
                </div>
                <div className="text-sm border-t border-white/10 pt-4 mt-4 text-orange-200/80 font-medium">
                    <div dangerouslySetInnerHTML={{ __html: parseContent(t('section3.mobileNote')) }} />
                </div>
                <div className="text-base text-blue-100/80 font-light space-y-4 pt-4 border-t border-white/10">
                   <h3 className="text-xl font-medium text-white flex items-center gap-2"><FileText size={20}/> {lang === 'es' ? 'Divulgación Legal Requerida' : 'Required Legal Disclosure'}</h3>
                   <div dangerouslySetInnerHTML={{ __html: parseText('section3.legalDisclosure') }} />
                </div>
            </div>
        </motion.div>

        {/* SECCIÓN 4: SEGUIMIENTO Y CONTACTO */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section4.title')} />
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* Seguimiento */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <h3 className="text-xl font-medium text-[#B2904D] mb-3">{lang === 'es' ? 'Seguimiento del Comportamiento' : 'Behavioral Tracking'}</h3>
                    <div className="text-base text-blue-100/80 font-light" dangerouslySetInnerHTML={{ __html: parseText('section4.tracking') }} />
                </div>

                {/* Contacto */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <h3 className="text-xl font-medium text-[#B2904D] mb-3">{lang === 'es' ? 'Datos de Contacto' : 'Contact Details'}</h3>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-white/90">
                            <Mail size={18} className="text-sky-400" /> 
                            {t('contactInfo.email')}
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <Phone size={18} className="text-sky-400" /> 
                            {t('contactInfo.phone')}
                        </div>
                    </div>

                    <p className="text-xs pt-4 text-white/60 flex items-center gap-2 border-t border-white/10">
                        <Clock size={16} />
                        {t('contactInfo.effectiveDate')}
                    </p>
                </div>
            </div>
        </motion.div>

      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <div className="relative z-20 mt-12">
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}