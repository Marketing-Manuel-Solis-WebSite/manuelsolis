import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import FloatingCtas from '../components/FloatingCtas';
import PageViewTracker, { TrackingSurfaces } from '../components/PageViewTracker';
import AttributionCapture from '../components/AttributionCapture';
import type { Language } from '../lib/translations';
import { OFFICES_NAP } from '../components/officesPhoneMap';
import { LangSetter } from '../components/LangSetter';
import MotionProvider from '../components/MotionProvider';

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

const SITE_URL = 'https://www.manuelsolis.com';

// ISR: regenerate the [lang] subtree every 24h. It is the revalidate that
// the pages reading live Google Places data inherit (office cards, city
// landings, /testimonios), and it matches the 24h unstable_cache TTL in
// lib/googleReviews.ts. Paired with the root layout avoiding headers(),
// this keeps the [lang] routes static/ISR instead of ƒ Dynamic.
export const revalidate = 86400;

// Only the locales returned by generateStaticParams exist: any other
// /{lang}/… (e.g. /fr/servicios) is a framework-level 404 instead of
// silently rendering Spanish content under a non-existent locale.
export const dynamicParams = false;

// Meta Pixel ID for the <noscript> fallback below. The pixel scripts
// themselves live in <TrackingSurfaces/> (client component) so the /admin
// panel can be excluded from every analytics surface.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Sede principal, leída de la fuente única de NAP para no crear otra copia (hay
// un test que compara las fuentes entre sí: __tests__/napConsistency.test.ts).
const HQ = OFFICES_NAP['houston-principal'];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'LawFirm'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Manuel Solis Law Firm',
  alternateName: ['Abogados Manuel Solis', 'Law Offices of Manuel Solis'],
  url: SITE_URL,
  // `address` es obligatoria para LocalBusiness y sus subtipos, y este nodo se
  // emite en las 292 páginas: sin ella la entidad principal del despacho estaba
  // incompleta en todo el sitio. Es la dirección de la sede, no de las 15.
  address: {
    '@type': 'PostalAddress',
    streetAddress: HQ.street,
    addressLocality: HQ.city,
    addressRegion: HQ.state,
    postalCode: HQ.zip,
    addressCountry: 'US',
  },
  telephone: `+1${HQ.phone.replace(/\D/g, '')}`,
  logo: `${SITE_URL}/logo-manuel-solis.png`,
  image: `${SITE_URL}/og-default.jpg`,
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
    { '@type': 'Place', name: 'Houston Principal Office', address: { '@type': 'PostalAddress', streetAddress: '6657 Navigation Blvd', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77011', addressCountry: 'US' }, telephone: '(713) 701-1731' },
    { '@type': 'Place', name: 'Houston Accidentes Office', address: { '@type': 'PostalAddress', streetAddress: '6705 Navigation Blvd', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77011', addressCountry: 'US' }, telephone: '(713) 231-5384' },
    // Nota: las direcciones virtuales (Regus/IWG: north-loop, kirby, main-st,
    // league-city, northchase) se omiten a propósito — ver officesRegistry.ts.
    { '@type': 'Place', name: 'Houston Bellaire Office', address: { '@type': 'PostalAddress', streetAddress: '9188 Bellaire Blvd E', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77036', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Dallas Office', address: { '@type': 'PostalAddress', streetAddress: '1120 Empire Central Pl', addressLocality: 'Dallas', addressRegion: 'TX', postalCode: '75247', addressCountry: 'US' }, telephone: '(214) 753-8315' },
    { '@type': 'Place', name: 'El Paso Office', address: { '@type': 'PostalAddress', streetAddress: '3632 Admiral St', addressLocality: 'El Paso', addressRegion: 'TX', postalCode: '79925', addressCountry: 'US' }, telephone: '(915) 233-7127' },
    { '@type': 'Place', name: 'Harlingen Office', address: { '@type': 'PostalAddress', streetAddress: '320 E Jackson St', addressLocality: 'Harlingen', addressRegion: 'TX', postalCode: '78550', addressCountry: 'US' }, telephone: '(956) 597-7090' },
    { '@type': 'Place', name: 'Chicago Office', address: { '@type': 'PostalAddress', streetAddress: '6000 W Cermak Rd', addressLocality: 'Cicero', addressRegion: 'IL', postalCode: '60804', addressCountry: 'US' }, telephone: '(312) 477-0389' },
    { '@type': 'Place', name: 'Los Angeles Office', address: { '@type': 'PostalAddress', streetAddress: '8337 Telegraph Rd Ste 115', addressLocality: 'Pico Rivera', addressRegion: 'CA', postalCode: '90660', addressCountry: 'US' }, telephone: '(213) 784-1554' },
    { '@type': 'Place', name: 'Memphis Office', address: { '@type': 'PostalAddress', streetAddress: '3385 Airways Blvd Suite 320', addressLocality: 'Memphis', addressRegion: 'TN', postalCode: '38116', addressCountry: 'US' }, telephone: '(901) 557-8357' },
    { '@type': 'Place', name: 'Denver/Arvada Office', address: { '@type': 'PostalAddress', streetAddress: '5400 Ward Rd BLDG IV', addressLocality: 'Arvada', addressRegion: 'CO', postalCode: '80002', addressCountry: 'US' }, telephone: '(720) 358-8973' },
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 50
  },
  // No aggregateRating / review here: Google does not accept third-party
  // (Google Places) reviews nor self-serving reviews in Organization /
  // LocalBusiness markup, and none of it is rendered on the page.
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
          url: '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'Manuel Solis Law Firm',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      creator: '@AbogadoMSolis',
      images: ['/og-default.jpg'],
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

  return (
    <>
      <LangSetter lang={currentLang} />

      {/* Preconnect to critical third-party origins — hoisted to <head> by Next.js */}
      {/* dns-prefetch (no preconnect): GA carga lazyOnload y YouTube solo
          existe en el facade click-to-play de About/Testimonios — un
          preconnect sitewide compite con la conexión del LCP. */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://img.youtube.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      <link rel="dns-prefetch" href="https://analytics.tiktok.com" />

      {/* RSS Feed for newsletter (SEO + feed readers) */}
      <link rel="alternate" type="application/rss+xml" title="Newsletter - Manuel Solis Law" href={`${SITE_URL}/rss/newsletter`} />
      <link rel="alternate" type="application/rss+xml" title="Blog Legal - Manuel Solis Law" href={`${SITE_URL}/rss/blog`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* GA4, Meta Pixel, TikTok, Vercel Analytics y Speed Insights. Es un
          client component porque excluye el panel /admin por pathname. */}
      <TrackingSurfaces />

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
          <AttributionCapture />
        </Suspense>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <MotionProvider>
          {children}
          <FloatingCtas />
        </MotionProvider>
      </LanguageProvider>
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}