import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NewsletterSignup from '../../../components/NewsletterSignup';
import { getNewsletterBySlug, getAllNewsletterSlugs, NEWSLETTER_IMAGE } from '../../../lib/newsletterData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import { ORG_REF } from '../../../lib/schemaOrg';
import { Stagger, StaggerItem } from '../../../components/motion';

const SITE_URL = 'https://www.manuelsolis.com';

/**
 * Firma del boletín. Las ediciones no llevan autor individual —las escribe el
 * despacho, no un abogado concreto—, así que `author` y `publisher` referencian
 * por @id el nodo Organization que el layout emite en todas las páginas, en vez
 * de declarar aquí una entidad anónima que Google contaría como otra empresa.
 */
const PUBLISHING_ORG = ORG_REF;

type Bilingual = { es: string; en: string };

/**
 * Versiones cortas del título (y, donde hacía falta, de la description) para
 * las SERPs. Los valores de `newsletterData` se renderizan como H1 y entradilla
 * visibles de la edición, y con el sufijo de marca del layout llegaban a 90
 * caracteres. Estas solo las ve el buscador; el cuerpo sigue mostrando el
 * título completo. Un slug sin entrada usa su título tal cual.
 */
const SEO_OVERRIDES: Record<string, { title: Bilingual; description?: Bilingual }> = {
  'abril-2026-actualizaciones-migratorias': {
    title: {
      es: 'TPS y DACA: Cambios Migratorios Abril 2026',
      en: 'TPS and DACA: Immigration Changes April 2026',
    },
    description: {
      es: 'Últimos cambios en políticas migratorias, extensiones de TPS, actualizaciones de DACA y consejos legales para proteger tu estatus en Estados Unidos.',
      en: 'Learn about the latest immigration policy changes, TPS extensions, DACA updates, and legal tips to protect your status in the United States.',
    },
  },
  'febrero-2026-visa-u-vawa-protecciones': {
    title: {
      es: 'Visa U y VAWA: Protección para Víctimas',
      en: 'U Visa and VAWA: Protection for Crime Victims',
    },
  },
  'marzo-2026-derechos-laborales-inmigrantes': {
    title: {
      es: 'Derechos Laborales para Inmigrantes en 2026',
      en: 'Labor Rights for Immigrants in 2026',
    },
    description: {
      es: 'Conoce tus derechos laborales como inmigrante en EE.UU.: permisos de trabajo, protecciones contra el abuso laboral y cómo reportar violaciones.',
      en: 'Know your labor rights as an immigrant in the United States: work permits, protections against workplace abuse, and how to report violations.',
    },
  },
};

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllNewsletterSlugs();
  return slugs.flatMap((slug) => [
    { lang: 'es', slug },
    { lang: 'en', slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const nl = getNewsletterBySlug(slug);
  if (!nl) return {};

  const isEs = lang === 'es';
  const locale = isEs ? 'es' : 'en';
  const seo = SEO_OVERRIDES[slug];
  const title = seo?.title[locale] ?? nl.title[locale];
  const description = seo?.description?.[locale] ?? nl.description[locale];

  return {
    // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/newsletter/${slug}`,
      languages: {
        es: `${SITE_URL}/es/newsletter/${slug}`,
        en: `${SITE_URL}/en/newsletter/${slug}`,
        'x-default': `${SITE_URL}/es/newsletter/${slug}`,
      },
    },
    ...buildSocialMetadata({
      lang: locale,
      path: `/${lang}/newsletter/${slug}`,
      // En redes gana el título completo de la edición: ahí no hay límite de
      // 60 caracteres y el recorte solo existe para las SERPs.
      title: nl.title[locale],
      description: nl.description[locale],
      type: 'article',
      publishedTime: nl.date,
      images: [{ url: NEWSLETTER_IMAGE, width: 1200, height: 630, alt: nl.title[locale] }],
    }),
  };
}

export default async function NewsletterEditionPage({ params }: Props) {
  const { lang, slug } = await params;
  const nl = getNewsletterBySlug(slug);
  if (!nl) notFound();

  const isEs = lang === 'es';
  const title = nl.title[isEs ? 'es' : 'en'];
  const description = nl.description[isEs ? 'es' : 'en'];
  const topics = nl.topics[isEs ? 'es' : 'en'];
  const sections = nl.content[isEs ? 'es' : 'en'];

  // `timeZone: 'UTC'` (mismo criterio que BlogCard): `nl.date` es una fecha de
  // calendario y se parsea como medianoche UTC, así que sin fijar la zona el
  // build la formateaba en la del servidor y restaba un día — la edición de
  // abril salía fechada "31 de marzo de 2026", en contra de su datePublished.
  const dateFormatted = new Date(nl.date).toLocaleDateString(
    isEs ? 'es-US' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: 'Newsletter', url: `${SITE_URL}/${lang}/newsletter` },
    { name: title, url: `${SITE_URL}/${lang}/newsletter/${slug}` },
  ]);

  // `Article` y no `NewsArticle`: NewsArticle describe la pieza de un medio de
  // noticias, y esto es el boletín mensual del despacho — recopila actualidad
  // migratoria, pero la mezcla con orientación legal y CTAs de consulta, y lo
  // publica un LegalService, no una redacción. Google pide las mismas
  // propiedades a los dos tipos, así que precisar el tipo no cuesta nada.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    // Mismo @id que usa el índice /newsletter en su hasPart: una sola entidad
    // por edición en el grafo, en vez de dos fichas parciales de lo mismo.
    '@id': `${SITE_URL}/${lang}/newsletter/${slug}#article`,
    headline: title,
    description,
    datePublished: nl.date,
    dateModified: nl.date,
    url: `${SITE_URL}/${lang}/newsletter/${slug}`,
    inLanguage: isEs ? 'es' : 'en',
    image: [`${SITE_URL}${NEWSLETTER_IMAGE}`],
    publisher: PUBLISHING_ORG,
    author: PUBLISHING_ORG,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/newsletter/${slug}`,
    },
    keywords: topics.join(', '),
    articleSection: 'Immigration Law',
    about: topics.map((t) => ({ '@type': 'Thing', name: t })),
  };

  return (
    <>
      <script
        id="newsletter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="newsletter-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#001540]">
        {/* Hero */}
        <section className="relative pt-[160px] pb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B2904D]/15 blur-[80px] rounded-full opacity-20" />

          <div className="relative z-10 max-w-3xl mx-auto px-4">
            {/* Back link */}
            <Link
              href={`/${lang}/newsletter`}
              className="inline-flex items-center gap-2 text-sm text-[#B2904D] hover:text-[#c9a85e] transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              {isEs ? 'Todas las ediciones' : 'All editions'}
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-sm text-[#B2904D] font-medium">{dateFormatted}</span>
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-2.5 py-1 rounded-full bg-[#B2904D]/10 text-[#B2904D]/70 border border-[#B2904D]/20"
                >
                  {topic}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {title}
            </h1>

            <p className="text-lg text-blue-200/60 leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="relative pb-16">
          <div className="max-w-3xl mx-auto px-4">
            <Stagger gap={0.08} className="space-y-10" amount={0.1}>
              {sections.map((section, idx) => (
                <StaggerItem
                  as="article"
                  key={idx}
                  className="relative pl-6 border-l-2 border-[#B2904D]/20 hover:border-[#B2904D]/50 transition-colors"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                    {section.heading}
                  </h2>
                  <p className="text-blue-200/60 leading-relaxed text-base md:text-lg">
                    {section.body}
                  </p>
                  {section.cta && (
                    <Link
                      href={section.cta.href}
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-[#B2904D]/10 border border-[#B2904D]/30 text-[#B2904D] text-sm font-medium hover:bg-[#B2904D]/20 transition-all"
                    >
                      {section.cta.text}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </StaggerItem>
              ))}
            </Stagger>

            {/* Separator */}
            <div className="my-16 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D]/30 to-transparent" />

            {/* Newsletter CTA */}
            <NewsletterSignup variant="banner" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
