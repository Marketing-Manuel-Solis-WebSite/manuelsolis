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
  const title = isEs
    ? `Abogado de Accidentes en ${name} | Manuel Solís`
    : `Accident Lawyer in ${name} | Manuel Solis`;
  const description = isEs
    ? `Abogados de accidentes y lesiones personales en ${name}. Atención en español, sin importar su estatus migratorio. Llame al ${office.phone}.`
    : `Accident and personal injury lawyers in ${name}. Service in Spanish, regardless of immigration status. Call ${office.phone}.`;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
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
