import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin, Phone, Building2 } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// --- CONFIGURACION DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- DATOS DE OFICINAS ---
interface Office {
  name: { es: string; en: string };
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface StateGroup {
  state: { es: string; en: string };
  offices: Office[];
}

const OFFICE_GROUPS: StateGroup[] = [
  {
    state: { es: 'Texas', en: 'Texas' },
    offices: [
      {
        name: { es: 'Houston Principal', en: 'Houston Principal' },
        slug: 'houston-principal',
        address: '6657 Navigation Blvd',
        city: 'Houston',
        state: 'TX',
        zip: '77011',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston Main St', en: 'Houston Main St' },
        slug: 'main-st',
        address: '2500 Main St',
        city: 'Houston',
        state: 'TX',
        zip: '77002',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston North Loop', en: 'Houston North Loop' },
        slug: 'north-loop',
        address: '5801 North Loop East',
        city: 'Houston',
        state: 'TX',
        zip: '77026',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston Northchase', en: 'Houston Northchase' },
        slug: 'northchase',
        address: '530 Northchase Dr',
        city: 'Houston',
        state: 'TX',
        zip: '77060',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston Bellaire', en: 'Houston Bellaire' },
        slug: 'houston-bellaire',
        address: '6220 Westpark Dr Suite 100',
        city: 'Houston',
        state: 'TX',
        zip: '77057',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston Kirby', en: 'Houston Kirby' },
        slug: 'kirby',
        address: '3730 Kirby Dr Suite 1200',
        city: 'Houston',
        state: 'TX',
        zip: '77098',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Houston Accidentes', en: 'Houston Accidents' },
        slug: 'houston-accidentes',
        address: '6705 Navigation Blvd',
        city: 'Houston',
        state: 'TX',
        zip: '77011',
        phone: '(713) 231-5384',
      },
      {
        name: { es: 'League City', en: 'League City' },
        slug: 'league-city',
        address: '350 W Bay Area Blvd',
        city: 'Webster',
        state: 'TX',
        zip: '77598',
        phone: '(713) 701-1731',
      },
      {
        name: { es: 'Dallas', en: 'Dallas' },
        slug: 'dallas',
        address: '8150 N Central Expressway Suite 500',
        city: 'Dallas',
        state: 'TX',
        zip: '75206',
        phone: '(214) 919-0811',
      },
      {
        name: { es: 'El Paso', en: 'El Paso' },
        slug: 'el-paso',
        address: '221 N Kansas St Suite 700',
        city: 'El Paso',
        state: 'TX',
        zip: '79901',
        phone: '(915) 301-0567',
      },
      {
        name: { es: 'Harlingen', en: 'Harlingen' },
        slug: 'harlingen',
        address: '1800 S 77 Sunshine Strip',
        city: 'Harlingen',
        state: 'TX',
        zip: '78550',
        phone: '(956) 521-0178',
      },
    ],
  },
  {
    state: { es: 'California', en: 'California' },
    offices: [
      {
        name: { es: 'Los Angeles', en: 'Los Angeles' },
        slug: 'losangeles',
        address: '811 Wilshire Blvd Suite 1800',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90017',
        phone: '(213) 444-2046',
      },
    ],
  },
  {
    state: { es: 'Illinois', en: 'Illinois' },
    offices: [
      {
        name: { es: 'Chicago', en: 'Chicago' },
        slug: 'chicago',
        address: '150 N Michigan Ave Suite 2800',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        phone: '(312) 414-8738',
      },
    ],
  },
  {
    state: { es: 'Colorado', en: 'Colorado' },
    offices: [
      {
        name: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
        slug: 'arvada',
        address: '5765 Olde Wadsworth Blvd',
        city: 'Arvada',
        state: 'CO',
        zip: '80002',
        phone: '(720) 699-2186',
      },
    ],
  },
  {
    state: { es: 'Tennessee', en: 'Tennessee' },
    offices: [
      {
        name: { es: 'Memphis', en: 'Memphis' },
        slug: 'memphis',
        address: '1661 International Dr Suite 400',
        city: 'Memphis',
        state: 'TN',
        zip: '38120',
        phone: '(901) 295-0031',
      },
    ],
  },
];

// --- SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Nuestras Oficinas | Abogado Manuel Solis'
    : 'Our Offices | Attorney Manuel Solis';

  const description = isEs
    ? 'Encuentre la oficina del Abogado Manuel Solis mas cercana. 15 oficinas en Texas, California, Illinois, Colorado y Tennessee. Abogados de inmigracion y accidentes.'
    : 'Find the nearest Manuel Solis Law Office. 15 offices across Texas, California, Illinois, Colorado, and Tennessee. Immigration and accident attorneys.';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/oficinas`,
      languages: {
        'en': `${SITE_URL}/en/oficinas`,
        'es': `${SITE_URL}/es/oficinas`,
        'x-default': `${SITE_URL}/es/oficinas`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/oficinas`,
      type: 'website',
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: ['/logo-manuel-solis.png'],
    },
  };
}

// --- STATIC PARAMS ---
export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

// --- PAGE COMPONENT ---
export default async function OficinasPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'en';
  const isEs = currentLang === 'es';

  const breadcrumbData = generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: isEs ? 'Oficinas' : 'Offices', url: `/${currentLang}/oficinas` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema-oficinas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />

      <main className="min-h-screen bg-[#001540]">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-[#B2904D]" />
              <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
                {isEs ? '15 Oficinas en 5 Estados' : '15 Offices in 5 States'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {isEs ? 'Nuestras Oficinas' : 'Our Offices'}
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              {isEs
                ? 'Encuentre la oficina del Abogado Manuel Solis mas cercana a usted. Atendemos en Texas, California, Illinois, Colorado y Tennessee.'
                : 'Find the nearest Manuel Solis Law Office. We serve clients in Texas, California, Illinois, Colorado, and Tennessee.'}
            </p>
          </div>
        </section>

        {/* Office Directory */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {OFFICE_GROUPS.map((group) => (
              <div key={group.state.en} className="mb-16">
                {/* State Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/60 to-transparent" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#B2904D] whitespace-nowrap">
                    {group.state[currentLang]}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/60 to-transparent" />
                </div>

                {/* Office Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.offices.map((office) => (
                    <div
                      key={office.slug}
                      className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#B2904D]/40 transition-all duration-300"
                    >
                      {/* Office Name & Address - links to office page */}
                      <Link href={`/${currentLang}/oficinas/${office.slug}`} className="block mb-3">
                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#B2904D] transition-colors">
                          {office.name[currentLang]}
                        </h3>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-sm leading-relaxed">
                            {office.address}, {office.city} {office.state} {office.zip}
                          </span>
                        </div>
                      </Link>

                      {/* Phone - clickable tel: link */}
                      <a
                        href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                        className="flex items-center gap-3 text-white/70 hover:text-[#B2904D] transition-colors"
                      >
                        <Phone className="w-5 h-5 text-[#B2904D] flex-shrink-0" />
                        <span className="text-sm">{office.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#B2904D]/20 to-[#B2904D]/5 border border-[#B2904D]/30 rounded-3xl p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {isEs ? 'Consulta Gratis' : 'Free Consultation'}
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              {isEs
                ? 'Llame a cualquiera de nuestras oficinas para una consulta gratuita con un abogado de inmigracion o accidentes.'
                : 'Call any of our offices for a free consultation with an immigration or accident attorney.'}
            </p>
            <a
              href="tel:7137011731"
              className="inline-flex items-center gap-2 bg-[#B2904D] hover:bg-[#9a7a3e] text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              (713) 701-1731
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
