'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactForm from './ContactForm'
import { useLanguage } from '../context/LanguageContext'
import { m, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  FileText, Mail, Phone, MapPin, Globe, Shield, MessageSquare, Scale, AlertTriangle, Link2, Lock, RefreshCw, Landmark, HelpCircle
} from 'lucide-react'

const interfaceTexts = {
  hero: {
    title: { es: 'TÉRMINOS DE SERVICIO', en: 'TERMS OF SERVICE' },
    subtitle: {
      es: 'Última actualización: 18 de marzo de 2026',
      en: 'Last updated: March 18, 2026'
    },
  },
  intro: {
    es: 'Bienvenido al sitio web de la Oficina Legal de Manuel Solís ("nosotros", "nuestro" o "nos"). Al acceder o utilizar nuestro sitio web en manuelsolis.com, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice nuestro sitio web.',
    en: 'Welcome to the website of the Law Office of Manuel Solís ("we," "our," or "us"). By accessing or using our website at manuelsolis.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.'
  },
  section1: {
    title: { es: '1. Uso del Sitio Web', en: '1. Use of Website' },
    content: {
      es: 'Este sitio web se proporciona con fines informativos sobre nuestros servicios legales y para facilitar la comunicación con nuestra oficina. El contenido de este sitio web no constituye asesoramiento legal. No se establece una relación abogado-cliente por el uso de este sitio web o el envío de formularios.',
      en: 'This website is provided for informational purposes about our legal services and to facilitate communication with our office. The content on this website does not constitute legal advice. An attorney-client relationship is not established by your use of this website or submission of any forms.'
    }
  },
  section2: {
    title: { es: '2. Comunicaciones por SMS/Mensajes de Texto', en: '2. SMS/Text Messaging Communications' },
    intro: {
      es: 'Al optar por nuestro programa de mensajería SMS a través de los formularios de nuestro sitio web o enviando una palabra clave por texto, usted consiente recibir comunicaciones SMS de la Oficina Legal de Manuel Solís. Estos mensajes se utilizan para:',
      en: 'By opting in to our SMS messaging program through our website forms or by texting a keyword, you consent to receive SMS communications from the Law Office of Manuel Solís. These messages are used to:'
    },
    items: [
      { es: 'Responder a consultas sobre servicios de inmigración', en: 'Respond to immigration service inquiries' },
      { es: 'Programar consultas', en: 'Schedule consultations' },
      { es: 'Enviar recordatorios de citas', en: 'Send appointment reminders' },
      { es: 'Solicitar documentos', en: 'Request documents' },
      { es: 'Proporcionar actualizaciones de casos', en: 'Provide case updates' },
    ],
    content2: {
      es: 'La frecuencia de los mensajes puede variar. Pueden aplicarse tarifas estándar de mensajes y datos. Su consentimiento para recibir mensajes SMS no es una condición para adquirir ningún servicio. Puede cancelar en cualquier momento respondiendo "STOP" a cualquier mensaje. Puede solicitar ayuda respondiendo "HELP". Los operadores de telefonía inalámbrica no son responsables por mensajes retrasados o no entregados.',
      en: 'Message frequency may vary. Standard messaging and data rates may apply. Your consent to receive SMS messages is not a condition of purchasing any service. You may opt out at any time by replying "STOP" to any message. You may request help by replying "HELP." Wireless carriers are not liable for delayed or undelivered messages.'
    },
    privacyNote: {
      es: 'Para detalles sobre cómo se recopilan y usan sus datos, consulte nuestra',
      en: 'For details on how your data is collected and used, see our'
    },
    privacyLink: { es: 'Política de Privacidad', en: 'Privacy Policy' },
    smsNote: {
      es: 'Para los términos completos del programa SMS, consulte nuestros',
      en: 'For complete SMS program terms, see our'
    },
    smsLink: { es: 'Términos de Servicio SMS', en: 'SMS Terms of Service' },
  },
  section3: {
    title: { es: '3. Propiedad Intelectual', en: '3. Intellectual Property' },
    content: {
      es: 'Todo el contenido de este sitio web, incluyendo texto, gráficos, logotipos e imágenes, es propiedad de la Oficina Legal de Manuel Solís y está protegido por las leyes aplicables de derechos de autor y marcas registradas. No puede reproducir, distribuir ni usar ningún contenido sin nuestro permiso previo por escrito.',
      en: 'All content on this website, including text, graphics, logos, and images, is the property of the Law Office of Manuel Solís and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content without our prior written permission.'
    }
  },
  section4: {
    title: { es: '4. Exención de Garantías', en: '4. Disclaimer of Warranties' },
    content: {
      es: 'Nuestro sitio web se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos que el sitio web estará disponible en todo momento ni que estará libre de errores. La información proporcionada no constituye asesoramiento legal.',
      en: 'Our website is provided "as is" without warranties of any kind. We do not guarantee that the website will be available at all times or free from errors. The information provided does not constitute legal advice.'
    }
  },
  section5: {
    title: { es: '5. Limitación de Responsabilidad', en: '5. Limitation of Liability' },
    content: {
      es: 'La Oficina Legal de Manuel Solís no será responsable por ningún daño derivado del uso de este sitio web o de la confianza en la información proporcionada en el mismo.',
      en: 'The Law Office of Manuel Solís shall not be liable for any damages arising from the use of this website or reliance on information provided herein.'
    }
  },
  section6: {
    title: { es: '6. Enlaces de Terceros', en: '6. Third-Party Links' },
    content: {
      es: 'Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables del contenido o las prácticas de esos sitios.',
      en: 'Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites.'
    }
  },
  section7: {
    title: { es: '7. Privacidad', en: '7. Privacy' },
    content: {
      es: 'El uso de este sitio web también se rige por nuestra Política de Privacidad, que describe cómo recopilamos, usamos y protegemos su información personal.',
      en: 'Your use of this website is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.'
    }
  },
  section8: {
    title: { es: '8. Cambios a los Términos', en: '8. Changes to Terms' },
    content: {
      es: 'Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios se publicarán en esta página con una fecha actualizada.',
      en: 'We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date.'
    }
  },
  section9: {
    title: { es: '9. Ley Aplicable', en: '9. Governing Law' },
    content: {
      es: 'Estos Términos de Servicio se rigen por las leyes del Estado de Texas.',
      en: 'These Terms of Service are governed by the laws of the State of Texas.'
    }
  },
  section10: {
    title: { es: '10. Contáctenos', en: '10. Contact Us' },
    intro: {
      es: 'Si tiene preguntas sobre estos Términos de Servicio, contáctenos en:',
      en: 'If you have questions about these Terms of Service, contact us at:'
    },
    email: 'support@manuelsolis.com',
    phone: '713-844-2700',
    address: '6657 Navigation Blvd, Houston, Texas 77011',
  }
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
)

