import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';
import { getOfficeNap, formatOfficeAddress } from '../../../components/officesPhoneMap';
import { OFFICE_PHOTO_BY_SLUG } from '../../../lib/officePhotos';

const SLUG = 'chicago-jackson';

/**
 * Jackson (Chicago) — dirección con cita en el Loop de Chicago.
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
  title: { es: 'Chicago (W Jackson Blvd)', en: 'Chicago (W Jackson Blvd)' },
  quote: {
    es: 'Más de 35 años de experiencia y 50,000 casos ganados',
    en: 'Over 35 years of experience and 50,000 cases won',
  },
  // Dice qué ES esta dirección: se atiende solo con cita. El despacho pidió
  // decirlo así, sin la palabra "satélite" (reunión del 2026-10-06).
  description: {
    es: `Nuestra oficina de W Jackson Blvd, en el Loop de Chicago, atiende solo con cita. Llame al ${nap.phone} para agendar su cita dentro del horario de atención. Con la cita hecha se atienden aquí casos de inmigración, derecho familiar y accidentes con el equipo de Manuel Solís, en español o en inglés. Si necesita acudir sin cita, la oficina del área con atención presencial es Chicago, en 6000 W Cermak Rd.`,
    en: `Our W Jackson Blvd office in the Chicago Loop is by appointment only. Call ${nap.phone} to schedule your appointment during business hours. Once your appointment is set, immigration, family law, and accident cases are handled here with the Manuel Solis team, in Spanish or English. If you need to walk in, the area office that takes walk-ins is Chicago, at 6000 W Cermak Rd.`,
  },
  address: formatOfficeAddress(nap),
  phone: nap.phone,
  email: 'chicago@manuelsolis.com',
  hours: nap.hours.label,
  mapLink: nap.mapLink,
  image: OFFICE_PHOTO_BY_SLUG[SLUG],

  // Sin gerencia en el sitio: se atiende con cita.
  managers: [],

  attorneys: [
    {
      name: 'Andrew Fink',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Andrew%20Fink.png',
      quote: { es: 'Preparación antes que promesas.', en: 'Preparation over promises.' },
    },
    {
      name: 'Ana Patricia Rueda',
      role: { es: 'Abogada', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Ana%20Patricia%20Rueda.png',
      quote: { es: 'Cada caso es una familia.', en: 'Every case is a family.' },
    },
    {
      name: 'Eduardo Garcia',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Eduardo.png',
      quote: { es: 'Escuchar primero.', en: 'Listen first.' },
    },
  ],

  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Defensa contra deportación', en: 'Deportation defense' },
    { es: 'Asilo', en: 'Asylum' },
    { es: 'VAWA y Visa U', en: 'VAWA and U Visa' },
    { es: 'Inmigración familiar', en: 'Family immigration' },
    { es: 'Accidentes y lesiones personales', en: 'Accidents and personal injury' },
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
