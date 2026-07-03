import type { Metadata } from 'next';
import FamiliaClient from './FamiliaClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { generateFAQSchema } from '../../../lib/blogSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Derecho Familiar e Inmigración'
    : 'Family Law & Immigration Attorneys';

  const description = isEs
    ? 'Abogados expertos en derecho familiar: peticiones familiares, reunificación, custodia y más. Más de 30 años protegiendo a las familias inmigrantes.'
    : 'Expert family law attorneys: family petitions, reunification, custody and more. Over 30 years protecting immigrant families.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/familia`,
      languages: {
        'es': `${SITE_URL}/es/servicios/familia`,
        'en': `${SITE_URL}/en/servicios/familia`,
        'x-default': `${SITE_URL}/es/servicios/familia`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/familia`,
      images: ['/og-default.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Derecho Familiar' : 'Manuel Solis - Family Law',
  description: lang === 'es'
    ? 'Servicios legales de derecho familiar: peticiones familiares, reunificación y custodia.'
    : 'Family law legal services: family petitions, reunification, and custody.',
  url: `${SITE_URL}/${lang}/servicios/familia`,
  priceRange: '$$',
  telephone: '+1-832-598-0914',
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: {
    '@type': 'LawFirm',
    name: 'Manuel Solis Law Firm',
    url: 'https://www.manuelsolis.com',
    telephone: '+1-832-598-0914',
  },
  serviceType: [
    'Family Law',
    'Family Petitions',
    'Reunification',
    'Custody',
    'VAWA Self-Petition',
    'Immigrant Family Protection',
  ],
  availableLanguage: ['English', 'Spanish'],
});

const getFamiliaFAQs = (lang: string) => {
  const faqs = lang === 'es' ? [
    { question: '¿Cuánto tiempo tarda un divorcio en Texas?', answer: 'En Texas hay un período mínimo de espera de 60 días después de presentar la solicitud. Un divorcio no contestado puede resolverse en 2 a 3 meses. Los divorcios contestados con disputas de custodia o bienes pueden tomar de 6 meses a más de un año.' },
    { question: '¿Cómo se determina la custodia de los hijos?', answer: 'El tribunal considera el mejor interés del menor, evaluando la estabilidad emocional y física de cada padre, la relación del niño con cada padre, las necesidades del menor, y la capacidad de cada padre para proveer un ambiente seguro. La preferencia del niño puede considerarse si tiene 12 años o más.' },
    { question: '¿Cómo se calcula la manutención de los hijos en Texas?', answer: 'Se calcula basándose en el 20% del ingreso neto mensual del padre que no tiene custodia para un hijo, con un 5% adicional por cada hijo adicional hasta un máximo del 40%. El ingreso neto se calcula después de impuestos, seguro social y seguro médico.' },
    { question: '¿Puedo modificar una orden de custodia existente?', answer: 'Sí, puede solicitar una modificación si ha habido un cambio material y sustancial en las circunstancias desde la orden original. Ejemplos incluyen mudanza, cambio de empleo, preocupaciones de seguridad, o si el niño tiene 12 años o más y expresa una preferencia diferente.' },
    { question: '¿Mi estatus migratorio afecta mis derechos de custodia?', answer: 'No. El estatus migratorio de un padre no determina la custodia en Texas. Los tribunales evalúan el mejor interés del menor sin importar el estatus migratorio. Nuestros abogados tienen experiencia manejando casos de familia donde la inmigración es un factor.' },
  ] : [
    { question: 'How long does a divorce take in Texas?', answer: 'Texas has a minimum 60-day waiting period after filing. An uncontested divorce can be resolved in 2 to 3 months. Contested divorces with custody or property disputes can take 6 months to over a year.' },
    { question: 'How is child custody determined?', answer: 'The court considers the best interest of the child, evaluating each parent\'s emotional and physical stability, the child\'s relationship with each parent, the child\'s needs, and each parent\'s ability to provide a safe environment. The child\'s preference may be considered if they are 12 or older.' },
    { question: 'How is child support calculated in Texas?', answer: 'It is calculated based on 20% of the non-custodial parent\'s net monthly income for one child, with an additional 5% for each additional child up to a maximum of 40%. Net income is calculated after taxes, social security, and health insurance.' },
    { question: 'Can I modify an existing custody order?', answer: 'Yes, you can request a modification if there has been a material and substantial change in circumstances since the original order. Examples include relocation, change in employment, safety concerns, or if the child is 12 or older and expresses a different preference.' },
    { question: 'Does my immigration status affect my custody rights?', answer: 'No. A parent\'s immigration status does not determine custody in Texas. Courts evaluate the best interest of the child regardless of immigration status. Our attorneys have experience handling family cases where immigration is a factor.' },
  ];
  return faqs;
};

export default async function FamiliaPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Familia' : 'Family', url: `/${lang}/servicios/familia` },
  ]);
  const faqData = generateFAQSchema(getFamiliaFAQs(lang));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
      <FamiliaClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
