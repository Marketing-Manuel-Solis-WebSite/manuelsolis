import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FraudWarningBanner from '../components/FraudWarningBanner';
import { buildSocialMetadata } from '../lib/seoMetadata';
import { buildPageVideoSchemas, HOME_PAGE_VIDEOS } from '../lib/videoSchema';

// ISR: regenerar cada hora para mantener fresh sin SSR cost
export const revalidate = 3600;

const SITE_URL = 'https://www.manuelsolis.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Inmigración y Accidentes en Houston, TX'
    : 'Immigration & Accident Attorneys in Houston, TX';

  // 160 caracteres es lo que Google muestra antes de truncar; la anterior tenía
  // 175 y perdía justo el listado de oficinas.
  const description = isEs
    ? 'Abogados de inmigración y accidentes con más de 35 años de experiencia. Oficinas en Houston, Dallas, Chicago, Los Ángeles, Denver y Memphis.'
    : 'Immigration and accident attorneys with over 35 years of experience. Offices in Houston, Dallas, Chicago, Los Angeles, Denver and Memphis.';

  const social = buildSocialMetadata({
    lang: isEs ? 'es' : 'en',
    path: `/${lang}`,
    title,
    description,
    images: [
      {
        url: '/og-default.jpg',
        alt: isEs ? 'Oficinas Legales de Manuel Solís' : 'Manuel Solis Law Offices',
      },
    ],
  });

  return {
    // 60 caracteres: la versión anterior llegaba a 65 y Google la cortaba.
    title: {
      absolute: isEs
        ? 'Abogados de Inmigración y Accidentes | Manuel Solís'
        : 'Immigration & Accident Attorneys | Manuel Solis',
    },
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/es`,
      },
    },
    ...social,
  };
}

const About = dynamic(() => import('../components/About'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Services = dynamic(() => import('../components/Services'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Testimonials = dynamic(() => import('../components/Testimonials'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Team = dynamic(() => import('../components/Team'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const BlogHighlights = dynamic(() => import('../components/BlogHighlights'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

const Offices = dynamic(() => import('../components/Offices'), {
  loading: () => <div className="w-full h-[800px] bg-[#001540]" />
});

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'es';
  // El episodio de "Uniendo Familias" y el testimonio que la portada incrusta
  // son vídeos reales de YouTube: VideoObject los hace elegibles para el
  // carrusel de vídeo de Google.
  const videoSchemas = buildPageVideoSchemas({
    videos: HOME_PAGE_VIDEOS,
    lang: currentLang,
    pagePath: `/${currentLang}`,
  });

  return (
    <div className="min-h-screen bg-[#001540] grain">
      {videoSchemas.map((schema, i) => (
        <script
          key={i}
          id={`home-video-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero lang={currentLang} />
        <FraudWarningBanner lang={currentLang} />
        <div className="content-auto">
          <About lang={currentLang} />
        </div>
        <div className="content-auto">
          <Services lang={currentLang} />
        </div>
        <div className="content-auto">
          <Testimonials lang={currentLang} />
        </div>
        <div className="content-auto">
          <BlogHighlights lang={currentLang} />
        </div>
        <div className="content-auto">
          <Team lang={currentLang} />
        </div>
        <div className="content-auto">
          <Offices lang={currentLang} />
        </div>
        <div className="content-auto">
          <ContactForm lang={currentLang} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
