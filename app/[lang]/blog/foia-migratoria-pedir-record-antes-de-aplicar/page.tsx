import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker';
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import RelatedContent from '../../../components/blogs/RelatedContent';
import { getRelatedArticles } from '../../../lib/blogRelations';
import BlogSchema from '../../../components/blogs/BlogSchema';


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_14/BLOG04_CR1.png',
  inside1: '/blog/blog_14/BLOG04_CR2.png',
  inside2: '/blog/blog_14/BLOG04_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'FOIA migratoria: por qué pedir tu récord antes de aplicar',
    metaDesc: 'Evita sorpresas con inmigración. Aprende qué es una FOIA, qué información podría revelar y por qué pedir tu récord antes de aplicar.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'FOIA Migratoria',
      date: '12 Mar, 2026',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'No apliques a ciegas: por qué pedir tu récord (FOIA) podría salvar tu caso',
    summary: {
      title: 'Resumen inicial',
      text: 'Muchos procesos migratorios se complican por información incompleta o mal recordada del pasado. Detenciones en la frontera, salidas voluntarias o entrevistas antiguas podrían seguir registradas, aunque hayan ocurrido hace muchos años. En este artículo explicamos qué es una <strong>FOIA</strong>, qué información podría revelar y por qué solicitar tu récord antes de iniciar cualquier trámite podría marcar una gran diferencia.'
    },
    intro: [
      '<strong>"Eso pasó hace mucho, ya no cuenta"</strong>. Esta es una de las frases más comunes que se escuchan antes de iniciar un trámite migratorio.',
      'Sin embargo, en inmigración, el historial no desaparece con el tiempo. Un encuentro en la frontera hace 10 o 15 años, una salida firmada sin entenderla o una huella tomada en un aeropuerto podrían seguir activos en los sistemas del gobierno.',
      'Por eso, iniciar un proceso sin conocer tu propio récord podría generar sorpresas difíciles de manejar después.'
    ],
    sections: {
      whatIsFOIA: {
        title: '¿Qué es una FOIA y por qué es tan importante?',
        quote: 'Conocer tu historial antes de aplicar podría cambiar tu estrategia por completo.',
        text: 'FOIA significa Freedom of Information Act (Ley de Libertad de Información). Es una herramienta legal que podría permitir a una persona solicitar copias de su información registrada ante agencias gubernamentales.',
        reveals: [
          'Entradas y salidas del país.',
          'Detenciones en frontera.',
          'Entrevistas con oficiales migratorios.',
          'Órdenes emitidas, aunque nunca se hayan explicado claramente.',
          'Historial de solicitudes previas.'
        ],
        note: 'Esta información no siempre coincide con lo que la persona recuerda.'
      },
      keyAgencies: {
        title: 'Agencias clave donde se suele pedir FOIA',
        subtitle: 'No basta con una sola solicitud',
        text: 'En casos migratorios, no basta con una sola solicitud. Frecuentemente se analizan FOIAs de varias agencias:',
        cards: {
          cbp: { title: 'CBP', subtitle: 'Aduanas y Protección Fronteriza', desc: 'Registros de entradas, salidas y detenciones en frontera.' },
          uscis: { title: 'USCIS', subtitle: 'Servicio de Ciudadanía e Inmigración', desc: 'Historial de solicitudes, entrevistas y decisiones.' },
          ice: { title: 'ICE', subtitle: 'Inmigración y Control de Aduanas', desc: 'Posibles procesos de remoción o custodia.' },
          fbi: { title: 'FBI', subtitle: 'Oficina Federal de Investigación', desc: 'Huellas y antecedentes federales.' }
        },
        note: 'Cada una podría tener piezas distintas del mismo rompecabezas.'
      },
      voluntaryDeparture: {
        title: 'El error común: confundir una salida voluntaria con una orden de deportación',
        subtitle: 'Una diferencia que cambia todo',
        text: 'Uno de los errores más frecuentes ocurre cuando una persona cree que "solo la regresaron" en la frontera.',
        differences: [
          'Una salida voluntaria, que en ciertos contextos podría tener menos consecuencias.',
          'Una deportación expedita, que podría generar castigos automáticos o restricciones futuras.'
        ],
        text2: 'Muchas personas firmaron documentos sin entenderlos completamente. Una FOIA podría aclarar exactamente qué ocurrió y bajo qué autoridad legal.'
      },
      whyBeforeApplying: {
        title: '¿Por qué pedir tu récord antes de aplicar?',
        subtitle: 'Evitar errores que podrían costar el caso',
        text: 'Enviar una solicitud migratoria sin conocer el récord completo podría ser riesgoso.',
        risks: [
          'Declaraciones inconsistentes entre formularios.',
          'Respuestas que contradicen registros oficiales.',
          'Omisiones involuntarias que el gobierno podría interpretar negativamente.'
        ],
        note: 'Una FOIA podría permitir preparar el caso con información real, no con suposiciones.'
      },
      lawyerAnalysis: {
        title: 'Cómo un abogado analiza una FOIA',
        subtitle: 'Solicitar el récord es solo el primer paso',
        text: 'Solicitar el récord es solo el primer paso. Interpretarlo correctamente es igual de importante.',
        analyzes: [
          'Fechas exactas de entradas y salidas.',
          'Tipo de procedimiento registrado.',
          'Autoridad que emitió la orden.',
          'Impacto potencial en futuros trámites.',
          'Necesidad de perdones o estrategias alternas.'
        ],
        note: 'Este análisis no se basa en una sola hoja, sino en el historial completo. Cada caso es distinto, y la FOIA no reemplaza una evaluación legal, pero podría hacerla mucho más precisa.'
      },
      hypothetical: {
        title: 'Ejemplo hipotético',
        scenario: 'Imagina a una persona que entró por la frontera hace 18 años, cree que "solo la regresaron" y nunca volvió a intentar cruzar de forma irregular.',
        analysis: 'Sin una FOIA, podría pensar que su récord está limpio. Pero al solicitarlo, podría aparecer una deportación expedita registrada, lo que cambia por completo la estrategia.',
        note: 'Este tipo de hallazgos solo se descubren con investigación previa.'
      },
      whenToRequest: {
        title: '¿Cuándo es buen momento para pedir una FOIA?',
        text: 'Muchas personas esperan hasta que surge un problema. Sin embargo, pedir la FOIA antes de iniciar un trámite podría ayudar a:',
        benefits: [
          'Evitar rechazos innecesarios.',
          'Preparar respuestas consistentes.',
          'Reducir riesgos imprevistos.',
          'Tomar decisiones con mayor claridad.'
        ],
        note: 'Aunque el proceso toma tiempo, la espera podría valer la pena.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Aplicar "a ciegas" en inmigración podría ser uno de los errores más costosos. El historial migratorio no siempre coincide con la memoria, y una FOIA podría revelar información clave que influya en cualquier trámite futuro.',
        advice: 'Antes de enviar formularios o firmar documentos, informarte y conocer tu récord podría ayudarte a avanzar con mayor seguridad.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'FOIA.gov – Freedom of Information Act',
          'USCIS – How to File a FOIA/PA Request',
          'CBP – FOIA Requests',
          'American Immigration Council – Understanding Your Immigration Record'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Immigration FOIA: Why Request Your Record Before Applying',
    metaDesc: 'Avoid surprises with immigration. Learn what a FOIA is, what information it could reveal, and why requesting your record before applying matters.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'Immigration FOIA',
      date: 'Mar 12, 2026',
      time: '9 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Don\'t Apply Blind: Why Requesting Your Record (FOIA) Could Save Your Case',
    summary: {
      title: 'Initial Summary',
      text: 'Many immigration processes get complicated due to incomplete or misremembered information from the past. Border detentions, voluntary departures, or old interviews may still be on record, even years later. In this article we explain what a <strong>FOIA</strong> is, what information it could reveal, and why requesting your record before starting any process could make a big difference.'
    },
    intro: [
      '<strong>"That happened a long time ago, it doesn\'t count anymore"</strong>. This is one of the most common phrases heard before starting an immigration process.',
      'However, in immigration, your history does not disappear with time. A border encounter 10 or 15 years ago, a signed departure you didn\'t understand, or a fingerprint taken at an airport could still be active in government systems.',
      'That is why starting a process without knowing your own record could lead to surprises that are difficult to manage later.'
    ],
    sections: {
      whatIsFOIA: {
        title: 'What Is a FOIA and Why Is It So Important?',
        quote: 'Knowing your history before applying could change your strategy completely.',
        text: 'FOIA stands for Freedom of Information Act. It is a legal tool that could allow a person to request copies of their information recorded by government agencies.',
        reveals: [
          'Entries and exits from the country.',
          'Border detentions.',
          'Interviews with immigration officers.',
          'Orders issued, even if they were never clearly explained.',
          'History of previous applications.'
        ],
        note: 'This information does not always match what the person remembers.'
      },
      keyAgencies: {
        title: 'Key Agencies Where FOIAs Are Usually Requested',
        subtitle: 'One request is not enough',
        text: 'In immigration cases, one request is not enough. FOIAs from multiple agencies are frequently analyzed:',
        cards: {
          cbp: { title: 'CBP', subtitle: 'Customs and Border Protection', desc: 'Records of entries, exits, and border detentions.' },
          uscis: { title: 'USCIS', subtitle: 'Citizenship and Immigration Services', desc: 'History of applications, interviews, and decisions.' },
          ice: { title: 'ICE', subtitle: 'Immigration and Customs Enforcement', desc: 'Possible removal proceedings or custody.' },
          fbi: { title: 'FBI', subtitle: 'Federal Bureau of Investigation', desc: 'Fingerprints and federal background checks.' }
        },
        note: 'Each one could hold different pieces of the same puzzle.'
      },
      voluntaryDeparture: {
        title: 'The Common Mistake: Confusing a Voluntary Departure with a Deportation Order',
        subtitle: 'A difference that changes everything',
        text: 'One of the most frequent errors occurs when a person believes they were "just sent back" at the border.',
        differences: [
          'A voluntary departure, which in certain contexts could have fewer consequences.',
          'An expedited deportation, which could trigger automatic penalties or future restrictions.'
        ],
        text2: 'Many people signed documents without fully understanding them. A FOIA could clarify exactly what happened and under what legal authority.'
      },
      whyBeforeApplying: {
        title: 'Why Request Your Record Before Applying?',
        subtitle: 'Avoid mistakes that could cost the case',
        text: 'Submitting an immigration application without knowing the complete record could be risky.',
        risks: [
          'Inconsistent statements between forms.',
          'Answers that contradict official records.',
          'Unintentional omissions that the government could interpret negatively.'
        ],
        note: 'A FOIA could allow you to prepare the case with real information, not assumptions.'
      },
      lawyerAnalysis: {
        title: 'How an Attorney Analyzes a FOIA',
        subtitle: 'Requesting the record is only the first step',
        text: 'Requesting the record is only the first step. Interpreting it correctly is equally important.',
        analyzes: [
          'Exact dates of entries and exits.',
          'Type of procedure recorded.',
          'Authority that issued the order.',
          'Potential impact on future applications.',
          'Need for waivers or alternate strategies.'
        ],
        note: 'This analysis is not based on a single page, but on the complete history. Every case is different, and a FOIA does not replace a legal evaluation, but it could make it much more precise.'
      },
      hypothetical: {
        title: 'Hypothetical Example',
        scenario: 'Imagine a person who entered through the border 18 years ago, believes they were "just sent back," and never tried to cross irregularly again.',
        analysis: 'Without a FOIA, they might think their record is clean. But upon requesting it, an expedited deportation could appear on record, which completely changes the strategy.',
        note: 'These types of findings are only discovered through prior research.'
      },
      whenToRequest: {
        title: 'When Is a Good Time to Request a FOIA?',
        text: 'Many people wait until a problem arises. However, requesting the FOIA before starting a process could help:',
        benefits: [
          'Avoid unnecessary denials.',
          'Prepare consistent responses.',
          'Reduce unforeseen risks.',
          'Make decisions with greater clarity.'
        ],
        note: 'Although the process takes time, the wait could be worth it.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Applying "blind" in immigration could be one of the most costly mistakes. Immigration history does not always match memory, and a FOIA could reveal key information that influences any future process.',
        advice: 'Before submitting forms or signing documents, getting informed and knowing your record could help you move forward with greater confidence.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'FOIA.gov – Freedom of Information Act',
          'USCIS – How to File a FOIA/PA Request',
          'CBP – FOIA Requests',
          'American Immigration Council – Understanding Your Immigration Record'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const imageUrl = `${SITE_URL}${IMAGES.article}`;

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/foia-migratoria-pedir-record-antes-de-aplicar`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2026-03-12T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['FOIA','Récord migratorio','Freedom of Information Act','CBP','USCIS','ICE','Historial migratorio'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/foia-migratoria-pedir-record-antes-de-aplicar`,
      languages: {
        'es': `${SITE_URL}/es/blog/foia-migratoria-pedir-record-antes-de-aplicar`,
        'en': `${SITE_URL}/en/blog/foia-migratoria-pedir-record-antes-de-aplicar`,
        'x-default': `${SITE_URL}/es/blog/foia-migratoria-pedir-record-antes-de-aplicar`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;



  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/foia-migratoria-pedir-record-antes-de-aplicar` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="foia-migratoria-pedir-record-antes-de-aplicar"
        date="2026-03-12"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Solís"
        category="Inmigración"
      />

      <ReadingProgress />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]`}>

        <Header />

        <BlogBackground />

        <main id="main-content" tabIndex={-1} className="relative z-10 pt-32 pb-20">

          {/* HERO */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">

            <div className="mb-10">
              <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors group text-sm font-medium uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
              <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.ui.tags}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.ui.date}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.ui.time}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 max-w-5xl animate-fade-in-up delay-100">
              {t.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg shadow-[#B2904D]/20">
                  <Image
                    src={IMAGES.author}
                    alt="Abogado Manuel Solis"
                    fill sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Solís</p>
                  <p className="text-white/50 text-sm">{t.ui.authorRole}</p>
                </div>
              </div>

              <ShareButtons title={t.title} uiShareText={t.ui.share} />
            </div>
          </section>

          {/* CONTENIDO */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">

              <article className="lg:col-span-8 prose prose-lg prose-invert max-w-none">

                {/* Imagen principal */}
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image
                     src={IMAGES.article}
                     alt="FOIA migratoria récord migratorio"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h2 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h2>
                   <p
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">

                  {/* Introducción */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Sección 1: ¿Qué es una FOIA? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsFOIA.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIsFOIA.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIsFOIA.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIsFOIA.reveals.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIsFOIA.note}
                    </div>
                  </section>

                  {/* Sección 2: Agencias clave */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Building2 size={24} className="text-[#B2904D]" /></div>
                      {t.sections.keyAgencies.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.keyAgencies.subtitle}</p>
                    <p className="mb-8">{t.sections.keyAgencies.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                        <Search className="text-[#B2904D]" />
                        <span className="font-bold text-white">{t.sections.keyAgencies.cards.cbp.title}</span>
                        <span className="text-xs text-[#B2904D] uppercase tracking-wider">{t.sections.keyAgencies.cards.cbp.subtitle}</span>
                        <span className="text-sm">{t.sections.keyAgencies.cards.cbp.desc}</span>
                      </div>
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                        <Building2 className="text-[#B2904D]" />
                        <span className="font-bold text-white">{t.sections.keyAgencies.cards.uscis.title}</span>
                        <span className="text-xs text-[#B2904D] uppercase tracking-wider">{t.sections.keyAgencies.cards.uscis.subtitle}</span>
                        <span className="text-sm">{t.sections.keyAgencies.cards.uscis.desc}</span>
                      </div>
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                        <ShieldCheck className="text-[#B2904D]" />
                        <span className="font-bold text-white">{t.sections.keyAgencies.cards.ice.title}</span>
                        <span className="text-xs text-[#B2904D] uppercase tracking-wider">{t.sections.keyAgencies.cards.ice.subtitle}</span>
                        <span className="text-sm">{t.sections.keyAgencies.cards.ice.desc}</span>
                      </div>
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                        <FileText className="text-[#B2904D]" />
                        <span className="font-bold text-white">{t.sections.keyAgencies.cards.fbi.title}</span>
                        <span className="text-xs text-[#B2904D] uppercase tracking-wider">{t.sections.keyAgencies.cards.fbi.subtitle}</span>
                        <span className="text-sm">{t.sections.keyAgencies.cards.fbi.desc}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.keyAgencies.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="FOIA agencias migratorias CBP USCIS ICE"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Salida voluntaria vs deportación */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.voluntaryDeparture.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.voluntaryDeparture.subtitle}</p>
                    <p className="mb-4">{t.sections.voluntaryDeparture.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.voluntaryDeparture.differences.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p>{t.sections.voluntaryDeparture.text2}</p>
                  </section>

                  {/* Sección 4: ¿Por qué pedir antes de aplicar? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whyBeforeApplying.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whyBeforeApplying.subtitle}</p>
                    <p className="mb-4">{t.sections.whyBeforeApplying.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whyBeforeApplying.risks.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whyBeforeApplying.note}
                    </div>
                  </section>

                  {/* Sección 5: Cómo un abogado analiza una FOIA */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.lawyerAnalysis.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.lawyerAnalysis.subtitle}</p>
                    <p className="mb-4">{t.sections.lawyerAnalysis.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.lawyerAnalysis.analyzes.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.lawyerAnalysis.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Abogado analizando FOIA récord migratorio"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Ejemplo hipotético */}
                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><User size={24} className="text-[#B2904D]" /></div>
                      {t.sections.hypothetical.title}
                    </h2>

                    <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote size={120} />
                       </div>

                       <p className="italic text-white/90 mb-6 text-lg">
                         {t.sections.hypothetical.scenario}
                       </p>

                       <p className="mb-6">
                         {t.sections.hypothetical.analysis}
                       </p>

                       <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                         <AlertCircle size={16} className="inline mr-2" />
                         {t.sections.hypothetical.note}
                       </div>
                    </div>
                  </section>

                  {/* Sección 7: ¿Cuándo pedir una FOIA? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Clock size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whenToRequest.title}
                    </h2>
                    <p className="mb-4">{t.sections.whenToRequest.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whenToRequest.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whenToRequest.note}
                    </div>
                  </section>

                  {/* Conclusión CTA */}
                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                      <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                         <MessageCircle size={28} /> {t.sections.conclusion.title}
                      </h2>
                      <p className="font-medium text-lg mb-6 leading-relaxed">
                        {t.sections.conclusion.text}
                      </p>
                      <p className="font-bold text-xl mb-8">
                        {t.sections.conclusion.advice}
                      </p>

                      <Link href="#contacto" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-white hover:text-[#001540] transition-all shadow-xl gap-2">
                         <Send size={18} />
                         {t.ui.ctaButton}
                      </Link>
                  </div>

                  {/* Fuentes */}
                  <div className="border-t border-white/10 pt-8 mt-12">
                      <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/50 list-none pl-0">
                         {t.sections.sources.list.map((source, idx) => (
                           <li key={idx} className="flex items-center gap-2 hover:text-[#B2904D] transition-colors"><ArrowUpRight size={12} /> {source}</li>
                         ))}
                      </ul>
                  </div>

                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-8">

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                    <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Sobre el Autor</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                          <Image src={IMAGES.author} alt="Manuel Solis" fill sizes="96px" className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados/manuel-solis`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         {lang === 'es' ? 'Ver Perfil del Abogado' : 'View Attorney Profile'}
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent
            articles={getRelatedArticles('foia-migratoria-pedir-record-antes-de-aplicar', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/inmigracion"
          />
        </div>

        <div id="contacto">
           <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
