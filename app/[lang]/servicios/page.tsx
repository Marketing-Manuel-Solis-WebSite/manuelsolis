import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Scale, Car, ShieldCheck, Heart, FileText, TrendingUp } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SITE_URL = 'https://www.manuelsolis.com';

// --- SERVICE DATA ---
const SERVICES = [
  {
    slug: 'inmigracion',
    icon: Scale,
    title: { es: 'Inmigración y Defensa de Deportación', en: 'Immigration & Deportation Defense' },
    desc: {
      es: 'Defensa contra deportación, asilo, Visa U, VAWA, residencia y ciudadanía.',
      en: 'Deportation defense, asylum, U Visa, VAWA, residency and citizenship.',
    },
  },
  {
    slug: 'accidentes',
    icon: Car,
    title: { es: 'Accidentes y Lesiones Personales', en: 'Accidents & Personal Injury' },
    desc: {
      es: 'Accidentes de auto, camiones, trabajo y negligencia médica.',
      en: 'Car, truck, workplace accidents and medical negligence.',
    },
  },
  {
    slug: 'ley-criminal',
    icon: ShieldCheck,
    title: { es: 'Defensa Criminal', en: 'Criminal Defense' },
    desc: {
      es: 'DUI/DWI, delitos menores, felonías y apelaciones.',
      en: 'DUI/DWI, misdemeanors, felonies and appeals.',
    },
  },
  {
    slug: 'familia',
    icon: Heart,
    title: { es: 'Derecho de Familia', en: 'Family Law' },
    desc: {
      es: 'Divorcio, custodia, manutención y adopción.',
      en: 'Divorce, custody, child support and adoption.',
    },
  },
  {
    slug: 'seguros',
    icon: FileText,
    title: { es: 'Reclamos de Seguros', en: 'Insurance Claims' },
    desc: {
      es: 'Reclamos denegados, litigios de seguros de auto, salud y vida.',
      en: 'Denied claims, auto, health and life insurance litigation.',
    },
  },
  {
    slug: 'visa-e2',
    icon: TrendingUp,
    title: { es: 'Visa de Inversionista E-2', en: 'E-2 Investor Visa' },
    desc: {
      es: 'Visas para inversionistas y empresarios en EE.UU.',
      en: 'Visas for investors and entrepreneurs in the U.S.',
    },
  },
];

// --- STATIC PARAMS ---
export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

// --- METADATA SEO ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Servicios Legales: Inmigración, Accidentes, Familia y Más'
    : 'Legal Services: Immigration, Accidents, Family & More';

  const description = isEs
    ? 'Conozca todos los servicios legales de Manuel Solís: inmigración, accidentes, defensa criminal, derecho de familia, seguros y Visa E-2. Consulta gratis.'
    : 'Explore all legal services by Manuel Solis: immigration, accidents, criminal defense, family law, insurance claims and E-2 Visa. Free consultation.';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios`,
      languages: {
        es: `${SITE_URL}/es/servicios`,
        en: `${SITE_URL}/en/servicios`,
        'x-default': `${SITE_URL}/es/servicios`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [
        {
          url: `${SITE_URL}/home-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/home-image.jpg`],
      creator: '@AbogadoMSolis',
    },
    keywords: isEs
      ? ['servicios legales', 'abogado inmigración', 'accidentes personales', 'defensa criminal', 'derecho de familia', 'reclamos seguros', 'visa e-2', 'manuel solis']
      : ['legal services', 'immigration lawyer', 'personal injury', 'criminal defense', 'family law', 'insurance claims', 'e-2 visa', 'manuel solis'],
  };
}

// --- PAGE COMPONENT ---
export default async function ServiciosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = lang === 'es' || lang === 'en' ? lang : 'en';
  const isEs = currentLang === 'es';

  const breadcrumbData = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: isEs ? 'Servicios' : 'Services', url: `/${currentLang}/servicios` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />

      <main className="min-h-screen bg-[#001540]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold tracking-widest text-sky-300 uppercase">
              {isEs ? 'Servicios Legales' : 'Legal Services'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {isEs ? 'Nuestros Servicios' : 'Our Services'}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              {isEs
                ? 'Más de 30 años defendiendo los derechos de nuestra comunidad. Encuentre el área legal que necesita.'
                : 'Over 30 years defending our community\'s rights. Find the legal area you need.'}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/${currentLang}/servicios/${service.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:bg-white/10 hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/10"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 transition-colors group-hover:bg-sky-500/25">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {service.title[currentLang]}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {service.desc[currentLang]}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                    {isEs ? 'Ver más' : 'Learn more'}
                    <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-sky-600 to-blue-800 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isEs ? 'Consulta Gratis' : 'Free Consultation'}
            </h2>
            <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-8">
              {isEs
                ? 'Hable hoy con un abogado experimentado. Sin costo y sin compromiso. Estamos listos para ayudarle.'
                : 'Speak with an experienced attorney today. No cost and no obligation. We are ready to help you.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+18325980914"
                className="inline-flex items-center justify-center rounded-full bg-white text-blue-900 font-bold text-lg px-8 py-4 transition-transform hover:scale-105 shadow-lg"
              >
                {isEs ? 'Llamar Ahora: ' : 'Call Now: '}(832) 598-0914
              </a>
              <Link
                href={`/${currentLang}/informacion/nosotros`}
                className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold text-lg px-8 py-4 transition-colors hover:bg-white/10"
              >
                {isEs ? 'Conozca al Equipo' : 'Meet the Team'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
