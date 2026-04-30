import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NewsletterSignup from '../../../components/NewsletterSignup';
import { getNewsletterBySlug, getAllNewsletterSlugs } from '../../../lib/newsletterData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

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
  const title = nl.title[isEs ? 'es' : 'en'];
  const description = nl.description[isEs ? 'es' : 'en'];

  return {
    title: `${title} | Manuel Solis Law`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/newsletter/${slug}`,
      languages: {
        es: `${SITE_URL}/es/newsletter/${slug}`,
        en: `${SITE_URL}/en/newsletter/${slug}`,
        'x-default': `${SITE_URL}/es/newsletter/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/newsletter/${slug}`,
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      type: 'article',
      publishedTime: nl.date,
    },
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

  const dateFormatted = new Date(nl.date).toLocaleDateString(
    isEs ? 'es-US' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: 'Newsletter', url: `${SITE_URL}/${lang}/newsletter` },
    { name: title, url: `${SITE_URL}/${lang}/newsletter/${slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    datePublished: nl.date,
    dateModified: nl.date,
    url: `${SITE_URL}/${lang}/newsletter/${slug}`,
    inLanguage: isEs ? 'es' : 'en',
    publisher: {
      '@type': 'LegalService',
      name: 'Manuel Solis Law Firm',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-manuel-solis.png`,
      },
    },
    author: {
      '@type': 'Organization',
      name: 'Manuel Solis Law Firm',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/newsletter/${slug}`,
    },
    keywords: topics.join(', '),
    articleSection: 'Immigration Law',
    about: topics.map((t) => ({ '@type': 'Thing', name: t })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.map((s) => ({
      '@type': 'Question',
      name: s.heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: s.body,
      },
    })),
  };

  return (
    <>
      <Script
        id="newsletter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="newsletter-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="newsletter-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-[#001540]">
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
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <article
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
                </article>
              ))}
            </div>

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
