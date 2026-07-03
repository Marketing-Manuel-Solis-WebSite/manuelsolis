import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AccidenteOfficePageView from '../../AccidenteOfficePageView';
import { accidentOffices, getAccidentOffice } from '../../accidentesOfficesData';
import { generateBreadcrumbSchema } from '../../../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const office = getAccidentOffice(slug);
  if (!office) return {};

  const isEs = lang === 'es';
  const name = office.name[isEs ? 'es' : 'en'];
  // seoZone diferencia las 8 fichas del área de Houston (evita canibalizar
  // la landing abogado-accidentes-houston y competir entre sí).
  const zone = office.seoZone?.[isEs ? 'es' : 'en'] ?? name;
  // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
  const title = isEs
    ? `Abogado de Accidentes en ${zone}`
    : `Accident Lawyer in ${zone}`;
  const description = isEs
    ? `Abogados de accidentes y lesiones personales en ${zone}. Atención en español, sin importar su estatus migratorio. Llame al ${office.phone}.`
    : `Accident and personal injury lawyers in ${zone}. Service in Spanish, regardless of immigration status. Call ${office.phone}.`;

  const base = `/${lang}/servicios/accidentes/oficinas/${slug}`;
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
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${base}`,
      type: 'website',
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{ url: office.image, width: 1200, height: 900, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [office.image],
    },
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
  const zone = office.seoZone?.[localeLang] ?? name;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      localeLang === 'es'
        ? `Abogado de Accidentes en ${zone}`
        : `Accident Lawyer in ${zone}`,
    serviceType: 'Personal Injury Law',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'City', name: office.city },
    url: `${SITE_URL}/${localeLang}/servicios/accidentes/oficinas/${slug}`,
    telephone: office.phone,
    availableLanguage: ['es', 'en'],
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
