import type { Metadata } from 'next';
import type { ElementType } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Building2, ChevronDown } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import { VIRTUAL_OFFICE_SLUGS, isVirtualOffice } from '../../lib/officesRegistry';
import { OFFICES_NAP, OFFICE_NAP_SLUGS, type OfficeNapSlug } from '../../components/officesPhoneMap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { Reveal, Stagger, StaggerItem } from '../../components/motion';
import PhoneClickTracker from '../../components/PhoneClickTracker';

// ISR: contenido prácticamente estático; regenerar cada 24h
export const revalidate = 86400;

// --- CONFIGURACION DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- DATOS DE OFICINAS ---
// El NAP (dirección, ciudad, CP, teléfono) NO se copia aquí: se resuelve por
// slug contra OFFICES_NAP para que el índice no pueda divergir del schema de
// cada /oficinas/[slug] ni del explorador del home.
interface CityGroup {
  city: { es: string; en: string };
  slugs: OfficeNapSlug[];
}

interface StateGroup {
  state: { es: string; en: string };
  cityGroups?: CityGroup[];
  slugs: OfficeNapSlug[];
}

const OFFICE_GROUPS: StateGroup[] = [
  {
    state: { es: 'Texas', en: 'Texas' },
    cityGroups: [
      {
        // League City es municipio propio del área de Galveston: no cuenta como
        // oficina de Houston (va con las demás ciudades de Texas).
        city: { es: 'Houston', en: 'Houston' },
        slugs: [
          'houston-principal',
          'houston-accidentes',
          'houston-bellaire',
          'kirby',
          'main-st',
          'north-loop',
          'northchase',
        ],
      },
    ],
    slugs: ['dallas', 'el-paso', 'harlingen', 'league-city'],
  },
  {
    state: { es: 'California', en: 'California' },
    slugs: ['losangeles'],
  },
  {
    state: { es: 'Illinois', en: 'Illinois' },
    cityGroups: [
      {
        // Igual que Houston: las direcciones del área metropolitana se agrupan
        // bajo la ciudad de referencia y se distinguen por su calle, que es
        // como las pidió el despacho. `city` de cada una sigue siendo su
        // municipio real (Schaumburg, Park Ridge, Burr Ridge, Naperville) —
        // esta agrupación es de navegación, no de dirección postal.
        city: { es: 'Chicago', en: 'Chicago' },
        slugs: [
          'chicago',
          'chicago-wacker',
          'chicago-martingale',
          'chicago-prospect',
          'chicago-burr-ridge',
          'chicago-wall',
        ],
      },
    ],
    slugs: [],
  },
  {
    state: { es: 'Colorado', en: 'Colorado' },
    slugs: ['arvada'],
  },
  {
    state: { es: 'Tennessee', en: 'Tennessee' },
    slugs: ['memphis'],
  },
];

// Conteos DERIVADOS del registro, nunca escritos: hoy son 10 oficinas
// atendidas + 10 direcciones que solo abren con cita (VIRTUAL_OFFICE_SLUGS),
// tras dar de alta las cinco del área de Chicago el 2026-08-11. Al añadir una
// sede estos números se mueven solos — no hay que buscarlos por el sitio.
const TOTAL_LOCATIONS = OFFICE_NAP_SLUGS.length;
const APPOINTMENT_LOCATIONS = VIRTUAL_OFFICE_SLUGS.length;
const STAFFED_OFFICES = TOTAL_LOCATIONS - APPOINTMENT_LOCATIONS;
const STATE_COUNT = new Set(OFFICE_NAP_SLUGS.map((slug) => OFFICES_NAP[slug].state)).size;

// --- SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? `Nuestras Oficinas en ${STATE_COUNT} Estados`
    : `Our Offices in ${STATE_COUNT} States`;

  const description = isEs
    ? `Encuentre la oficina de Manuel Solis mas cercana: ${STAFFED_OFFICES} oficinas atendidas y ${APPOINTMENT_LOCATIONS} direcciones con cita previa en Texas, California, Illinois, Colorado y Tennessee.`
    : `Find your nearest Manuel Solis Law Office: ${STAFFED_OFFICES} staffed offices and ${APPOINTMENT_LOCATIONS} by-appointment locations in Texas, California, Illinois, Colorado, and Tennessee.`;

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
    // El índice no tiene foto propia: se queda con la imagen de marca que el
    // helper pone por defecto.
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas`,
      title,
      description,
    }),
  };
}

// --- STATIC PARAMS ---
export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

// --- TARJETA DE OFICINA ---
function OfficeCard({
  slug,
  lang,
  as,
}: {
  slug: OfficeNapSlug;
  lang: 'es' | 'en';
  as: 'h3' | 'h4';
}) {
  const nap = OFFICES_NAP[slug];
  const Heading: ElementType = as;
  const byAppointment = isVirtualOffice(slug);

  return (
    <StaggerItem
      as="div"
      className="card-3d group/card bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#B2904D]/40 transition-all duration-300"
    >
      <Link href={`/${lang}/oficinas/${slug}`} className="block mb-3">
        <Heading
          className={`text-xl font-semibold text-white ${byAppointment ? 'mb-2' : 'mb-4'} group-hover/card:text-[#B2904D] transition-colors`}
        >
          {nap.name[lang]}
        </Heading>
        {byAppointment && (
          <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full border border-[#B2904D]/40 text-[10px] font-semibold uppercase tracking-wider text-[#B2904D]">
            {lang === 'es' ? 'Con cita previa' : 'By appointment'}
          </span>
        )}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
          <span className="text-white/70 text-sm leading-relaxed">
            {nap.street}, {nap.city} {nap.state} {nap.zip}
          </span>
        </div>
      </Link>
      <a
        href={`tel:+1${nap.phone.replace(/[^0-9]/g, '')}`}
        className="flex items-center gap-3 text-white/70 hover:text-[#B2904D] transition-colors"
      >
        <Phone className="w-5 h-5 text-[#B2904D] flex-shrink-0" />
        <span className="text-sm">{nap.phone}</span>
      </a>
    </StaggerItem>
  );
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
      <script
        id="breadcrumb-schema-oficinas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />

      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#001540]">
        <PhoneClickTracker label="offices_index" />
        {/* Hero Section */}
        <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-[#B2904D]" />
              <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
                {isEs
                  ? `${STAFFED_OFFICES} Oficinas y ${APPOINTMENT_LOCATIONS} Direcciones con Cita en ${STATE_COUNT} Estados`
                  : `${STAFFED_OFFICES} Offices and ${APPOINTMENT_LOCATIONS} By-Appointment Locations in ${STATE_COUNT} States`}
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
                        ({cityGroup.slugs.length} {isEs ? 'ubicaciones' : 'locations'})
                      </span>
                    </summary>
                    <Stagger gap={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-2 sm:pl-8" amount={0.1}>
                      {cityGroup.slugs.map((slug) => (
                        <OfficeCard key={slug} slug={slug} lang={currentLang} as="h4" />
                      ))}
                    </Stagger>
                  </details>
                ))}

                {/* Standalone Office Cards */}
                {group.slugs.length > 0 && (
                  <Stagger gap={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
                    {group.slugs.map((slug) => (
                      <OfficeCard key={slug} slug={slug} lang={currentLang} as="h3" />
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
