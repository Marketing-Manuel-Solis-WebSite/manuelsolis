import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: HOUSTON ACCIDENTES (6705) ---
const officeData: OfficeData = {
  badge: 'Houston, Texas',
  id: 'houston-accidentes',
  city: 'Houston',
  state: 'TX',
  title: { es: 'Houston Accidentes, TX', en: 'Houston Accidentes, TX' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: {
    // Reclasificada como SATÉLITE el 2026-08-22 por decisión del despacho:
    // sin atención presencial, con horario real y sin la afirmación de 24 h.
    // Las sedes con atención sin cita en Houston pasaron de tres a DOS —
    // Accidentes dejó de serlo—, y este texto es una de las fuentes que lo
    // decía. Ver app/components/officesPhoneMap.ts → SATELLITE_HOURS.
    es: "Esta dirección de Navigation Blvd (6705) es una oficina satélite de Manuel Solís: no es una sede de atención presencial y no se recibe a nadie sin aviso previo. Opera de lunes a viernes de 9:00 AM a 7:00 PM y los sábados de 9:00 AM a 4:00 PM; los domingos permanece cerrada. La visita se coordina antes por teléfono y, una vez coordinada, aquí se atienden casos de inmigración, derecho familiar y accidentes con el equipo del despacho, en español o en inglés. Si necesita acudir sin cita, el despacho tiene dos oficinas con atención presencial en Houston: la Principal, en 6657 Navigation Blvd, y Bellaire.",
    en: "This Navigation Blvd (6705) address is a Manuel Solis satellite office: it is not a walk-in location and no one is received without prior notice. It operates Monday to Friday from 9:00 AM to 7:00 PM and Saturday from 9:00 AM to 4:00 PM, and is closed on Sunday. Visits are arranged in advance by phone, and once arranged, immigration, family law and accident cases are handled here with the firm's team, in Spanish or English. If you need to walk in, the firm has two staffed offices in Houston: the Main Office at 6657 Navigation Blvd, and Bellaire.",
  },
  address: '6705 Navigation Blvd, Houston, TX 77011, United States',
  phone: '(713) 231-5384',
  email: 'houston@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/wEP84RY0RqTOqR787',
  image: '/offices/Houston.png',
  
  // --- GERENCIA (ELIMINADO) ---
  managers: [],
  
  // --- ABOGADOS ---
  attorneys: [
    { 
      name: 'Juan Solís', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Juan%20Solis.png',
      quote: { es: "Saber no es suficiente; debemos aplicar.", en: "Knowing is not enough; we must apply." }
    },
    {
      name: 'Greg Finney',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Gregory%20Finney.png',
      quote: { es: "Mantente curioso.", en: "Stay curious." }
    },
    {
      name: 'Gabriel Pérez',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Gabriel%20Perez.png',
      quote: { es: "No hay excusa para que nadie trabaje más duro que tú.", en: "There's no excuse for anyone to work harder than you." }
    },
    {
      name: 'Austen Gunnels',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Austen%20Gunnels.png',
      quote: { es: "Abogando incansablemente.", en: "Advocating tirelessly." }
    },
    {
      name: 'Maria Armenta',
      role: { es: 'Abogada', en: 'Attorney' },
      image: '/LogoInformacion.png', // Placeholder
      quote: { es: "Representación legal compasiva.", en: "Compassionate legal representation." }
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