const sectionIcons: Record<string, React.ReactNode> = {
  section1: <Globe size={20} />,
  section2: <MessageSquare size={20} />,
  section3: <Shield size={20} />,
  section4: <AlertTriangle size={20} />,
  section5: <Scale size={20} />,
  section6: <Link2 size={20} />,
  section7: <Lock size={20} />,
  section8: <RefreshCw size={20} />,
  section9: <Landmark size={20} />,
  section10: <HelpCircle size={20} />,
}

/* Fondo decorativo con @keyframes CSS (solo transform/opacity, corren en el
   compositor) en lugar de loops infinitos de framer-motion, que ocupaban rAF
   en el hilo principal durante toda la visita. La opacidad de reposo vive en
   la clase porque los orbes no llevan utilidad de opacidad: con
   `animation: none` (reduced-motion) volverian a opacity 1 y se verian mucho
   mas brillantes que animados. */
const BACKDROP_CSS = `
  @keyframes tos-orb-blue {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    50% { transform: translate(50px, -30px) scale(1.2); opacity: 0.5; }
  }
  @keyframes tos-orb-sky {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
    50% { transform: translate(-40px, 40px) scale(1.3); opacity: 0.4; }
  }
  @keyframes tos-wordmark { from { transform: translateX(20%); } to { transform: translateX(-20%); } }
  .tos-orb-blue { opacity: 0.3; animation: tos-orb-blue 18s ease-in-out infinite both; }
  .tos-orb-sky { opacity: 0.2; animation: tos-orb-sky 22s ease-in-out 2s infinite both; }
  .tos-wordmark { animation: tos-wordmark 60s linear infinite alternate both; }
  @media (prefers-reduced-motion: reduce) {
    .tos-orb-blue, .tos-orb-sky, .tos-wordmark { animation: none; }
  }
`

