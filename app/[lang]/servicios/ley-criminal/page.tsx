import type { Metadata } from 'next';
import LeyCriminalClient from './LeyCriminalClient';
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
    ? 'Abogados de Defensa Criminal'
    : 'Criminal Defense Attorneys';

  const description = isEs
    ? 'Abogados expertos en defensa criminal: DUI/DWI, delitos menores y graves, y consecuencias migratorias de cargos criminales.'
    : 'Expert criminal defense lawyers: DUI/DWI, misdemeanors, felonies, and immigration consequences of criminal charges.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/ley-criminal`,
      languages: {
        'es': `${SITE_URL}/es/servicios/ley-criminal`,
        'en': `${SITE_URL}/en/servicios/ley-criminal`,
        'x-default': `${SITE_URL}/es/servicios/ley-criminal`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/ley-criminal`,
      images: ['/og-default.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Defensa Criminal' : 'Manuel Solis - Criminal Defense',
  description: lang === 'es'
    ? 'Servicios legales de defensa criminal: DUI/DWI, delitos y consecuencias migratorias.'
    : 'Criminal defense legal services: DUI/DWI, felonies, and immigration consequences.',
  url: `${SITE_URL}/${lang}/servicios/ley-criminal`,
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
    'Criminal Defense',
    'DUI/DWI Defense',
    'Misdemeanor Defense',
    'Felony Defense',
    'Immigration Consequences of Criminal Charges',
  ],
  availableLanguage: ['English', 'Spanish'],
});

const getCriminalFAQs = (lang: string) => {
  const faqs = lang === 'es' ? [
    { question: '¿Un cargo criminal puede afectar mi caso de inmigración?', answer: 'Sí, significativamente. Ciertos delitos pueden resultar en deportación, inadmisibilidad o negación de beneficios migratorios. Es crucial tener un abogado que entienda tanto la ley criminal como la de inmigración para proteger su estatus migratorio durante el proceso penal.' },
    { question: '¿Qué debo hacer si me arrestan?', answer: 'Mantenga la calma, no se resista al arresto, y ejerza su derecho a permanecer en silencio. No firme nada ni haga declaraciones sin un abogado presente. Llame a un abogado lo antes posible. Tiene derecho a una llamada telefónica y a representación legal.' },
    { question: '¿Cuál es la diferencia entre un delito menor y un delito grave?', answer: 'Los delitos menores (misdemeanors) incluyen ofensas como DUI simple, robo menor o posesión de pequeñas cantidades de droga, con penas de hasta 1 año de cárcel. Los delitos graves (felonies) son ofensas más serias como asalto agravado o tráfico de drogas, con penas de más de 1 año en prisión.' },
    { question: '¿Un DUI/DWI me puede causar la deportación?', answer: 'Un solo DUI simple generalmente no es causa directa de deportación, pero múltiples DUIs, un DUI con lesiones, o un DUI combinado con otros factores negativos sí pueden resultar en procedimientos de deportación. También afecta la demostración de buen carácter moral para beneficios migratorios.' },
    { question: '¿Puedo borrar un cargo criminal de mi récord?', answer: 'En Texas, ciertos cargos pueden ser sellados (orden de no divulgación) o borrados (expungement) dependiendo del tipo de delito y el resultado del caso. Si fue absuelto, los cargos fueron desestimados, o completó una desviación, puede calificar. Esto puede ser especialmente importante para casos de inmigración.' },
  ] : [
    { question: 'Can a criminal charge affect my immigration case?', answer: 'Yes, significantly. Certain offenses can result in deportation, inadmissibility, or denial of immigration benefits. It is crucial to have an attorney who understands both criminal and immigration law to protect your immigration status during criminal proceedings.' },
    { question: 'What should I do if I get arrested?', answer: 'Stay calm, do not resist arrest, and exercise your right to remain silent. Do not sign anything or make statements without an attorney present. Call a lawyer as soon as possible. You have the right to a phone call and legal representation.' },
    { question: 'What is the difference between a misdemeanor and a felony?', answer: 'Misdemeanors include offenses like simple DUI, petty theft, or possession of small amounts of drugs, with penalties of up to 1 year in jail. Felonies are more serious offenses like aggravated assault or drug trafficking, with penalties of more than 1 year in prison.' },
    { question: 'Can a DUI/DWI cause deportation?', answer: 'A single simple DUI is generally not a direct cause for deportation, but multiple DUIs, a DUI with injuries, or a DUI combined with other negative factors can result in deportation proceedings. It also affects demonstrating good moral character for immigration benefits.' },
    { question: 'Can I clear a criminal charge from my record?', answer: 'In Texas, certain charges can be sealed (non-disclosure order) or expunged depending on the type of offense and the case outcome. If you were acquitted, charges were dismissed, or you completed a diversion, you may qualify. This can be especially important for immigration cases.' },
  ];
  return faqs;
};

export default async function LeyCriminalPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Ley Criminal' : 'Criminal Law', url: `/${lang}/servicios/ley-criminal` },
  ]);
  const faqData = generateFAQSchema(getCriminalFAQs(lang));

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
      <LeyCriminalClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
