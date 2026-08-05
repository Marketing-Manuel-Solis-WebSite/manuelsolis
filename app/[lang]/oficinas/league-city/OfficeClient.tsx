import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';

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
    es: 'Esta dirección de S Shore Blvd, en League City, es un punto de atención con cita previa: no hay personal del despacho en el sitio, así que la visita se agenda antes por teléfono y la línea se contesta las 24 horas. Con la cita hecha se atienden aquí casos de inmigración, derecho familiar y accidentes con el equipo de Manuel Solís, en español o en inglés, y el despacho representa clientes en todo Estados Unidos. Las oficinas con personal más cercanas están en Houston: Principal, Bellaire y Accidentes.',
    en: 'This S Shore Blvd address in League City is a by-appointment location: the firm keeps no staff on site, so visits are booked in advance by phone and the line is answered 24 hours a day. Once the appointment is set, immigration, family law, and accident cases are handled here with the Manuel Solis team, in Spanish or English, and the firm represents clients throughout the United States. The nearest staffed offices are in Houston: Principal, Bellaire, and Accidents.'
  },
  address: '2600 S Shore Blvd, League City, TX 77573, United States',
  phone: '(832) 598-3782',
  email: 'leaguecity@manuelsolis.com',
  // Dirección virtual (Regus): atención solo con cita previa; el "24 horas"
  // publicado es el call-center central, no esta sede.
  hours: { es: 'Con cita previa · atención telefónica 24 horas', en: 'By appointment · 24-hour phone support' },
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

export default function OfficeClient({ lang }: { lang: 'es' | 'en' }) {
  return <OfficePageView data={officeData} ui={uiText} lang={lang} />;
}