export default function TermsOfService() {
  const { language } = useLanguage()
  const lang = language as 'es' | 'en'

  const t = (key: string): string => {
    const parts = key.split('.')
    let current: any = interfaceTexts
    for (const part of parts) {
      if (current && current[part]) current = current[part]
      else return ''
    }
    if (typeof current === 'object' && (current.es || current.en)) return current[lang] || current.es || ''
    if (typeof current === 'string') return current
    return ''
  }

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
  }

  return (
    <div className="relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden">
      <Header />

      <main id="main-content" tabIndex={-1}>
        {/* FONDO ANIMADO */}
        <div aria-hidden="true" className="fixed inset-0 z-0 w-full h-full bg-[#001540] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
          <div className="tos-orb-blue absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="tos-orb-sky absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[150px]" />
          <div aria-hidden="true" className="tos-wordmark absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[80vh] font-black italic text-white tracking-tighter whitespace-nowrap">
              TERMS
            </span>
          </div>
          <style dangerouslySetInnerHTML={{ __html: BACKDROP_CSS }} />
        </div>

        {/* HERO SECTION */}
        <section className="relative pt-64 pb-16 z-10 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <m.div
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
              </m.div>

              <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative z-20">
                <div className="relative">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-none">
                    <span className="block text-white/90 font-extralight mb-2">
                      {t('hero.title').split(' ')[0]}
                    </span>{' '}
                    <span className="block font-medium text-[#B2904D] drop-shadow-2xl">
                      {t('hero.title').split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                </div>

                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="relative pl-6 border-l-2 border-[#B2904D]/50"
                >
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
                >
                  <p>{t('intro')}</p>
                </m.div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="container mx-auto px-4 py-20 relative z-10 max-w-7xl space-y-24">

          {/* SECCIÓN 1: Uso del Sitio Web */}
          <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section1.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
              <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2">{sectionIcons.section1} {t('section1.title')}</h3>
                <p className="text-base text-blue-100/80">{t('section1.content')}</p>
              </div>
            </div>
          </m.div>

          {/* SECCIÓN 2: SMS Communications */}
          <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section2.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
              <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2">{sectionIcons.section2} {t('section2.title')}</h3>
                <p className="text-base text-blue-100/80 mb-4">{t('section2.intro')}</p>
                <ul className="text-sm list-disc list-inside space-y-3 pl-4 mb-6">
                  {interfaceTexts.section2.items.map((item, index) => (
                    <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                  ))}
                </ul>
                <p className="text-base text-blue-100/80 mb-4">{t('section2.content2')}</p>
                <p className="text-sm text-blue-100/80">
                  {t('section2.privacyNote')}{' '}
                  <Link href={`/${lang}/privacidad`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">
                    {t('section2.privacyLink')}
                  </Link>
                  . {t('section2.smsNote')}{' '}
                  <Link href={`/${lang}/sms-terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">
                    {t('section2.smsLink')}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </m.div>

          {/* SECCIONES 3, 4, 5 */}
          <div className="grid lg:grid-cols-3 gap-8">
            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
              <SectionTitle title={t('section3.title')} />
              <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-2">{sectionIcons.section3}<span className="font-semibold">{lang === 'es' ? 'Propiedad Intelectual' : 'Intellectual Property'}</span></div>
                <p className="text-base text-blue-100/80">{t('section3.content')}</p>
              </div>
            </m.div>

            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
              <SectionTitle title={t('section4.title')} />
              <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-2">{sectionIcons.section4}<span className="font-semibold">{lang === 'es' ? 'Exención de Garantías' : 'Disclaimer'}</span></div>
                <p className="text-base text-blue-100/80">{t('section4.content')}</p>
              </div>
            </m.div>

            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
              <SectionTitle title={t('section5.title')} />
              <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-2">{sectionIcons.section5}<span className="font-semibold">{lang === 'es' ? 'Limitación' : 'Limitation'}</span></div>
                <p className="text-base text-blue-100/80">{t('section5.content')}</p>
              </div>
            </m.div>
          </div>

          {/* SECCIONES 6, 7 */}
          <div className="grid md:grid-cols-2 gap-8">
            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <SectionTitle title={t('section6.title')} />
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-4">{sectionIcons.section6}<span className="font-semibold">{lang === 'es' ? 'Enlaces de Terceros' : 'Third-Party Links'}</span></div>
                <p>{t('section6.content')}</p>
              </div>
            </m.div>

            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <SectionTitle title={t('section7.title')} />
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-4">{sectionIcons.section7}<span className="font-semibold">{lang === 'es' ? 'Privacidad' : 'Privacy'}</span></div>
                <p>{t('section7.content')}</p>
              </div>
            </m.div>

            {/* SECCIONES 8, 9 */}
            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <SectionTitle title={t('section8.title')} />
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-4">{sectionIcons.section8}<span className="font-semibold">{lang === 'es' ? 'Cambios' : 'Changes'}</span></div>
                <p>{t('section8.content')}</p>
              </div>
            </m.div>

            <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <SectionTitle title={t('section9.title')} />
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                <div className="flex items-center gap-2 text-[#B2904D] mb-4">{sectionIcons.section9}<span className="font-semibold">{lang === 'es' ? 'Ley Aplicable' : 'Governing Law'}</span></div>
                <p>{t('section9.content')}</p>
              </div>
            </m.div>
          </div>

          {/* SECCIÓN 10: Contáctenos */}
          <m.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section10.title')} />
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 shadow-inner">
              <p className="text-base text-white font-medium">{t('section10.intro')}</p>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-3 text-white/90">
                  <Mail size={18} className="text-sky-400" />
                  <a href={`mailto:${interfaceTexts.section10.email}`} className="hover:text-[#B2904D] transition">
                    {interfaceTexts.section10.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Phone size={18} className="text-sky-400" />
                  {/* data-calltrk-noswap: este es el teléfono DE REGISTRO del documento,
                  no un CTA de marketing. CallRail respeta el atributo y excluye
                  todo el subárbol —del reemplazo y del descubrimiento del pool—,
                  así que aquí siempre se lee el número real del despacho. Un
                  número de pool rotando en la cláusula de contacto de un
                  documento legal es incorrecto, y además quemaría una asignación
                  en páginas que no reciben tráfico de campaña. */}
                  <a
                    data-calltrk-noswap
                    href={`tel:+1${interfaceTexts.section10.phone.replace(/\D/g, '')}`}
                    className="hover:text-[#B2904D] transition"
                  >
                    {interfaceTexts.section10.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-white/90">
                  <MapPin size={18} className="text-sky-400 flex-shrink-0 mt-1" />
                  <span>{interfaceTexts.section10.address}</span>
                </div>
              </div>
            </div>
          </m.div>

        </section>

        {/* FORMULARIO DE CONTACTO */}
        <div className="relative z-20 mt-24 py-12">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
