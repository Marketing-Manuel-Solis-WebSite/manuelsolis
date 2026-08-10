import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: HOUSTON PRINCIPAL ---
const officeData: OfficeData = {
  badge: 'Houston, Texas',
  id: 'houston',
  city: 'Houston',
  state: 'TX',
  title: { es: 'Houston, TX Oficina Principal', en: 'Houston, TX Main Office' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { 
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.', 
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.' 
  },
  address: '6657 Navigation Blvd, Houston, Texas 77011, United States',
  phone: '(713) 701-1731',
  email: 'houston@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/ZErZNzC4y9PtCrEJm', 
  image: '/offices/Houston.png',
  
  // --- GERENCIA (ELIMINADO) ---
  managers: [],
  
  // --- ABOGADOS ---
  attorneys: [
    {
      name: 'Manuel Solís',
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20Solis.png',
      role: { es: 'Abogado Principal y Fundador', en: 'Principal Attorney and Founder' },
      quote: { es: "Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños.", en: "I feel enormously blessed to serve as a tool to fulfill their dreams." }
    },
    {
      name: 'Manuel E. Solís III',
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20E%20Solis%20III.png',
      role: { es: 'Abogado', en: 'Attorney' },
      quote: { es: "Me apasiona ayudar a la comunidad y a las personas necesitadas.", en: "I am passionate about helping the community and people in need." }
    },
    {
      name: 'Alejandro Manzano',
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Alejandro.png',
      role: { es: 'Abogado', en: 'Attorney' },
      quote: { es: "Un acompañamiento legal claro y humano.", en: "Clear and humane legal representation." }
    },
    {
      name: 'Rosa Medina',
      image: '/LogoInformacion.png', // Placeholder
      role: { es: 'Abogada', en: 'Attorney' },
      quote: { es: "Defensa con integridad.", en: "Defense with integrity." }
    },
    {
      name: 'Timothe Garille',
      image: '/LogoInformacion.png', // Placeholder
      role: { es: 'Abogado', en: 'Attorney' },
      quote: { es: "Compromiso con cada caso.", en: "Commitment to every case." }
    }
  ],

  // --- SERVICIOS ---
  services: [
    { es: 'Inmigración', en: 'Immigration' }, 
    { es: 'Planificación Patrimonial', en: 'Estate Planning' },
    { es: 'Seguros', en: 'Insurance' },
    { es: 'Accidentes', en: 'Accidents' },
    { es: 'Ticket', en: 'Traffic Tickets' },
    { es: 'Detenidos', en: 'Detained' }
  ]
};

// --- TEXTOS DE INTERFAZ ---
const uiText: OfficeUIText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  team: { es: 'Nuestros Abogados', en: 'Our Attorneys' },
  managers: { es: 'Gerencia', en: 'Management' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' }
};

export default function OfficeClient({
  lang,
  faqs = [],
}: {
  lang: 'es' | 'en';
  /** Preguntas de esta sede; las resuelve el page.tsx, que tiene el slug del NAP. */
  faqs?: FaqPair[];
}) {
  return <OfficePageView data={officeData} ui={uiText} lang={lang} faqs={faqs} />;
}