import type { Metadata } from 'next';
import AccidentesClient from './AccidentesClient';
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
    ? 'Abogados de Accidentes y Lesiones Personales'
    : 'Accident & Personal Injury Lawyers';

  const description = isEs
    ? 'Abogados expertos en accidentes de auto, camión y lesiones personales. Más de 30 años de experiencia luchando por la compensación que merece.'
    : 'Expert car accident, truck accident & personal injury attorneys. Over 30 years fighting for the compensation you deserve.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/accidentes`,
      languages: {
        'es': `${SITE_URL}/es/servicios/accidentes`,
        'en': `${SITE_URL}/en/servicios/accidentes`,
        'x-default': `${SITE_URL}/es/servicios/accidentes`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/accidentes`,
      images: ['/og-default.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Abogados de Accidentes' : 'Manuel Solis - Accident Lawyers',
  description: lang === 'es'
    ? 'Servicios legales para accidentes de auto, camión y lesiones personales.'
    : 'Legal services for car accidents, truck accidents, and personal injury.',
  url: `${SITE_URL}/${lang}/servicios/accidentes`,
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
    'Personal Injury',
    'Car Accidents',
    'Truck Accidents',
    'Wrongful Death',
    'Motorcycle Accidents',
    'Pedestrian Accidents',
  ],
  availableLanguage: ['English', 'Spanish'],
});

const getAccidentesFAQs = (lang: string) => {
  const faqs = lang === 'es' ? [
    { question: '¿Cuánto tiempo tengo para presentar una demanda por accidente de auto en Texas?', answer: 'En Texas, el estatuto de limitaciones para lesiones personales es de 2 años desde la fecha del accidente. Sin embargo, es crucial actuar rápidamente para preservar evidencia y testimonios. Consulte con un abogado lo antes posible después de un accidente.' },
    { question: '¿Qué compensación puedo recibir después de un accidente?', answer: 'Puede recibir compensación por gastos médicos, salarios perdidos, dolor y sufrimiento, daño emocional, y daños a la propiedad. En casos de negligencia grave, también puede recibir daños punitivos. No es raro que nuestros clientes reciban entre 10 y 20 veces más de lo que la aseguradora ofrece inicialmente.' },
    { question: '¿Necesito un abogado si la aseguradora ya me hizo una oferta?', answer: 'Sí, definitivamente. Las aseguradoras frecuentemente ofrecen montos muy por debajo del valor real de su caso. Un abogado puede negociar una compensación justa. Hemos visto casos donde nuestros clientes reciben 10 a 20 veces más de la oferta inicial con nuestra representación.' },
    { question: '¿Qué pasa si el otro conductor no tiene seguro?', answer: 'Aún tiene opciones. Puede usar su propia cobertura de motorista sin seguro (UM/UIM) si la tiene. También puede demandar directamente al conductor responsable. Nuestros abogados evaluarán todas las fuentes de compensación disponibles para su caso.' },
    { question: '¿Cómo funcionan sus honorarios en casos de accidentes?', answer: 'Trabajamos bajo contingencia, lo que significa que no paga nada a menos que ganemos su caso. Solo cobramos un porcentaje de la compensación que usted reciba.' },
  ] : [
    { question: 'How long do I have to file a car accident lawsuit in Texas?', answer: 'In Texas, the statute of limitations for personal injury is 2 years from the date of the accident. However, it is crucial to act quickly to preserve evidence and testimony. Consult with an attorney as soon as possible after an accident.' },
    { question: 'What compensation can I receive after an accident?', answer: 'You may receive compensation for medical expenses, lost wages, pain and suffering, emotional distress, and property damage. In cases of gross negligence, you may also receive punitive damages. It is not uncommon for our clients to receive 10 to 20 times more than what the insurance company initially offers.' },
    { question: 'Do I need a lawyer if the insurance company already made me an offer?', answer: 'Yes, definitely. Insurance companies frequently offer amounts far below the true value of your case. An attorney can negotiate fair compensation. We have seen cases where our clients receive 10 to 20 times more than the initial offer with our representation.' },
    { question: 'What happens if the other driver has no insurance?', answer: 'You still have options. You can use your own uninsured/underinsured motorist coverage (UM/UIM) if you have it. You can also sue the responsible driver directly. Our attorneys will evaluate all available sources of compensation for your case.' },
    { question: 'How do your fees work for accident cases?', answer: 'We work on contingency, which means you pay nothing unless we win your case. We only charge a percentage of the compensation you receive.' },
  ];
  return faqs;
};

export default async function AccidentesPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Accidentes' : 'Accidents', url: `/${lang}/servicios/accidentes` },
  ]);
  const faqData = generateFAQSchema(getAccidentesFAQs(lang));

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
      <AccidentesClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
