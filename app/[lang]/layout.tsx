import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import ConsultaFloatingCta from '../components/ConsultaFloatingCta';
import AIChatButton from '../components/AIChatButton';
import MobileStickyBar from '../components/MobileStickyBar';
import PageViewTracker from '../components/PageViewTracker';
import type { Language } from '../lib/translations';
import Script from 'next/script';
import { LangSetter } from '../components/LangSetter';
import MotionProvider from '../components/MotionProvider';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPlaceData } from '../lib/googleReviews';
import { MAIN_FIRM_PLACE_ID } from '../lib/officesRegistry';

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

const SITE_URL = 'https://www.manuelsolis.com';

// ISR: regenerate the [lang] subtree every 24h so the Google Places
// aggregateRating embedded in the Organization JSON-LD stays fresh in the
// statically-rendered HTML. Paired with removing headers() from the root
// layout, this returns the [lang] routes to static/ISR (was ƒ Dynamic).
// Matches the 24h unstable_cache TTL in lib/googleReviews.ts.
export const revalidate = 86400;

// Analytics IDs sourced from environment so they can be rotated/disabled
// without touching code. Each script renders only when its ID is set.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'LawFirm'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Manuel Solis Law Firm',
  alternateName: ['Abogados Manuel Solis', 'Law Offices of Manuel Solis'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo-manuel-solis.png`,
  image: `${SITE_URL}/home-image.jpg`,
  foundingDate: '1990',
  slogan: 'Defending immigrant rights for over 35 years',
  knowsAbout: [
    'Immigration Law',
    'Deportation Defense',
    'Personal Injury',
    'Criminal Defense',
    'Family Law',
    'Insurance Claims',
    'Asylum',
    'U Visa',
    'VAWA',
    'T Visa',
    'Cancellation of Removal',
    'Advance Parole',
    'Form I-918',
    'Form I-360 VAWA Self-Petition',
    'Humanitarian Visas',
    'Violence Against Women Act',
    'U Nonimmigrant Status',
    'T Nonimmigrant Status',
    'Immigration and Nationality Act Section 240A(b)',
    'Bona Fide Determination',
    'Deferred Action for Childhood Arrivals',
    'Temporary Protected Status',
    'Immigration Court Proceedings',
    'E-2 Investor Visa'
  ],
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Immigration & Legal Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Immigration Law', description: 'Complete immigration services including family petitions, work permits, green cards, citizenship, and humanitarian visas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'U Visa', description: 'U Nonimmigrant Status for victims of crime' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VAWA Self-Petition', description: 'Violence Against Women Act protection for abuse victims' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deportation Defense', description: 'Cancellation of removal and defense in immigration court' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Asylum', description: 'Political asylum and refugee protection' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personal Injury', description: 'Car accidents, workplace injuries, and medical malpractice' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Criminal Defense', description: 'Criminal defense with immigration consequences analysis' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Family Law', description: 'Divorce, custody, and family legal matters' } },
    ]
  },
  sameAs: [
    'https://www.facebook.com/AbogadoManuelSolisOficial/',
    'https://twitter.com/AbogadoMSolis',
    'https://www.linkedin.com/company/manuel-solis-law-firm/',
    'https://www.instagram.com/abogadomanuelsolisoficial/',
    'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-888-676-1238',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English', 'Spanish']
  },
  location: [
    { '@type': 'Place', name: 'Houston Principal Office', address: { '@type': 'PostalAddress', streetAddress: '6705 Navigation Blvd', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77011', addressCountry: 'US' }, telephone: '(713) 231-5384' },
    { '@type': 'Place', name: 'Houston North Loop Office', address: { '@type': 'PostalAddress', streetAddress: '2950 N Loop W', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77092', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Houston Bellaire Office', address: { '@type': 'PostalAddress', streetAddress: '9188 Bellaire Blvd E', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77036', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Dallas Office', address: { '@type': 'PostalAddress', streetAddress: '1120 Empire Central Pl', addressLocality: 'Dallas', addressRegion: 'TX', postalCode: '75247', addressCountry: 'US' }, telephone: '(214) 753-8315' },
    { '@type': 'Place', name: 'El Paso Office', address: { '@type': 'PostalAddress', streetAddress: '3632 Admiral St', addressLocality: 'El Paso', addressRegion: 'TX', postalCode: '79925', addressCountry: 'US' }, telephone: '(915) 233-7127' },
    { '@type': 'Place', name: 'Harlingen Office', address: { '@type': 'PostalAddress', streetAddress: '320 E Jackson Ave', addressLocality: 'Harlingen', addressRegion: 'TX', postalCode: '78550', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Chicago Office', address: { '@type': 'PostalAddress', streetAddress: '6000 Cermak Rd', addressLocality: 'Cicero', addressRegion: 'IL', postalCode: '60804', addressCountry: 'US' }, telephone: '(312) 477-0389' },
    { '@type': 'Place', name: 'Los Angeles Office', address: { '@type': 'PostalAddress', streetAddress: '8337 Telegraph Rd Ste 115', addressLocality: 'Pico Rivera', addressRegion: 'CA', postalCode: '90660', addressCountry: 'US' }, telephone: '(213) 784-1554' },
    { '@type': 'Place', name: 'Memphis Office', address: { '@type': 'PostalAddress', streetAddress: '3385 Airways Blvd Suite 320', addressLocality: 'Memphis', addressRegion: 'TN', postalCode: '38116', addressCountry: 'US' }, telephone: '(901) 557-8357' },
    { '@type': 'Place', name: 'Denver/Arvada Office', address: { '@type': 'PostalAddress', streetAddress: '5400 Ward Rd BLDG IV', addressLocality: 'Arvada', addressRegion: 'CO', postalCode: '80002', addressCountry: 'US' }, telephone: '(720) 358-8973' },
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 50
  },
  // aggregateRating and review are populated server-side per request
  // from Google Places API (MAIN_FIRM_PLACE_ID). See LangLayout body.
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Manuel Solis Law Firm',
  alternateName: 'Abogados Manuel Solis',
  url: SITE_URL,
  inLanguage: ['en', 'es'],
  publisher: {
    '@type': 'LawFirm',
    '@id': `${SITE_URL}/#organization`,
    name: 'Manuel Solis Law Firm'
  }
};

