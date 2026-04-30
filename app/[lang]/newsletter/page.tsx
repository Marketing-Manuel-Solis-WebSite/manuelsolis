import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewsletterSignup from '../../components/NewsletterSignup';
import { newsletters } from '../../lib/newsletterData';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs
      ? 'Newsletter de Inmigración'
      : 'Immigration Newsletter',
    description: isEs
      ? 'Suscríbete a nuestro newsletter gratuito de inmigración. Recibe actualizaciones sobre TPS, DACA, VAWA, cambios de política migratoria y consejos legales de nuestros abogados.'
      : 'Subscribe to our free immigration newsletter. Get updates on TPS, DACA, VAWA, immigration policy changes, and legal tips from our attorneys.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/newsletter`,
      languages: {
        es: `${SITE_URL}/es/newsletter`,
        en: `${SITE_URL}/en/newsletter`,
        'x-default': `${SITE_URL}/es/newsletter`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Newsletter de Inmigración | Manuel Solis Law'
        : 'Immigration Newsletter | Manuel Solis Law',
      description: isEs
        ? 'Actualizaciones legales de inmigración directamente en tu correo'
        : 'Immigration legal updates delivered to your inbox',
      url: `${SITE_URL}/${lang}/newsletter`,
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      type: 'website',
    },
  };
}

export default async function NewsletterPage({ params }: Props) {
  const { lang } = await params;
  const isEs = lang === 'es';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: 'Newsletter', url: `${SITE_URL}/${lang}/newsletter` },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEs ? 'Newsletter de Inmigración' : 'Immigration Newsletter',
    description: isEs
      ? 'Archivo de newsletters sobre leyes de inmigración y actualizaciones legales'
      : 'Archive of newsletters about immigration law and legal updates',
    url: `${SITE_URL}/${lang}/newsletter`,
    publisher: {
      '@type': 'LegalService',
      name: 'Manuel Solis Law Firm',
      url: SITE_URL,
    },
    hasPart: newsletters.map((nl) => ({
      '@type': 'NewsArticle',
      headline: nl.title[isEs ? 'es' : 'en'],
      datePublished: nl.date,
      url: `${SITE_URL}/${lang}/newsletter/${nl.slug}`,
    })),
  };

  const t = {
    title: isEs ? 'Newsletter de Inmigración' : 'Immigration Newsletter',
    subtitle: isEs
      ? 'Mantente al día con las últimas noticias y cambios en leyes migratorias. Nuestros abogados comparten información crucial cada mes.'
      : 'Stay up to date with the latest news and changes in immigration law. Our attorneys share crucial information every month.',
    pastEditions: isEs ? 'Ediciones Anteriores' : 'Past Editions',
    readMore: isEs ? 'Leer edición completa' : 'Read full edition',
    subscribeTitle: isEs ? 'No te pierdas ninguna edición' : "Don't miss any edition",
  };

  return (
    <>
      <Script
        id="newsletter-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="newsletter-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-[#001540]">
        {/* Hero */}
        <section className="relative pt-[160px] pb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B2904D]/15 blur-[80px] rounded-full opacity-20" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6 backdrop-blur-md">
              <span className="text-sm font-medium text-[#B2904D]">
                {isEs ? '📬 Actualización mensual' : '📬 Monthly update'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg text-blue-200/60 max-w-2xl mx-auto mb-10">
              {t.subtitle}
            </p>

            {/* Inline signup */}
            <div className="max-w-lg mx-auto">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </section>

        {/* Past Editions */}
        <section className="relative pb-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
              {t.pastEditions}
            </h2>

            <div className="grid gap-6 md:gap-8">
              {newsletters.map((nl, index) => {
                const title = nl.title[isEs ? 'es' : 'en'];
                const desc = nl.description[isEs ? 'es' : 'en'];
                const topics = nl.topics[isEs ? 'es' : 'en'];
                const dateFormatted = new Date(nl.date).toLocaleDateString(
                  isEs ? 'es-US' : 'en-US',
                  { year: 'numeric', month: 'long' },
                );

                return (
                  <Link
                    key={nl.slug}
                    href={`/${lang}/newsletter/${nl.slug}`}
                    className="group block"
                  >
                    <article className="relative rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="text-sm text-[#B2904D] font-medium">
                            {dateFormatted}
                          </span>
                          {topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-xs px-2.5 py-1 rounded-full bg-[#B2904D]/10 text-[#B2904D]/70 border border-[#B2904D]/20"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#B2904D] transition-colors leading-tight">
                          {title}
                        </h3>

                        <p className="text-blue-200/50 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                          {desc}
                        </p>

                        <span className="inline-flex items-center gap-1.5 text-sm text-[#B2904D] font-medium group-hover:gap-3 transition-all">
                          {t.readMore}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
