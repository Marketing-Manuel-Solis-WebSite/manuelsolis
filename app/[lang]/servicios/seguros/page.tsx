import type { Metadata } from 'next';
import SegurosClient from './SegurosClient';
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
    ? 'Abogados de Reclamos de Seguros'
    : 'Insurance Claims Attorneys';

  const description = isEs
    ? 'Abogados de reclamos de seguros en Houston y Texas. Luchamos contra aseguradoras que niegan o reducen su compensación: seguros de auto, propiedad, salud y vida.'
    : 'Insurance claims lawyers in Houston and Texas. We fight insurance companies that deny or reduce your compensation: auto, property, health and life insurance.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/seguros`,
      languages: {
        'es': `${SITE_URL}/es/servicios/seguros`,
        'en': `${SITE_URL}/en/servicios/seguros`,
        'x-default': `${SITE_URL}/es/servicios/seguros`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/seguros`,
      images: ['/home-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Reclamos de Seguros' : 'Manuel Solis - Insurance Claims',
  description: lang === 'es'
    ? 'Servicios legales de reclamos de seguros: auto, propiedad, vida y más.'
    : 'Insurance claims legal services: auto, property, life and more.',
  url: `${SITE_URL}/${lang}/servicios/seguros`,
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
    'Insurance Claims',
    'Auto Insurance Claims',
    'Property Insurance Claims',
    'Life Insurance Claims',
    'Insurance Dispute Resolution',
  ],
  availableLanguage: ['English', 'Spanish'],
});

const getSegurosFAQs = (lang: string) => {
  const faqs = lang === 'es' ? [
    { question: '¿Qué puedo hacer si mi aseguradora niega mi reclamo?', answer: 'Puede apelar la decisión internamente con la aseguradora, presentar una queja ante el Departamento de Seguros de Texas, o consultar con un abogado para evaluar si tiene un caso de mala fe (bad faith). Las aseguradoras están obligadas por ley a manejar los reclamos de buena fe y de manera oportuna.' },
    { question: '¿Cuánto tiempo tiene la aseguradora para responder a mi reclamo?', answer: 'En Texas, las aseguradoras deben acusar recibo de su reclamo dentro de 15 días, comenzar la investigación dentro de 15 días, y tomar una decisión dentro de 15 días hábiles después de recibir toda la documentación necesaria. Si no cumplen estos plazos, puede haber violación de la ley.' },
    { question: '¿Qué es un reclamo de mala fe contra una aseguradora?', answer: 'Un reclamo de mala fe (bad faith) ocurre cuando la aseguradora actúa de manera injusta: negar reclamos válidos sin razón, retrasar pagos deliberadamente, ofrecer montos irrazonablemente bajos, o no investigar adecuadamente. Puede tener derecho a daños adicionales, incluyendo daños punitivos.' },
    { question: '¿Necesito un abogado para pelear contra mi aseguradora?', answer: 'Aunque puede manejar reclamos simples por su cuenta, un abogado es altamente recomendado cuando la aseguradora niega su reclamo, ofrece un monto injusto, o actúa de mala fe. Nuestros abogados conocen las tácticas de las aseguradoras y pueden negociar una compensación justa.' },
    { question: '¿Cuánto cuesta contratar un abogado para un caso de seguros?', answer: 'Trabajamos bajo contingencia en la mayoría de los casos de seguros, lo que significa que no paga nada por adelantado. Solo cobramos si ganamos su caso.' },
  ] : [
    { question: 'What can I do if my insurance company denies my claim?', answer: 'You can appeal the decision internally with the insurer, file a complaint with the Texas Department of Insurance, or consult with an attorney to evaluate if you have a bad faith case. Insurance companies are required by law to handle claims in good faith and in a timely manner.' },
    { question: 'How long does the insurance company have to respond to my claim?', answer: 'In Texas, insurers must acknowledge receipt of your claim within 15 days, begin the investigation within 15 days, and make a decision within 15 business days after receiving all necessary documentation. Failure to meet these deadlines may constitute a violation of the law.' },
    { question: 'What is a bad faith claim against an insurance company?', answer: 'A bad faith claim occurs when the insurer acts unfairly: denying valid claims without reason, deliberately delaying payments, offering unreasonably low amounts, or failing to properly investigate. You may be entitled to additional damages, including punitive damages.' },
    { question: 'Do I need a lawyer to fight my insurance company?', answer: 'While you can handle simple claims on your own, an attorney is highly recommended when the insurer denies your claim, offers an unfair amount, or acts in bad faith. Our attorneys know insurance company tactics and can negotiate fair compensation.' },
    { question: 'How much does it cost to hire a lawyer for an insurance case?', answer: 'We work on contingency for most insurance cases, meaning you pay nothing upfront. We only charge if we win your case.' },
  ];
  return faqs;
};

export default async function SegurosPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Seguros' : 'Insurance', url: `/${lang}/servicios/seguros` },
  ]);
  const faqData = generateFAQSchema(getSegurosFAQs(lang));

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
      <SegurosClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
