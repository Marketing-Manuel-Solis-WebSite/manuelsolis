import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs ? 'Política Editorial' : 'Editorial Policy';
  const description = isEs
    ? 'Conozca cómo se crea, revisa y actualiza el contenido legal en manuelsolis.com. Transparencia editorial para su confianza.'
    : 'Learn how legal content is created, reviewed and updated on manuelsolis.com. Editorial transparency for your trust.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/politica-editorial`,
      languages: {
        es: `${SITE_URL}/es/politica-editorial`,
        en: `${SITE_URL}/en/politica-editorial`,
        'x-default': `${SITE_URL}/es/politica-editorial`,
      },
    },
  };
}

const content = {
  es: {
    title: 'Política Editorial',
    subtitle: 'Nuestro compromiso con la precisión, transparencia y confianza.',
    sections: [
      {
        heading: '¿Quién escribe nuestro contenido?',
        text: 'Todo el contenido publicado en manuelsolis.com es redactado por el equipo legal de las Oficinas Legales de Manuel Solís, bajo la supervisión directa del Abogado Manuel Solís, fundador de la firma con más de 35 años de experiencia en derecho de inmigración, accidentes, defensa criminal y derecho de familia.',
      },
      {
        heading: '¿Quién revisa el contenido?',
        text: 'Cada artículo, guía y recurso publicado en este sitio es revisado por un abogado licenciado antes de su publicación. Nuestro proceso de revisión verifica la exactitud de la información legal, las citas de fuentes primarias y la claridad para el público general. Los artículos incluyen la fecha de publicación y de última revisión legal.',
      },
      {
        heading: 'Fuentes que utilizamos',
        text: 'Nuestro contenido se basa en fuentes primarias de autoridad legal, incluyendo: USCIS (Servicio de Ciudadanía e Inmigración de EE.UU.), la Ley de Inmigración y Nacionalidad (INA), el Código de Regulaciones Federales (CFR), la Oficina Ejecutiva de Revisión de Inmigración (EOIR), el Departamento de Justicia (DOJ) y decisiones relevantes de las cortes de inmigración.',
      },
      {
        heading: '¿Con qué frecuencia se actualiza?',
        text: 'Revisamos nuestro contenido de manera periódica para reflejar cambios en la ley, nuevas regulaciones y actualizaciones de política migratoria. Cuando una ley o regulación cambia significativamente, actualizamos los artículos afectados y modificamos la fecha de última revisión. El contenido desactualizado que no puede ser corregido es retirado.',
      },
      {
        heading: 'Propósito informativo',
        text: 'El contenido de este sitio web tiene un propósito estrictamente informativo y educativo. No constituye consejo legal. Cada situación migratoria o legal es única y requiere la evaluación de un abogado licenciado. Si necesita asesoría específica para su caso, le invitamos a contactarnos para una consulta.',
      },
      {
        heading: 'Correcciones y feedback',
        text: 'Si encuentra información que considere incorrecta, desactualizada o incompleta en nuestro sitio, le pedimos que nos contacte. Nos comprometemos a revisar y corregir cualquier error verificado en un plazo razonable. Puede comunicarse con nosotros llamando al (832) 598-0914 o a través de nuestro formulario de contacto.',
      },
    ],
  },
  en: {
    title: 'Editorial Policy',
    subtitle: 'Our commitment to accuracy, transparency and trust.',
    sections: [
      {
        heading: 'Who writes our content?',
        text: 'All content published on manuelsolis.com is written by the legal team at the Law Offices of Manuel Solis, under the direct supervision of Attorney Manuel Solis, founder of the firm with over 35 years of experience in immigration law, accidents, criminal defense and family law.',
      },
      {
        heading: 'Who reviews the content?',
        text: 'Every article, guide and resource published on this site is reviewed by a licensed attorney before publication. Our review process verifies the accuracy of legal information, primary source citations and clarity for the general public. Articles include the publication date and date of last legal review.',
      },
      {
        heading: 'Sources we use',
        text: 'Our content is based on authoritative primary legal sources, including: USCIS (U.S. Citizenship and Immigration Services), the Immigration and Nationality Act (INA), the Code of Federal Regulations (CFR), the Executive Office for Immigration Review (EOIR), the Department of Justice (DOJ) and relevant immigration court decisions.',
      },
      {
        heading: 'How often is it updated?',
        text: 'We review our content periodically to reflect changes in law, new regulations and immigration policy updates. When a law or regulation changes significantly, we update affected articles and modify the last review date. Outdated content that cannot be corrected is removed.',
      },
      {
        heading: 'Informational purpose',
        text: 'The content on this website is for informational and educational purposes only. It does not constitute legal advice. Every immigration or legal situation is unique and requires evaluation by a licensed attorney. If you need specific advice for your case, we invite you to contact us for a consultation.',
      },
      {
        heading: 'Corrections and feedback',
        text: 'If you find information that you believe is incorrect, outdated or incomplete on our site, please contact us. We are committed to reviewing and correcting any verified errors within a reasonable timeframe. You can reach us by calling (832) 598-0914 or through our contact form.',
      },
    ],
  },
};

export default async function PoliticaEditorialPage({ params }: Props) {
  const { lang } = await params;
  const validLang = lang === 'es' || lang === 'en' ? lang : 'es';
  const t = content[validLang];

  const breadcrumbData = generateBreadcrumbSchema([
    { name: validLang === 'es' ? 'Inicio' : 'Home', url: `/${validLang}` },
    { name: t.title, url: `/${validLang}/politica-editorial` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema-editorial"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />

      <main className="min-h-screen bg-[#001540] text-white">
        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        </div>

        <section className="relative z-10 pt-40 pb-24 px-6">
          <div className="container mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                  {validLang === 'es' ? 'Transparencia' : 'Transparency'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
              <p className="text-lg text-white/60 font-light">{t.subtitle}</p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {t.sections.map((section, index) => (
                <article
                  key={index}
                  className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <h2 className="text-xl font-bold text-[#B2904D] mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-white/80 font-light leading-relaxed">
                    {section.text}
                  </p>
                </article>
              ))}
            </div>

            {/* Last updated */}
            <div className="mt-12 text-center text-white/40 text-sm">
              {validLang === 'es'
                ? 'Última actualización: marzo 2025'
                : 'Last updated: March 2025'}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
