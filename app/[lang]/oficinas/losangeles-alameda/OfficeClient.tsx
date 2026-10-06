import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';
import { getOfficeNap, formatOfficeAddress } from '../../../components/officesPhoneMap';
import { OFFICE_PHOTO_BY_SLUG } from '../../../lib/officePhotos';

const SLUG = 'losangeles-alameda';

/**
 * Alameda (Los Ángeles) — dirección con cita en el centro de Los Ángeles.
 *
 * La dirección, el teléfono, el horario y el mapa se leen de OFFICES_NAP en vez
 * de copiarse aquí: es el duplicado que hacía divergir el NAP entre archivos.
 */
const nap = getOfficeNap(SLUG)!;

const officeData: OfficeData = {
  badge: `${nap.city}, ${nap.state}`,
  id: SLUG,
  city: nap.city,
  state: nap.state,
  title: { es: 'Los Ángeles (S Alameda St)', en: 'Los Angeles (S Alameda St)' },
  quote: {
    es: 'Más de 35 años de experiencia y 50,000 casos ganados',
    en: 'Over 35 years of experience and 50,000 cases won',
  },
  // Dice qué ES esta dirección: se atiende solo con cita. El despacho pidió
  // decirlo así, sin la palabra "satélite" (reunión del 2026-10-06).
  description: {
    es: `Nuestra oficina de S Alameda St, en el centro de Los Ángeles y a pocos minutos de la corte de inmigración, atiende solo con cita. Llame al ${nap.phone} para agendar su cita; la línea se contesta las 24 horas. Con la cita hecha se atienden aquí casos de inmigración, defensa contra deportación y derecho familiar con el equipo de Manuel Solís, en español o en inglés. Si necesita acudir sin cita, la oficina del área con atención presencial es Los Ángeles, en 8337 Telegraph Rd, Pico Rivera.`,
    en: `Our S Alameda St office in Downtown Los Angeles, minutes from the immigration court, is by appointment only. Call ${nap.phone} to schedule your appointment; the line is answered 24 hours a day. Once your appointment is set, immigration, deportation defense, and family law cases are handled here with the Manuel Solis team, in Spanish or English. If you need to walk in, the area office that takes walk-ins is Los Angeles, at 8337 Telegraph Rd, Pico Rivera.`,
  },
  address: formatOfficeAddress(nap),
  phone: nap.phone,
  email: 'losangeles@manuelsolis.com',
  hours: nap.hours.label,
  mapLink: nap.mapLink,
  image: OFFICE_PHOTO_BY_SLUG[SLUG],

  // Sin gerencia en el sitio: se atiende con cita.
  managers: [],

  attorneys: [
    {
      name: 'Edward S. Reisman',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edward-Steven-Reisman.png',
      quote: { es: 'Guiando a sus clientes con conocimiento y humanidad.', en: 'Guiding clients with knowledge and humanity.' },
    },
  ],

  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Defensa contra deportación', en: 'Deportation defense' },
    { es: 'Detenidos', en: 'Detained' },
    { es: 'Asilo', en: 'Asylum' },
    { es: 'VAWA y Visa U', en: 'VAWA and U Visa' },
    { es: 'Inmigración familiar', en: 'Family immigration' },
  ],
};

const uiText: OfficeUIText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  team: { es: 'Nuestro Equipo Legal', en: 'Our Legal Team' },
  managers: { es: 'Gerencia', en: 'Management' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' },
};

export default function OfficeClient({
  lang,
  faqs = [],
}: {
  lang: 'es' | 'en';
  /** Preguntas de esta sede; las resuelve el page.tsx, que tiene el slug del NAP. */
  faqs?: FaqPair[];
}) {
  // napSlug activa la etiqueta «Solo con cita» y el aviso de agendar cita.
  return <OfficePageView data={officeData} ui={uiText} lang={lang} faqs={faqs} napSlug={SLUG} />;
}
