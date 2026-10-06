import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import { getOfficeNap } from '../../../components/officesPhoneMap';
import { officeOgImage } from '../../../lib/officePhotos';

const SLUG = 'chicago-jackson';
const SITE_URL = 'https://www.manuelsolis.com';

/**
 * Dirección con cita en el Loop de Chicago (VIRTUAL_OFFICE_SLUGS).
 *
 * A diferencia de las páginas de oficina antiguas, esta NO repite la dirección
 * ni el teléfono: los lee de OFFICES_NAP. Ese duplicado es lo que hacía
 * divergir el NAP entre archivos y lo que obligó a escribir napConsistency.
 */
const nap = getOfficeNap(SLUG)!;

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  const localeLang = isEs ? 'es' : 'en';

  const title = isEs
    ? `Abogados de Inmigración en Chicago (Loop)`
    : `Immigration Lawyers in Chicago (Loop)`;

  // No promete atención presencial: se atiende solo con cita, en el horario de su ficha.
  const description = isEs
    ? `Manuel Solís en ${nap.street}, Loop de ${nap.city}: solo con cita. Llame al ${nap.phone} para agendar. Inmigración, familia y accidentes.`
    : `Manuel Solis at ${nap.street}, ${nap.city} Loop: by appointment only. Call ${nap.phone} to schedule. Immigration, family, and accident cases.`;

  const og = officeOgImage(SLUG, localeLang);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/oficinas/${SLUG}`,
      languages: {
        es: `${SITE_URL}/es/oficinas/${SLUG}`,
        en: `${SITE_URL}/en/oficinas/${SLUG}`,
        'x-default': `${SITE_URL}/es/oficinas/${SLUG}`,
      },
    },
    ...buildSocialMetadata({
      lang: localeLang,
      path: `/${lang}/oficinas/${SLUG}`,
      title,
      description,
      // Imagen genérica del despacho (1200x630) hasta tener foto de la entrada:
      // ver app/lib/officePhotos.ts.
      images: og ? [{ url: og.url, width: 1200, height: 630, alt: og.alt }] : undefined,
    }),
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';

  // Sin `openingHours`: buildOfficeSchema los descarta para las direcciones
  // virtuales, y pasarlos declararía una sede atendida que no existe.
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: {
        name: `Manuel Solis Law Firm - ${nap.name.en}`,
        address: nap.street,
        city: nap.city,
        state: nap.state,
        zip: nap.zip,
        phone: nap.phone,
        mapUrl: nap.mapLink,
      },
      description: {
        es: `Dirección de Manuel Solís en el Loop de ${nap.city} (W Jackson Blvd) que atiende solo con cita. Inmigración, familia y accidentes.`,
        en: `Manuel Solis by-appointment location in the ${nap.city} Loop (W Jackson Blvd). Immigration, family law, and accident cases.`,
      },
    },
    localeLang,
  );

  const officeFaqs = buildMainOfficeFaqs(SLUG, localeLang);
  const faqSchema = buildFaqPageSchema(officeFaqs, `${SITE_URL}/${lang}/oficinas/${SLUG}`);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: localeLang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: nap.name[localeLang], url: `/${lang}/oficinas/${SLUG}` },
  ]);

  return (
    <>
      <script
        id={`local-schema-${SLUG}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <OfficeClient lang={localeLang} faqs={officeFaqs} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
