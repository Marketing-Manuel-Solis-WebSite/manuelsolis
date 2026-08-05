import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AccidenteOfficePageView from '../../AccidenteOfficePageView';
import {
  accidentOffices,
  getAccidentOffice,
  type AccidentOffice,
  type BiText,
} from '../../accidentesOfficesData';
import { generateBreadcrumbSchema } from '../../../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

/**
 * Zona compacta para el <title> y la description.
 *
 * `seoZone` (accidentesOfficesData.ts) existe para que las 8 fichas del área de
 * Houston no compitan por la misma keyword, pero varias miden más de 40
 * caracteres: en español el <title> solo deja ~20 libres para la zona ("Abogado
 * de Accidentes en " ocupa 25 y el template del layout añade " | Manuel Solís").
 * Con la zona larga, 13 de las 30 fichas salían con el título truncado en la SERP
 * (hasta 94 caracteres) y 4 descriptions pasaban de 165. Estas versiones cortas
 * conservan la ciudad y el barrio, que es lo que aporta la señal local.
 *
 * Las oficinas sin entrada aquí (su `seoZone` ya cabe, o no tienen) caen a
 * `seoZone` y, en su defecto, al nombre corto de la ficha.
 */
const SEO_ZONE_SHORT: Record<string, BiText | undefined> = {
  'houston-principal': { es: 'Houston East End', en: 'Houston East End' },
  // El East End lo comparte con houston-principal: aquí el diferenciador es el
  // horario real de esta oficina (abierta 24 horas).
  'houston-accidentes': { es: 'Houston (24 Horas)', en: 'Houston (24 Hours)' },
  'houston-bellaire': { es: 'Bellaire, Houston', en: 'Bellaire, Houston' },
  'main-st': { es: 'Downtown Houston', en: 'Downtown Houston' },
  'north-loop': { es: 'North Loop, Houston', en: 'North Loop, Houston' },
  northchase: { es: 'Northchase, Houston', en: 'Northchase, Houston' },
  'league-city': { es: 'League City, TX', en: 'League City, TX' },
};

/**
 * Tamaño real en píxeles de cada foto de public/offices. og:image:width/height
 * describen el archivo que se sirve, así que no valen los 1200x630 nominales de
 * la imagen de marca (varias fotos son 4:3, una es cuadrada).
 */
const OFFICE_IMAGE_SIZE: Record<string, { width: number; height: number } | undefined> = {
  '/offices/Chicago.png': { width: 1200, height: 900 },
  '/offices/Dallas.png': { width: 1200, height: 900 },
  '/offices/Denver.png': { width: 1200, height: 900 },
  '/offices/el-paso.png': { width: 1200, height: 900 },
  '/offices/Harlingen.png': { width: 1200, height: 900 },
  '/offices/Houston.png': { width: 1200, height: 900 },
  '/offices/League.png': { width: 1000, height: 1000 },
  '/offices/los-angeles.png': { width: 1200, height: 900 },
  '/offices/main.png': { width: 927, height: 633 },
  '/offices/ofAirways.png': { width: 1101, height: 507 },
  '/offices/ofhouston.png': { width: 1045, height: 663 },
  '/offices/ofLoop.png': { width: 1063, height: 601 },
  '/offices/ofNorth.png': { width: 1189, height: 685 },
};

function officeZone(office: AccidentOffice, lang: 'es' | 'en'): string {
  return SEO_ZONE_SHORT[office.id]?.[lang] ?? office.seoZone?.[lang] ?? office.name[lang];
}

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const office = getAccidentOffice(slug);
  if (!office) return {};

  const isEs = lang === 'es';
  const localeLang = isEs ? 'es' : 'en';
  const name = office.name[localeLang];
  // La zona diferencia las 8 fichas del área de Houston (evita canibalizar
  // la landing abogado-accidentes-houston y competir entre sí).
  const zone = officeZone(office, localeLang);
  // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
  //
  // Dice "Oficina", no "Abogado": esta ficha resuelve la intención de "dónde
  // está y cómo contactar", mientras la landing de ciudad
  // (/abogado-accidentes-<ciudad>) resuelve la comercial. Con el mismo encabezado
  // las dos competían por la misma consulta — en Dallas el título era idéntico.
  const title = isEs
    ? `Oficina de Accidentes en ${zone}`
    : `Accident Law Office in ${zone}`;
  const description = isEs
    ? `Abogados de accidentes y lesiones personales en ${zone}. Atención en español, sin importar su estatus migratorio. Llame al ${office.phone}.`
    : `Accident and personal injury lawyers in ${zone}. Service in Spanish, regardless of immigration status. Call ${office.phone}.`;

  const base = `/${lang}/servicios/accidentes/oficinas/${slug}`;
  const imageSize = OFFICE_IMAGE_SIZE[office.image];
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${base}`,
      languages: {
        es: `${SITE_URL}/es/servicios/accidentes/oficinas/${slug}`,
        en: `${SITE_URL}/en/servicios/accidentes/oficinas/${slug}`,
        'x-default': `${SITE_URL}/es/servicios/accidentes/oficinas/${slug}`,
      },
    },
    ...buildSocialMetadata({
      lang: localeLang,
      path: base,
      title,
      description,
      images: [{ url: office.image, width: imageSize?.width, height: imageSize?.height, alt: name }],
    }),
  };
}

export default async function AccidenteOficinaPage({ params }: Props) {
  const { lang, slug } = await params;
  const office = getAccidentOffice(slug);
  if (!office) notFound();

  const localeLang = lang === 'en' ? 'en' : 'es';
  const name = office.name[localeLang];
  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: localeLang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: localeLang === 'es' ? 'Accidentes' : 'Accidents', url: `/${lang}/servicios/accidentes` },
    { name, url: `/${lang}/servicios/accidentes/oficinas/${slug}` },
  ]);

  // Service sin PostalAddress: la ficha LocalBusiness canónica vive en
  // /oficinas/<slug>; aquí solo entidad temática ligada a #organization.
  const zone = officeZone(office, localeLang);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${localeLang}/servicios/accidentes/oficinas/${slug}#service`,
    name:
      localeLang === 'es'
        ? `Abogado de Accidentes en ${zone}`
        : `Accident Lawyer in ${zone}`,
    serviceType: 'Personal Injury Law',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'City', name: office.city },
    url: `${SITE_URL}/${localeLang}/servicios/accidentes/oficinas/${slug}`,
    // telephone/availableLanguage no son propiedades de Service: viven en el
    // ServiceChannel, que sí las admite.
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: office.phone },
      availableLanguage: ['es', 'en'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AccidenteOfficePageView office={office} lang={localeLang} />
    </>
  );
}

export function generateStaticParams() {
  const langs = ['es', 'en'];
  return langs.flatMap((lang) =>
    accidentOffices.map((office) => ({ lang, slug: office.id })),
  );
}
