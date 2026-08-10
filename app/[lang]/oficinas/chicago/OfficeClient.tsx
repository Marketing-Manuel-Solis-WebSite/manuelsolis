import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: CHICAGO ---
const officeData: OfficeData = {
  badge: 'Chicago, IL',
  id: 'chicago',
  city: 'Chicago',
  state: 'IL',
  title: { es: 'Chicago, IL Oficina', en: 'Chicago, IL Office' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { 
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.', 
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.' 
  },
  address: '6000 W Cermak Rd, Cicero, IL 60804, United States',
  phone: '(312) 477-0389',
  email: 'chicago@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/IwdeP5BMwUKl3rB9G',
  image: '/offices/Chicago.png',
  
  // --- GERENCIA ---
  managers: [
    { name: 'Elizabeth Vazquez', role: { es: 'Gerente', en: 'Manager' } }
  ],
  // --- ABOGADOS (ACTUALIZADO SEGÚN TU LISTA) ---
  attorneys: [
    { 
      name: 'Ana Patricia Rueda', 
      role: { es: 'Abogada', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Ana%20Patricia%20Rueda.png',
      quote: { es: "El mejor premio que la vida tiene para ofrecer es trabajar duro en un trabajo que valga la pena.", en: "The best prize life has to offer is to work hard at work worth doing." }
    },
    { 
      name: 'Eduardo García', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Eduardo.png',
      quote: { es: "Utilizar el derecho como herramienta para la equidad y la justicia.", en: "Using law as a tool for equity and justice." }
    },
    { 
      name: 'Andrew Fink', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Andrew%20Fink.png',
      quote: { es: "Integridad, trabajo duro, pasión, competencia y humildad.", en: "Integrity, hard work, passion, competence, and humility." }
    }
  ],
  // --- SERVICIOS (AÑADIDO) ---
  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Planificación Patrimonial', en: 'Estate Planning' },
    { es: 'Familiar', en: 'Family Law' },
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
  team: { es: 'Nuestro Equipo Legal', en: 'Our Legal Team' },
  managers: { es: 'Gerencia', en: 'Management' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' } // Nuevo
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