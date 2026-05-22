import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin, Phone, Building2, ChevronDown } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { Reveal, Stagger, StaggerItem } from '../../components/motion';

// ISR: contenido prácticamente estático; regenerar cada 24h
export const revalidate = 86400;

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

interface CityGroup {
  city: { es: string; en: string };
  offices: Office[];
}

interface StateGroup {
  state: { es: string; en: string };
  cityGroups?: CityGroup[];
  offices: Office[];
}

const OFFICE_GROUPS: StateGroup[] = [
  {
    state: { es: 'Texas', en: 'Texas' },
    cityGroups: [
      {
        city: { es: 'Houston', en: 'Houston' },
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
            name: { es: 'Houston Accidentes', en: 'Houston Accidents' },
            slug: 'houston-accidentes',
            address: '6705 Navigation Blvd',
            city: 'Houston',
            state: 'TX',
            zip: '77011',
            phone: '(713) 231-5384',
          },
          {
            name: { es: 'Bellaire', en: 'Bellaire' },
            slug: 'houston-bellaire',
            address: '6220 Westpark Dr Suite 100',
            city: 'Houston',
            state: 'TX',
            zip: '77057',
            phone: '(832) 598-0914',
          },
          {
            name: { es: 'Kirby', en: 'Kirby' },
            slug: 'kirby',
            address: '3730 Kirby Dr Suite 1200',
            city: 'Houston',
            state: 'TX',
            zip: '77098',
            phone: '(713) 903-7875',
          },
          {
            name: { es: 'League City', en: 'League City' },
            slug: 'league-city',
            address: '350 W Bay Area Blvd',
            city: 'Webster',
            state: 'TX',
            zip: '77598',
            phone: '(832) 598-3782',
          },
          {
            name: { es: 'Main St', en: 'Main St' },
            slug: 'main-st',
            address: '2500 Main St',
            city: 'Houston',
            state: 'TX',
            zip: '77002',
            phone: '(713) 842-9575',
          },
          {
            name: { es: 'North Loop', en: 'North Loop' },
            slug: 'north-loop',
            address: '5801 North Loop East',
            city: 'Houston',
            state: 'TX',
            zip: '77026',
            phone: '(713) 429-0237',
          },
          {
            name: { es: 'Northchase', en: 'Northchase' },
            slug: 'northchase',
            address: '530 Northchase Dr',
            city: 'Houston',
            state: 'TX',
            zip: '77060',
            phone: '(346) 522-4848',
          },
        ],
      },
    ],
    offices: [
      {
        name: { es: 'Dallas', en: 'Dallas' },
        slug: 'dallas',
        address: '8150 N Central Expressway Suite 500',
        city: 'Dallas',
        state: 'TX',
        zip: '75206',
        phone: '(214) 753-8315',
      },
      {
        name: { es: 'El Paso', en: 'El Paso' },
        slug: 'el-paso',
        address: '221 N Kansas St Suite 700',
        city: 'El Paso',
        state: 'TX',
        zip: '79901',
        phone: '(915) 233-7127',
      },
      {
        name: { es: 'Harlingen', en: 'Harlingen' },
        slug: 'harlingen',
        address: '1800 S 77 Sunshine Strip',
        city: 'Harlingen',
        state: 'TX',
        zip: '78550',
        phone: '(956) 597-7090',
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
        phone: '(213) 784-1554',
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
        phone: '(312) 477-0389',
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
        phone: '(720) 358-8973',
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
        phone: '(901) 557-8357',
      },
    ],
  },
];

// --- SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Nuestras Oficinas en 5 Estados'
    : 'Our Offices in 5 States';

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
        <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8">
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
                <Reveal variant="up" className="flex items-center gap-3 mb-8" amount={0.4}>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/60 to-transparent" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#B2904D] whitespace-nowrap">
                    {group.state[currentLang]}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/60 to-transparent" />
                </Reveal>

                {/* City Groups (e.g., Houston) */}
                {group.cityGroups?.map((cityGroup) => (
                  <details key={cityGroup.city.en} open className="mb-10 group/city [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer flex items-center gap-3 mb-6 select-none">
                      <ChevronDown className="w-5 h-5 text-[#B2904D] transition-transform duration-300 group-open/city:rotate-180 flex-shrink-0" />
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {cityGroup.city[currentLang]}
                      </h3>
                      <span className="text-sm text-white/40 font-normal">
                        ({cityGroup.offices.length} {isEs ? 'oficinas' : 'offices'})
                      </span>
                    </summary>
                    <Stagger gap={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-2 sm:pl-8" amount={0.1}>
                      {cityGroup.offices.map((office) => (
                        <StaggerItem
                          as="div"
                          key={office.slug}
                          className="card-3d group/card bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#B2904D]/40 transition-all duration-300"
                        >
                          <Link href={`/${currentLang}/oficinas/${office.slug}`} className="block mb-3">
                            <h4 className="text-xl font-semibold text-white mb-4 group-hover/card:text-[#B2904D] transition-colors">
                              {office.name[currentLang]}
                            </h4>
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                              <span className="text-white/70 text-sm leading-relaxed">
                                {office.address}, {office.city} {office.state} {office.zip}
                              </span>
                            </div>
                          </Link>
                          <a
                            href={`tel:+1${office.phone.replace(/[^0-9]/g, '')}`}
                            className="flex items-center gap-3 text-white/70 hover:text-[#B2904D] transition-colors"
                          >
                            <Phone className="w-5 h-5 text-[#B2904D] flex-shrink-0" />
                            <span className="text-sm">{office.phone}</span>
                          </a>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </details>
                ))}

                {/* Standalone Office Cards */}
                {group.offices.length > 0 && (
                  <Stagger gap={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
                    {group.offices.map((office) => (
                      <StaggerItem
                        as="div"
                        key={office.slug}
                        className="card-3d group/card bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#B2904D]/40 transition-all duration-300"
                      >
                        <Link href={`/${currentLang}/oficinas/${office.slug}`} className="block mb-3">
                          <h3 className="text-xl font-semibold text-white mb-4 group-hover/card:text-[#B2904D] transition-colors">
                            {office.name[currentLang]}
                          </h3>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                            <span className="text-white/70 text-sm leading-relaxed">
                              {office.address}, {office.city} {office.state} {office.zip}
                            </span>
                          </div>
                        </Link>
                        <a
                          href={`tel:+1${office.phone.replace(/[^0-9]/g, '')}`}
                          className="flex items-center gap-3 text-white/70 hover:text-[#B2904D] transition-colors"
                        >
                          <Phone className="w-5 h-5 text-[#B2904D] flex-shrink-0" />
                          <span className="text-sm">{office.phone}</span>
                        </a>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ContactForm lang={currentLang} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
