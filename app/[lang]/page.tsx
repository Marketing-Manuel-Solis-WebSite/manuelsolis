import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  const description = isEs
    ? 'Más de 35 años defendiendo los derechos de inmigrantes. 50,000+ casos ganados. Inmigración, accidentes, ley criminal y familia. Consulta gratis. Oficinas en Houston, Dallas, Chicago, LA y más.'
    : 'Over 35 years defending immigrant rights. 50,000+ cases won. Immigration, accidents, criminal defense & family law. Free consultation. Offices in Houston, Dallas, Chicago, LA & more.';

  return {
    title: { absolute: isEs
      ? 'Manuel Solís — Abogados de Inmigración y Accidentes | Houston, TX'
      : 'Manuel Solis — Immigration & Accident Attorneys | Houston, TX',
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
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}`,
      type: 'website',
      images: [
        {
          url: '/home-image.jpg',
          width: 1200,
          height: 630,
          alt: isEs
            ? 'Oficinas Legales de Manuel Solís'
            : 'Manuel Solis Law Offices',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
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

const Offices = dynamic(() => import('../components/Offices'), {
  loading: () => <div className="w-full h-[800px] bg-[#001540]" />
});

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]" />
});

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#001540] grain">
      <Hero />
      <Header />
      <div className="content-auto">
        <About />
      </div>
      <div className="content-auto">
        <Services />
      </div>
      <div className="content-auto">
        <Testimonials />
      </div>
      <div className="content-auto">
        <Team />
      </div>
      <div className="content-auto">
        <Offices />
      </div>
      <div className="content-auto">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
