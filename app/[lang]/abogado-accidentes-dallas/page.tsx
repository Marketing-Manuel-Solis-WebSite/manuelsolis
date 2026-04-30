import type { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { getPageData, getSiblingCities, getRelatedServiceLinks, SITE_URL } from '../../lib/cityServiceData';
import { getLocalFAQ, getTypicalCases } from '../../lib/cityServiceLocalContent';
import CityServiceLanding from '../../components/CityServiceLanding';

const PAGE_SLUG = 'abogado-accidentes-dallas';
const data = getPageData(PAGE_SLUG)!;
const { config, office, service } = data;

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = config.metaTitle[isEs ? 'es' : 'en'];
  const description = config.metaDescription[isEs ? 'es' : 'en'];

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${PAGE_SLUG}`,
      languages: {
        es: `${SITE_URL}/es/${PAGE_SLUG}`,
        en: `${SITE_URL}/en/${PAGE_SLUG}`,
        'x-default': `${SITE_URL}/es/${PAGE_SLUG}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${PAGE_SLUG}`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{ url: `${SITE_URL}/home-image.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/home-image.jpg`],
      creator: '@AbogadoMSolis',
    },
    keywords: isEs ? service.keywords.es : service.keywords.en,
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = lang === 'es' || lang === 'en' ? lang : 'es';
  const isEs = currentLang === 'es';

  const breadcrumbData = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: isEs ? 'Servicios' : 'Services', url: `/${currentLang}/servicios` },
    { name: config.h1[currentLang], url: `/${currentLang}/${PAGE_SLUG}` },
  ]);

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Manuel Solis - ${service.title[currentLang]}`,
    description: config.metaDescription[currentLang],
    url: `${SITE_URL}/${currentLang}/${PAGE_SLUG}`,
    telephone: office.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.address.split(',')[0],
      addressLocality: office.city,
      addressRegion: office.stateCode,
      postalCode: office.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: office.coordinates.lat, longitude: office.coordinates.lng },
    areaServed: { '@type': 'City', name: office.city },
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
    ],
    parentOrganization: { '@type': 'LawFirm', '@id': `${SITE_URL}/#organization`, name: 'Manuel Solis Law Firm' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', bestRating: '5', worstRating: '1', ratingCount: '12', reviewCount: '12' },
  };

  const localFAQ = getLocalFAQ(config, office, service);
  const typicalCases = getTypicalCases(config, office, service);
  const relatedServiceLinks = getRelatedServiceLinks(PAGE_SLUG);

  const faqPageSchema = localFAQ.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localFAQ.map((item) => ({
      '@type': 'Question',
      name: item.question[currentLang],
      acceptedAnswer: { '@type': 'Answer', text: item.answer[currentLang] },
    })),
  } : null;

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <Script id="legal-service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      {faqPageSchema && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      )}
      <CityServiceLanding
        config={config}
        office={office}
        service={service}
        siblingCities={getSiblingCities(PAGE_SLUG)}
        localFAQ={localFAQ}
        typicalCases={typicalCases}
        relatedServiceLinks={relatedServiceLinks}
      />
    </>
  );
}
