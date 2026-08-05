import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { getPageData, getSiblingCities, getRelatedServiceLinks, SITE_URL } from '../../lib/cityServiceData';
import { getLocalFAQ, getTypicalCases } from '../../lib/cityServiceLocalContent';
import { buildLandingSchema, LANDING_TO_OFFICE_FOR_REVIEWS } from '../../lib/landingSchema';
import CityServiceLanding from '../../components/CityServiceLanding';
import { buildSocialMetadata } from '../../lib/seoMetadata';

const PAGE_SLUG = 'abogado-inmigracion-harlingen';
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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/${PAGE_SLUG}`,
      title,
      description,
    }),
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

  const legalServiceSchema = await buildLandingSchema({
    pageSlug: PAGE_SLUG,
    lang: currentLang,
    officeSlugForReviews: LANDING_TO_OFFICE_FOR_REVIEWS[PAGE_SLUG],
  });

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
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script id="legal-service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      {faqPageSchema && (
        <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      )}
      <CityServiceLanding
        lang={currentLang}
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
