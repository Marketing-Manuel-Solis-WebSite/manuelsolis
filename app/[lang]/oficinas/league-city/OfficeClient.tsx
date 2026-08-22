import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';

// --- DATOS ESPECÍFICOS: LEAGUE CITY ---
const officeData: OfficeData = {
  badge: 'League City, Texas',
  id: 'league-city',
  city: 'League City',
  state: 'TX',
  title: { es: 'League City, TX', en: 'League City, TX' },
  quote: { es: 'Más de 35 años de experiencia y 50,000 casos ganados.', en: 'Over 35 years of experience and 50,000 cases won.' },
  // El blurb genérico del despacho describía esta dirección como una sede más;
  // aquí solo se atiende con cita (VIRTUAL_OFFICE_SLUGS). Houston es la ciudad de
  // las oficinas con personal más cercanas: las demás de Texas (Dallas, El Paso,
  // Harlingen) están a cientos de kilómetros.
  description: {
    // Reclasificada como SATÉLITE el 2026-08-22 (segunda pasada: en la
    // primera se quedó fuera por estar en League City y no en Houston).
    es: "Esta dirección de S Shore Blvd, en League City, es una oficina satélite de Manuel Solís: no es una sede de atención presencial y no se recibe a nadie sin aviso previo. Opera de lunes a viernes de 9:00 AM a 7:00 PM y los sábados de 9:00 AM a 4:00 PM; los domingos permanece cerrada. La visita se coordina antes por teléfono y, una vez coordinada, aquí se atienden casos de inmigración, derecho familiar y accidentes con el equipo del despacho, en español o en inglés. Si necesita acudir sin cita, las oficinas con atención presencial más cercanas están en Houston: la Principal, en 6657 Navigation Blvd, Accidentes y Bellaire.",
    en: "This S Shore Blvd address in League City is a Manuel Solis satellite office: it is not a walk-in location and no one is received without prior notice. It operates Monday to Friday from 9:00 AM to 7:00 PM and Saturday from 9:00 AM to 4:00 PM, and is closed on Sunday. Visits are arranged in advance by phone, and once arranged, immigration, family law and accident cases are handled here with the firm's team, in Spanish or English. If you need to walk in, the nearest staffed offices are in Houston: the Main Office at 6657 Navigation Blvd, Accidents and Bellaire.",
  },
  address: '2600 S Shore Blvd, League City, TX 77573, United States',
  phone: '(832) 598-3782',
  email: 'leaguecity@manuelsolis.com',
  // Dirección virtual (Regus): atención solo con cita previa; el "24 horas"
  // publicado es el call-center central, no esta sede.
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
  mapLink: 'https://share.google/8T736Tycmnh4BZw5o',
  image: '/offices/League.png',

  // --- TAMBIÉN ATENDEMOS ACCIDENTES (oficina virtual) ---
  accidentsSection: true,
  accidentsSlug: 'league-city',

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
  return <OfficePageView data={officeData} ui={uiText} lang={lang} faqs={faqs} napSlug="league-city" />;
}
