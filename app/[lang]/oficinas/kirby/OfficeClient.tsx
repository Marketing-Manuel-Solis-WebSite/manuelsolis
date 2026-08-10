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
    es: 'Esta dirección de Kirby Dr es un punto de atención con cita previa: no hay personal del despacho en el sitio, así que la visita se agenda antes por teléfono y la línea se contesta las 24 horas. Con la cita hecha se atienden aquí casos de inmigración, derecho familiar y accidentes con el equipo de Manuel Solís, en español o en inglés, y el despacho representa clientes en todo Estados Unidos. Si necesita acudir sin cita, hay tres oficinas con personal en Houston: Principal, Bellaire y Accidentes.',
    en: 'This Kirby Dr address is a by-appointment location: the firm keeps no staff on site, so visits are booked in advance by phone and the line is answered 24 hours a day. Once the appointment is set, immigration, family law, and accident cases are handled here with the Manuel Solis team, in Spanish or English, and the firm represents clients throughout the United States. If you need to walk in, three staffed offices serve Houston: Principal, Bellaire, and Accidents.'
  },
  address: '3730 Kirby Dr Suite 1200, Houston, TX 77098, United States',
  phone: '(713) 903-7875',
  email: 'houston@manuelsolis.com',
  // Dirección virtual (Regus): el despacho atiende aquí solo con cita previa.
  // El "24 horas" publicado es el enrutamiento del call-center, no esta sede
  // (ver VIRTUAL_OFFICE_SLUGS en app/lib/officesRegistry.ts).
  hours: { es: 'Con cita previa · atención telefónica 24 horas', en: 'By appointment · 24-hour phone support' },
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