// VideoObject schema moved to /testimonios page where the video lives.
// Having it in the layout made it appear on every page incorrectly.

// NUEVO: Configuración de Viewport separada (Corrige el error de build)
export const viewport: Viewport = {
  themeColor: '#051120',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const isEs = currentLang === 'es';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEs
        ? 'Abogados de Inmigración | Manuel Solís'
        : 'Immigration Lawyers | Manuel Solis',
      template: isEs
        ? '%s | Manuel Solís'
        : '%s | Manuel Solis',
    },
    description: isEs
      ? 'Abogados de inmigración con 35+ años de experiencia y 50,000+ casos ganados. Oficinas en Houston, Dallas, Chicago, Los Angeles y más.'
      : 'Immigration lawyers with 35+ years of experience and 50,000+ cases won. Offices in Houston, Dallas, Chicago, Los Angeles and more.',
    keywords: isEs
      ? [
          // Tier 1 — máximo valor comercial / volumen
          'abogado de inmigración',
          'abogado de inmigración cerca de mí',
          'abogado de inmigración en Houston',
          'abogado de inmigración en Dallas',
          'abogado de inmigración en Chicago',
          'abogado de inmigración en Los Ángeles',
          // Tier 2 — intención alta y transaccional
          'abogado de accidentes',
          'abogado de accidentes de auto',
          'defensa deportación',
          'cancelación de deportación',
          'abogado de deportación',
          'Visa U abogado',
          'VAWA abogado',
          'asilo político abogado',
          'Visa U Bona Fide',
          'abogado VAWA hombres',
          // Tier 3 — marca / long tail
          'Manuel Solís',
          'Manuel Solis abogado',
          'abogado hispano',
          'abogado que habla español',
          'abogado bilingüe',
          'formulario I-918',
          'formulario I-360 VAWA',
          'formulario I-601A',
          'permiso de trabajo',
          'residencia permanente',
          'ciudadanía americana',
          'green card',
          'DACA',
          'TPS'
        ]
      : [
          // Tier 1
          'immigration lawyer',
          'immigration attorney near me',
          'immigration lawyer Houston',
          'immigration lawyer Dallas',
          'immigration lawyer Chicago',
          'immigration lawyer Los Angeles',
          // Tier 2
          'accident attorney',
          'car accident lawyer',
          'deportation defense',
          'cancellation of removal',
          'deportation lawyer',
          'U Visa attorney',
          'VAWA attorney',
          'asylum lawyer',
          'U Visa Bona Fide',
          'VAWA for men',
          // Tier 3
          'Manuel Solis',
          'Manuel Solis law firm',
          'Hispanic lawyer',
          'Spanish-speaking attorney',
          'bilingual lawyer',
          'Form I-918',
          'Form I-360 VAWA',
          'Form I-601A',
          'work permit',
          'permanent residency',
          'US citizenship',
          'green card',
          'DACA',
          'TPS'
        ],
    authors: [{ name: 'Manuel Solis Law Firm' }],
    creator: 'Manuel Solis',
    publisher: 'Manuel Solis Law Firm',
    
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#009b3a' },
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
    
    // Eliminado themeColor de aquí (movido a export const viewport)
    
    openGraph: {
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/home-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Manuel Solis Law Firm',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      creator: '@AbogadoMSolis',
      images: ['/home-image.jpg'],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // alternates (canonical + hreflang) are set per-page, not in layout,
    // to avoid child pages inheriting the wrong canonical URL.
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';

  // Pull live aggregateRating + top reviews from Google Places (24h
  // cache). If the API key is missing OR the request fails, mainPlaceData
  // is null and the rendered schema simply omits aggregateRating and
  // review — never falls back to hardcoded data so we don't reintroduce
  // the legal risk we're solving (DISCOVERY_v3 §1.1 #5).
  const mainPlaceData = await getPlaceData(MAIN_FIRM_PLACE_ID);
  const finalOrganizationSchema: Record<string, unknown> = {
    ...organizationSchema,
    ...(mainPlaceData && mainPlaceData.userRatingCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: mainPlaceData.rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: mainPlaceData.userRatingCount,
        reviewCount: mainPlaceData.userRatingCount,
      },
    }),
    ...(mainPlaceData?.reviews?.length && {
      review: mainPlaceData.reviews.slice(0, 3).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.authorName },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
        },
        reviewBody: r.text,
        datePublished: r.publishedAt,
      })),
    }),
  };

  return (
    <>
      <LangSetter lang={currentLang} />

      {/* Preconnect to critical third-party origins — hoisted to <head> by Next.js */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://img.youtube.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      <link rel="dns-prefetch" href="https://analytics.tiktok.com" />

      {/* RSS Feed for newsletter (SEO + feed readers) */}
      <link rel="alternate" type="application/rss+xml" title="Newsletter - Manuel Solis Law" href={`${SITE_URL}/rss/newsletter`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalOrganizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {GA_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
            }}
          />
        </>
      )}

      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {TIKTOK_PIXEL_ID && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

                ttq.load('${TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}

      <noscript>
        {META_PIXEL_ID && (
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
            aria-hidden="true"
          />
        )}
      </noscript>

      <LanguageProvider initialLanguage={currentLang}>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <MotionProvider>
          {children}
          <WhatsAppButton />
          <ConsultaFloatingCta />
          <AIChatButton />
          <MobileStickyBar />
        </MotionProvider>

        <Analytics />
        <SpeedInsights />

      </LanguageProvider>
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}