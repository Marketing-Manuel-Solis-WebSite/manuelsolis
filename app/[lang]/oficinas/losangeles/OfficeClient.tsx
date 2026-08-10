import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: LOS ANGELES ---
const officeData: OfficeData = {
  badge: 'Los Angeles (Pico Rivera), CA',
  id: 'los-angeles',
  city: 'Los Angeles',
  state: 'CA',
  title: { es: 'Los Angeles, CA Oficina', en: 'Los Angeles, CA Office' },
  quote: { es: 'Abogados de Inmigración en Los Ángeles con Experiencia', en: 'Experienced Immigration Attorneys in Los Angeles' },
  description: {
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.',
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.'
  },
  address: '8337 Telegraph Rd, STE 115, Pico Rivera, CA 90660, United States',
  phone: '(213) 784-1554',
  email: 'losangeles@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 2:00 PM' },
  mapLink: 'https://share.google/VnrxOpNfWDbNYkwjP',
  image: '/offices/los-angeles.png',

  // --- GERENCIA (ELIMINADO) ---
  managers: [],

  // --- ABOGADOS ---
  attorneys: [
    {
      name: 'Edward Stephen',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edward-Steven-Reisman.png', // Usando foto de Edward S. Reisman
      quote: { es: "Guiando a sus clientes con conocimiento y humanidad.", en: "Guiding clients with knowledge and humanity." }
    }
  ],

  // --- SERVICIOS ---
  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Planificación Patrimonial', en: 'Estate Planning' },
    { es: 'Seguros', en: 'Insurance' },
    { es: 'Accidentes', en: 'Accidents' },
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
