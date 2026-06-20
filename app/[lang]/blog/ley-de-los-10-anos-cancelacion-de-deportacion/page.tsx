import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle
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
  article: '/blog/blog_11/BLOG01_CR1.png',
  inside1: '/blog/blog_11/BLOG01_CR2.png',
  inside2: '/blog/blog_11/BLOG01_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Ley de los 10 a\u00f1os en inmigraci\u00f3n: mitos y realidad legal',
    metaDesc: '\u00bfCrees que calificas por tener 10 a\u00f1os en EE. UU.? Conoce la verdad sobre la Cancelaci\u00f3n de Deportaci\u00f3n y por qu\u00e9 no es autom\u00e1tica.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir art\u00edculo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Cancelaci\u00f3n de Deportaci\u00f3n',
      date: '02 Mar, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: '\u00bfCalifico para la "Ley de los 10 a\u00f1os" solo por vivir aqu\u00ed? Mitos de la Cancelaci\u00f3n de Deportaci\u00f3n',
    summary: {
      title: 'Resumen inicial',
      text: 'Muchas personas creen que, tras vivir 10 a\u00f1os en Estados Unidos, obtienen autom\u00e1ticamente un derecho a la residencia. Sin embargo, esta idea no siempre es correcta. La llamada <strong>"Ley de los 10 a\u00f1os"</strong> es en realidad una defensa legal que solo podr\u00eda presentarse ante un juez de inmigraci\u00f3n, bajo requisitos muy espec\u00edficos.'
    },
    intro: [
      'Es com\u00fan escuchar frases como: <strong>"Ya tengo m\u00e1s de 10 a\u00f1os aqu\u00ed, ya puedo arreglar"</strong>. Esta creencia se ha transmitido por a\u00f1os entre familias, amigos y comunidades enteras, generando esperanza\u2026 pero tambi\u00e9n mucha confusi\u00f3n.',
      'La realidad es que vivir 10 a\u00f1os en EE. UU. por s\u00ed solo no crea un beneficio migratorio autom\u00e1tico.',
      'La llamada "Ley de los 10 a\u00f1os" se refiere a la <strong>Cancelaci\u00f3n de Remoci\u00f3n</strong>, una defensa que solo podr\u00eda evaluarse dentro de un proceso en corte de inmigraci\u00f3n.',
      'Entender esto a tiempo podr\u00eda evitar riesgos innecesarios y ayudar a tomar decisiones m\u00e1s informadas.'
    ],
    sections: {
      whatIs: {
        title: '\u00bfQu\u00e9 es realmente la "Ley de los 10 a\u00f1os"?',
        quote: 'No es un beneficio autom\u00e1tico. Es una defensa legal compleja.',
        text: 'La "Ley de los 10 a\u00f1os" no es una solicitud que se presenta ante inmigraci\u00f3n de forma regular. En t\u00e9rminos legales, se conoce como Cancelaci\u00f3n de Remoci\u00f3n para personas no residentes permanentes.',
        list: [
          'No es un beneficio autom\u00e1tico.',
          'No se solicita afirmativamente.',
          'Solo podr\u00eda considerarse si la persona ya est\u00e1 en proceso de deportaci\u00f3n ante un juez.'
        ],
        note: 'Esto significa que no es una opci\u00f3n preventiva, sino una defensa dentro de un caso en corte.'
      },
      mythApply: {
        title: 'Mito com\u00fan: "Puedo aplicar por mi cuenta"',
        subtitle: 'Uno de los errores m\u00e1s peligrosos',
        text: 'Uno de los errores m\u00e1s peligrosos es creer que esta defensa se puede solicitar directamente ante inmigraci\u00f3n.',
        list: [
          'La Cancelaci\u00f3n de Remoci\u00f3n no se presenta por iniciativa propia.',
          'Intentar "aplicarla" fuera de corte podr\u00eda poner a la persona en el radar de ICE.',
          'No existe un formulario simple para "pedirla".'
        ],
        warning: 'Por eso, actuar sin informaci\u00f3n adecuada podr\u00eda generar consecuencias graves, incluso iniciar un proceso de deportaci\u00f3n.'
      },
      extremeHardship: {
        title: 'El requisito m\u00e1s importante: el da\u00f1o extremo a un familiar',
        subtitle: 'No se trata solo de tiempo, sino de impacto familiar',
        text: 'Uno de los elementos centrales de esta defensa no es el tiempo vivido, sino el impacto en un familiar calificado.',
        qualifiedRelatives: [
          'Un c\u00f3nyuge, padre o hijo',
          'Que sea ciudadano estadounidense o residente permanente'
        ],
        damageText: 'No se trata de un da\u00f1o com\u00fan o emocional b\u00e1sico. El juez analiza si ese familiar podr\u00eda sufrir un da\u00f1o "excepcional y extremadamente inusual".',
        examples: [
          'Condiciones m\u00e9dicas graves.',
          'Necesidades educativas especiales.',
          'Dependencia econ\u00f3mica severa.',
          'Situaciones familiares fuera de lo com\u00fan.'
        ],
        note: 'Cada caso es distinto y no todo sufrimiento familiar cumple este est\u00e1ndar.'
      },
      timeAndCharacter: {
        title: 'Tiempo f\u00edsico vs. buen car\u00e1cter moral',
        subtitle: 'Cumplir 10 a\u00f1os no es suficiente',
        timeText: 'Generalmente, la persona podr\u00eda necesitar al menos 10 a\u00f1os de presencia f\u00edsica continua en EE. UU., sin interrupciones significativas.',
        timeStops: [
          'Una notificaci\u00f3n formal de corte.',
          'Ciertos antecedentes penales.'
        ],
        characterText: 'Adem\u00e1s del tiempo, el juez eval\u00faa el comportamiento de la persona durante esos a\u00f1os.',
        characterFactors: [
          'Arrestos o condenas.',
          'Declaraciones falsas.',
          'Problemas fiscales.',
          'Falta de cumplimiento con obligaciones legales.'
        ],
        note: 'Cumplir 10 a\u00f1os no elimina autom\u00e1ticamente estos factores.'
      },
      evenIfQualify: {
        title: '\u00bfQu\u00e9 pasa si una persona "cumple" con todo?',
        text: 'Incluso si alguien cree cumplir con todos los requisitos, eso no significa que el juez aprobar\u00e1 el caso.',
        list: [
          'La Cancelaci\u00f3n de Remoci\u00f3n es discrecional.',
          'El juez podr\u00eda negar el caso aun cumpliendo requisitos b\u00e1sicos.',
          'La carga de prueba es alta y compleja.'
        ],
        note: 'Por eso, ning\u00fan abogado responsable puede prometer resultados.'
      },
      risks: {
        title: 'Riesgos de basarse solo en rumores',
        text: 'Muchas personas esperan a\u00f1os pensando que el tiempo resolver\u00e1 su situaci\u00f3n. Lamentablemente, esperar sin orientaci\u00f3n adecuada podr\u00eda limitar opciones futuras.',
        list: [
          'Podr\u00eda retrasar otras alternativas legales.',
          'Podr\u00eda aumentar riesgos si ocurre una detenci\u00f3n inesperada.',
          'Podr\u00eda generar falsas expectativas familiares.'
        ]
      },
      conclusion: {
        title: 'Conclusi\u00f3n',
        text: 'La llamada "Ley de los 10 a\u00f1os" no es un camino autom\u00e1tico ni sencillo. Es una defensa legal compleja que solo podr\u00eda evaluarse dentro de un proceso de deportaci\u00f3n, bajo requisitos estrictos y an\u00e1lisis detallado de cada caso.',
        advice: 'Informarse correctamente podr\u00eda marcar la diferencia entre protegerse o exponerse innecesariamente. Antes de tomar decisiones, lo m\u00e1s responsable es buscar orientaci\u00f3n profesional y entender todas las implicaciones.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS \u2013 Cancellation of Removal (INA \u00a7240A(b))',
          'EOIR \u2013 Immigration Court Proceedings',
          'American Immigration Council \u2013 Cancellation of Removal Guide',
          'ILRC \u2013 Deportation Defense Manual'
        ]
      }
    }
  },
  en: {
    metaTitle: '10 Year Rule in Immigration: Myths and Legal Reality',
    metaDesc: 'Think you qualify just by living 10 years in the U.S.? Learn the truth about Cancellation of Removal and why it is not automatic.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Cancellation of Removal',
      date: 'Mar 02, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Do I Qualify for the "10-Year Rule" Just by Living Here? Myths of Cancellation of Removal',
    summary: {
      title: 'Initial Summary',
      text: 'Many people believe that after living 10 years in the United States, they automatically earn the right to residency. However, this idea is not always correct. The so-called <strong>"10-Year Rule"</strong> is actually a legal defense that can only be presented before an immigration judge, under very specific requirements.'
    },
    intro: [
      'It is common to hear phrases like: <strong>"I\u2019ve been here over 10 years, I can fix my status now"</strong>. This belief has been passed down for years among families, friends, and entire communities, generating hope\u2026 but also a lot of confusion.',
      'The reality is that living 10 years in the U.S. alone does not create an automatic immigration benefit.',
      'The so-called "10-Year Rule" refers to <strong>Cancellation of Removal</strong>, a defense that can only be evaluated within proceedings in immigration court.',
      'Understanding this in time could help avoid unnecessary risks and lead to more informed decisions.'
    ],
    sections: {
      whatIs: {
        title: 'What Is the "10-Year Rule" Really?',
        quote: 'It is not an automatic benefit. It is a complex legal defense.',
        text: 'The "10-Year Rule" is not an application filed before immigration in a regular manner. In legal terms, it is known as Cancellation of Removal for non-permanent residents.',
        list: [
          'It is not an automatic benefit.',
          'It is not filed affirmatively.',
          'It can only be considered if the person is already in removal proceedings before a judge.'
        ],
        note: 'This means it is not a preventive option, but a defense within a court case.'
      },
      mythApply: {
        title: 'Common Myth: "I Can Apply on My Own"',
        subtitle: 'One of the most dangerous mistakes',
        text: 'One of the most dangerous mistakes is believing that this defense can be requested directly before immigration.',
        list: [
          'Cancellation of Removal is not filed on one\u2019s own initiative.',
          'Trying to "apply" outside of court could put the person on ICE\u2019s radar.',
          'There is no simple form to "request it."'
        ],
        warning: 'That is why acting without adequate information could generate serious consequences, including initiating removal proceedings.'
      },
      extremeHardship: {
        title: 'The Most Important Requirement: Extreme Hardship to a Family Member',
        subtitle: 'It is not just about time, but about family impact',
        text: 'One of the central elements of this defense is not the time lived, but the impact on a qualifying relative.',
        qualifiedRelatives: [
          'A spouse, parent, or child',
          'Who is a U.S. citizen or lawful permanent resident'
        ],
        damageText: 'This is not about common or basic emotional harm. The judge analyzes whether that family member could suffer "exceptional and extremely unusual hardship."',
        examples: [
          'Serious medical conditions.',
          'Special educational needs.',
          'Severe economic dependence.',
          'Unusual family situations.'
        ],
        note: 'Every case is different and not all family suffering meets this standard.'
      },
      timeAndCharacter: {
        title: 'Physical Time vs. Good Moral Character',
        subtitle: 'Completing 10 years is not enough',
        timeText: 'Generally, the person may need at least 10 years of continuous physical presence in the U.S., without significant interruptions.',
        timeStops: [
          'A formal court notice.',
          'Certain criminal records.'
        ],
        characterText: 'In addition to time, the judge evaluates the person\u2019s behavior during those years.',
        characterFactors: [
          'Arrests or convictions.',
          'False statements.',
          'Tax issues.',
          'Failure to comply with legal obligations.'
        ],
        note: 'Completing 10 years does not automatically eliminate these factors.'
      },
      evenIfQualify: {
        title: 'What Happens If a Person "Meets" All Requirements?',
        text: 'Even if someone believes they meet all the requirements, that does not mean the judge will approve the case.',
        list: [
          'Cancellation of Removal is discretionary.',
          'The judge could deny the case even if basic requirements are met.',
          'The burden of proof is high and complex.'
        ],
        note: 'That is why no responsible attorney can promise results.'
      },
      risks: {
        title: 'Risks of Relying Only on Rumors',
        text: 'Many people wait years thinking that time will resolve their situation. Unfortunately, waiting without proper guidance could limit future options.',
        list: [
          'It could delay other legal alternatives.',
          'It could increase risks if an unexpected detention occurs.',
          'It could create false family expectations.'
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The so-called "10-Year Rule" is not an automatic or simple path. It is a complex legal defense that can only be evaluated within removal proceedings, under strict requirements and detailed analysis of each case.',
        advice: 'Getting properly informed could make the difference between protecting yourself or unnecessarily exposing yourself. Before making decisions, the most responsible thing is to seek professional guidance and understand all the implications.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS \u2013 Cancellation of Removal (INA \u00a7240A(b))',
          'EOIR \u2013 Immigration Court Proceedings',
          'American Immigration Council \u2013 Cancellation of Removal Guide',
          'ILRC \u2013 Deportation Defense Manual'
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
      url: `${SITE_URL}/${lang}/blog/ley-de-los-10-anos-cancelacion-de-deportacion`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-03-02T08:00:00.000Z',
      authors: ['Manuel Sol\u00eds'],
      section: 'Inmigraci\u00f3n',
      tags: ['Ley de los 10 a\u00f1os','Cancelaci\u00f3n de Deportaci\u00f3n','Cancelaci\u00f3n de Remoci\u00f3n','Inmigraci\u00f3n','Deportaci\u00f3n'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/ley-de-los-10-anos-cancelacion-de-deportacion`,
      languages: {
        'es': `${SITE_URL}/es/blog/ley-de-los-10-anos-cancelacion-de-deportacion`,
        'en': `${SITE_URL}/en/blog/ley-de-los-10-anos-cancelacion-de-deportacion`,
        'x-default': `${SITE_URL}/es/blog/ley-de-los-10-anos-cancelacion-de-deportacion`,
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
    { name: t.title, url: `/${lang}/blog/ley-de-los-10-anos-cancelacion-de-deportacion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="ley-de-los-10-anos-cancelacion-de-deportacion"
        date="2025-03-02"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Sol\u00eds"
        category="Inmigraci\u00f3n"
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
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Sol\u00eds</p>
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
                     alt="Ley de los 10 a&ntilde;os, cancelaci&oacute;n de deportaci&oacute;n"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h3 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h3>
                   <p
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">

                  {/* Introducci\u00f3n */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* \u00bfQu\u00e9 es realmente la "Ley de los 10 a\u00f1os"? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIs.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIs.note}
                    </div>
                  </section>

                  {/* Mito com\u00fan: "Puedo aplicar por mi cuenta" */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.mythApply.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.mythApply.subtitle}</p>

                    <p className="mb-4">{t.sections.mythApply.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.mythApply.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.mythApply.warning}
                      </p>
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Cancelaci&oacute;n de deportaci&oacute;n, da&ntilde;o extremo familiar"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* El requisito m\u00e1s importante: el da\u00f1o extremo a un familiar */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Heart size={24} className="text-[#B2904D]" /></div>
                      {t.sections.extremeHardship.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.extremeHardship.subtitle}</p>

                    <p className="mb-4">{t.sections.extremeHardship.text}</p>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
                      <p className="text-white font-bold mb-3">{lang === 'es' ? 'Familiar calificado:' : 'Qualifying relative:'}</p>
                      <ul className="grid gap-3 list-none pl-0 m-0">
                        {t.sections.extremeHardship.qualifiedRelatives.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mb-4">{t.sections.extremeHardship.damageText}</p>

                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.extremeHardship.examples.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.extremeHardship.note}
                    </div>
                  </section>

                  {/* Tiempo f\u00edsico vs. buen car\u00e1cter moral */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.timeAndCharacter.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.timeAndCharacter.subtitle}</p>

                    <p className="mb-4">{t.sections.timeAndCharacter.timeText}</p>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
                      <p className="text-white font-bold mb-3">{lang === 'es' ? 'El tiempo podr\u00eda detenerse por:' : 'Time could stop due to:'}</p>
                      <ul className="grid gap-3 list-none pl-0 m-0">
                        {t.sections.timeAndCharacter.timeStops.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <AlertCircle size={20} className="text-red-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mb-4">{t.sections.timeAndCharacter.characterText}</p>

                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.timeAndCharacter.characterFactors.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.timeAndCharacter.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Cancelaci&oacute;n de remoci&oacute;n, requisitos del juez de inmigraci&oacute;n"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* \u00bfQu\u00e9 pasa si una persona "cumple" con todo? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.evenIfQualify.title}
                    </h2>
                    <p className="mb-4">{t.sections.evenIfQualify.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.evenIfQualify.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.evenIfQualify.note}
                    </div>
                  </section>

                  {/* Riesgos de basarse solo en rumores */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.risks.title}
                    </h2>
                    <p className="mb-4">{t.sections.risks.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.risks.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Conclusi\u00f3n CTA */}
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Sol\u00eds</h4>
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
            articles={getRelatedArticles('ley-de-los-10-anos-cancelacion-de-deportacion', (lang as 'es' | 'en') || 'es')}
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
