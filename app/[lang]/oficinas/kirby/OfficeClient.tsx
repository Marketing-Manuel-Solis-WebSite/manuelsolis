import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: HOUSTON KIRBY ---
const officeData: OfficeData = {
  badge: 'Houston (Kirby), Texas',
  id: 'houston-kirby',
  city: 'Houston',
  state: 'TX',
  title: { es: 'Houston, TX (Kirby)', en: 'Houston, TX (Kirby)' },
  quote: { es: 'Más de 35 años de experiencia y 50,000 casos ganados', en: 'Over 35 years of experience and 50,000 cases won' },
  // El blurb genérico del despacho describía esta dirección como una sede más;
  // aquí solo se atiende con cita (VIRTUAL_OFFICE_SLUGS), así que el texto dice
  // qué es esta dirección y a qué oficinas con personal se puede acudir sin cita.
  description: {
    // Reclasificada como SATÉLITE el 2026-08-22 por decisión del despacho:
    // sin atención presencial, con horario real y sin la afirmación de 24 h.
    // Las sedes con atención sin cita en Houston pasaron de tres a DOS —
    // Accidentes dejó de serlo—, y este texto es una de las fuentes que lo
    // decía. Ver app/components/officesPhoneMap.ts → SATELLITE_HOURS.
    es: "Esta dirección de Kirby Dr es una oficina satélite de Manuel Solís: no es una sede de atención presencial y no se recibe a nadie sin aviso previo. Opera de lunes a viernes de 9:00 AM a 7:00 PM y los sábados de 9:00 AM a 4:00 PM; los domingos permanece cerrada. La visita se coordina antes por teléfono y, una vez coordinada, aquí se atienden casos de inmigración, derecho familiar y accidentes con el equipo del despacho, en español o en inglés. Si necesita acudir sin cita, el despacho tiene dos oficinas con atención presencial en Houston: la Principal, en 6657 Navigation Blvd, y Bellaire.",
    en: "This Kirby Dr address is a Manuel Solis satellite office: it is not a walk-in location and no one is received without prior notice. It operates Monday to Friday from 9:00 AM to 7:00 PM and Saturday from 9:00 AM to 4:00 PM, and is closed on Sunday. Visits are arranged in advance by phone, and once arranged, immigration, family law and accident cases are handled here with the firm's team, in Spanish or English. If you need to walk in, the firm has two staffed offices in Houston: the Main Office at 6657 Navigation Blvd, and Bellaire.",
  },
  address: '3730 Kirby Dr Suite 1200, Houston, TX 77098, United States',
  phone: '(713) 903-7875',
  email: 'houston@manuelsolis.com',
  // Dirección virtual (Regus): el despacho atiende aquí solo con cita previa.
  // El "24 horas" publicado es el enrutamiento del call-center, no esta sede
  // (ver VIRTUAL_OFFICE_SLUGS en app/lib/officesRegistry.ts).
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/R85nYwhTFqoxLctD4',
  image: '/offices/ofhouston.png',
  
  // --- TAMBIÉN ATENDEMOS ACCIDENTES (oficina virtual) ---
  accidentsSection: true,
  accidentsSlug: 'kirby',

  // --- GERENCIA (ELIMINADO) ---
  managers: [],
  
  // --- ABOGADOS (ACTUALIZADO) ---
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