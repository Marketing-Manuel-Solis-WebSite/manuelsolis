import OfficePageView, { type OfficeData, type OfficeUIText } from '../../../components/OfficePageView';
import type { FaqPair } from '../../../lib/faqSchema';
import { getOfficeNap, formatOfficeAddress } from '../../../components/officesPhoneMap';
import { OFFICE_PHOTO_BY_SLUG } from '../../../lib/officePhotos';

const SLUG = 'chicago-burr-ridge';

/**
 * Burr Ridge (Burr Ridge Pkwy) — dirección virtual del área de Chicago.
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
  title: { es: 'Burr Ridge (Burr Ridge Pkwy)', en: 'Burr Ridge (Burr Ridge Pkwy)' },
  quote: {
    es: 'Más de 35 años de experiencia y 50,000 casos ganados',
    en: 'Over 35 years of experience and 50,000 cases won',
  },
  // Dice qué ES esta dirección. Describirla como una sede más sería falso: no
  // hay personal del despacho en el sitio y la visita se agenda antes.
  description: {
    es: `Esta dirección de Burr Ridge Pkwy es un punto de atención con cita previa: no hay personal del despacho en el sitio, así que la visita se agenda antes por teléfono y la línea se contesta las 24 horas. Con la cita hecha se atienden aquí casos de inmigración, derecho familiar y accidentes con el equipo de Manuel Solís, en español o en inglés. Si necesita acudir sin cita, la oficina con personal del área es Chicago, en 6000 W Cermak Rd.`,
    en: `This Burr Ridge Pkwy address is a by-appointment location: the firm keeps no staff on site, so visits are booked in advance by phone and the line is answered 24 hours a day. Once the appointment is set, immigration, family law, and accident cases are handled here with the Manuel Solis team, in Spanish or English. If you need to walk in, the staffed office for the area is Chicago, at 6000 W Cermak Rd.`,
  },
  address: formatOfficeAddress(nap),
  phone: nap.phone,
  email: 'chicago@manuelsolis.com',
  hours: nap.hours.label,
  mapLink: nap.mapLink,
  image: OFFICE_PHOTO_BY_SLUG[SLUG],

  // Sin gerencia en sitio: es una dirección con cita.
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
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Eduardo%20Garcia.png',
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
  return <OfficePageView data={officeData} ui={uiText} lang={lang} faqs={faqs} />;
}
