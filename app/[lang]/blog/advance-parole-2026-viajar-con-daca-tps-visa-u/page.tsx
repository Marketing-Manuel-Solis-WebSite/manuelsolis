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
  article: '/blog/blog_12/BLOG02_CR1.png',
  inside1: '/blog/blog_12/BLOG02_CR2.png',
  inside2: '/blog/blog_12/BLOG02_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Advance Parole 2026: viajar con DACA o TPS',
    metaDesc: '¿Tienes DACA o TPS y quieres viajar? Conoce los riesgos y posibles beneficios del Advance Parole en 2026 y cuándo podría ayudarte.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'Advance Parole 2026',
      date: '05 Mar, 2025',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Advance Parole 2026: ¿Es seguro viajar a mi país con DACA, TPS o Visa U pendiente?',
    summary: {
      title: 'Resumen inicial',
      text: 'El miedo a salir de Estados Unidos y no poder regresar es una de las mayores preocupaciones para muchos inmigrantes. El <strong>Advance Parole</strong> es un permiso de viaje que, en ciertos casos, podría permitir una salida y entrada legal al país. En este artículo explicamos qué es, quiénes podrían solicitarlo y cuándo viajar podría ser una decisión estratégica… y cuándo no.'
    },
    intro: [
      'Para muchas personas con DACA, TPS o trámites migratorios pendientes, viajar fuera de EE. UU. no es una decisión sencilla. El simple pensamiento de cruzar la frontera genera ansiedad, miedo e incertidumbre, especialmente cuando hay familiares, trabajo y una vida construida aquí.',
      'Durante años, el Advance Parole ha sido visto tanto como una oportunidad como un riesgo. Algunas personas lo consideran una herramienta clave; otras temen quedarse <strong>"atrapadas" fuera del país</strong>.',
      'La realidad es que no todos los casos son iguales, y entender cómo funciona este permiso podría ayudar a tomar decisiones más informadas.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es el Advance Parole?',
        quote: 'Un permiso de viaje que podría permitir salir y solicitar reingreso legal.',
        text: 'El Advance Parole es un permiso de viaje que, si es aprobado, podría permitir a ciertas personas salir de EE. UU. y solicitar reingreso de forma legal.',
        list: [
          'No es una visa.',
          'No garantiza el reingreso.',
          'Cada solicitud se evalúa de manera individual.'
        ],
        note: 'El reingreso final siempre queda sujeto a la inspección de las autoridades migratorias al momento de volver.'
      },
      whoQualifies: {
        title: '¿Quiénes podrían solicitar Advance Parole?',
        subtitle: 'No todas las personas califican',
        text: 'No todas las personas califican para este permiso. En términos generales, podrían existir opciones para:',
        dacaSection: {
          title: 'Personas con DACA',
          text: 'Quienes tienen DACA podrían solicitar Advance Parole por razones específicas:',
          list: [
            'Razones humanitarias (enfermedad grave de un familiar, funeral).',
            'Motivos educativos.',
            'Oportunidades laborales.'
          ],
          note: 'No todas las razones son aceptadas, y cada solicitud se analiza caso por caso.'
        },
        tpsSection: {
          title: 'Personas con TPS',
          text: 'Algunas personas con Estatus de Protección Temporal podrían solicitar permiso de viaje mientras su TPS esté vigente, dependiendo de su historial migratorio y otros factores.'
        },
        pendingSection: {
          title: 'Personas con trámites pendientes',
          text: 'En ciertos contextos, personas con solicitudes de ajuste u otros procesos abiertos podrían explorar esta opción, siempre con análisis previo.'
        }
      },
      legalEntry: {
        title: 'La importancia de la "entrada legal"',
        subtitle: 'Inspection and Admission',
        text: 'Uno de los temas más mencionados sobre el Advance Parole es la llamada entrada legal, también conocida como Inspection and Admission.',
        benefits: [
          'Facilitar ciertos trámites migratorios en el futuro.',
          'Ser un elemento importante para cónyuges de ciudadanos estadounidenses que buscan ajustar estatus.'
        ],
        warnings: [
          'No todas las entradas generan el mismo efecto legal.',
          'No todas las personas se benefician de la misma manera.',
          'El impacto depende del historial migratorio completo.'
        ],
        note: 'Hablar de "beneficio automático" no sería correcto.'
      },
      travelRisks: {
        title: 'Mitos sobre quedarse atrapado fuera de EE. UU.',
        subtitle: 'Cuándo viajar podría ser riesgoso y cuándo no',
        riskyList: [
          'Órdenes de deportación previas.',
          'Presencia ilegal prolongada sin análisis previo.',
          'Historial penal.',
          'Procesos migratorios complejos o inconsistentes.'
        ],
        safeText: 'En otros escenarios, y tras un análisis cuidadoso, algunas personas con DACA o TPS podrían viajar y regresar sin complicaciones. Todo depende del expediente migratorio completo, no solo del estatus actual.',
        note: 'Por eso, generalizar nunca es una buena idea.'
      },
      visaUPending: {
        title: '¿Y qué pasa con la Visa U pendiente?',
        text: 'Algunas personas con solicitudes de Visa U en proceso se preguntan si viajar es posible.',
        list: [
          'Tener una Visa U pendiente no equivale a protección automática.',
          'Viajar con un caso pendiente podría afectar el proceso, dependiendo del contexto.',
          'Las políticas migratorias pueden cambiar, y el análisis siempre debe ser individual.'
        ],
        note: 'Antes de considerar cualquier salida del país, revisar el impacto potencial es clave.'
      },
      worthIt2026: {
        title: '¿Vale la pena considerar Advance Parole en 2026?',
        text: 'En 2026, el Advance Parole sigue siendo una herramienta que podría ser útil para algunas personas, pero no para todas.',
        list: [
          'No existe una respuesta universal.',
          'Lo que funcionó para alguien más no necesariamente funcionará igual en otro caso.',
          'Informarse antes de viajar podría evitar errores difíciles de revertir.'
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Viajar fuera de EE. UU. con DACA, TPS o un trámite pendiente es una decisión que no debe tomarse a la ligera. El Advance Parole podría abrir oportunidades en ciertos escenarios, pero también podría implicar riesgos si no se analiza correctamente.',
        advice: 'Antes de comprar boletos o planear un viaje, informarte y buscar orientación adecuada podría marcar una gran diferencia.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Advance Parole (Form I-131)',
          'USCIS – DACA and Travel',
          'American Immigration Council – Advance Parole Guide',
          'ILRC – TPS Holder Travel Advisory'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Advance Parole 2026: Traveling with DACA or TPS',
    metaDesc: 'Have DACA or TPS and want to travel? Learn the risks and possible benefits of Advance Parole in 2026 and when it could help you.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'Advance Parole 2026',
      date: 'Mar 05, 2025',
      time: '9 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Advance Parole 2026: Is It Safe to Travel with DACA, TPS, or a Pending U Visa?',
    summary: {
      title: 'Initial Summary',
      text: 'The fear of leaving the United States and not being able to return is one of the greatest concerns for many immigrants. <strong>Advance Parole</strong> is a travel permit that, in certain cases, could allow a legal exit and re-entry into the country. In this article, we explain what it is, who could apply for it, and when traveling could be a strategic decision... and when it might not be.'
    },
    intro: [
      'For many people with DACA, TPS, or pending immigration processes, traveling outside the U.S. is not a simple decision. The mere thought of crossing the border generates anxiety, fear, and uncertainty, especially when there are family members, jobs, and an entire life built here.',
      'For years, Advance Parole has been seen as both an opportunity and a risk. Some people consider it a key tool; others fear getting <strong>"trapped" outside the country</strong>.',
      'The reality is that not all cases are the same, and understanding how this permit works could help make more informed decisions.'
    ],
    sections: {
      whatIs: {
        title: 'What Is Advance Parole?',
        quote: 'A travel permit that could allow you to leave and request legal re-entry.',
        text: 'Advance Parole is a travel permit that, if approved, could allow certain individuals to leave the U.S. and request legal re-entry.',
        list: [
          'It is not a visa.',
          'It does not guarantee re-entry.',
          'Each application is evaluated individually.'
        ],
        note: 'Final re-entry is always subject to inspection by immigration authorities at the time of return.'
      },
      whoQualifies: {
        title: 'Who Could Apply for Advance Parole?',
        subtitle: 'Not everyone qualifies',
        text: 'Not everyone qualifies for this permit. In general terms, options may exist for:',
        dacaSection: {
          title: 'People with DACA',
          text: 'Those with DACA may apply for Advance Parole for specific reasons:',
          list: [
            'Humanitarian reasons (serious illness of a family member, funeral).',
            'Educational purposes.',
            'Employment opportunities.'
          ],
          note: 'Not all reasons are accepted, and each application is analyzed on a case-by-case basis.'
        },
        tpsSection: {
          title: 'People with TPS',
          text: 'Some individuals with Temporary Protected Status may apply for travel authorization while their TPS is active, depending on their immigration history and other factors.'
        },
        pendingSection: {
          title: 'People with Pending Applications',
          text: 'In certain contexts, individuals with adjustment applications or other open processes could explore this option, always with prior analysis.'
        }
      },
      legalEntry: {
        title: 'The Importance of "Legal Entry"',
        subtitle: 'Inspection and Admission',
        text: 'One of the most discussed topics about Advance Parole is the so-called legal entry, also known as Inspection and Admission.',
        benefits: [
          'Facilitate certain immigration processes in the future.',
          'Be an important element for spouses of U.S. citizens seeking to adjust status.'
        ],
        warnings: [
          'Not all entries generate the same legal effect.',
          'Not all individuals benefit in the same way.',
          'The impact depends on the complete immigration history.'
        ],
        note: 'Speaking of an "automatic benefit" would not be accurate.'
      },
      travelRisks: {
        title: 'Myths About Getting Stuck Outside the U.S.',
        subtitle: 'When traveling could be risky and when it might not be',
        riskyList: [
          'Prior deportation orders.',
          'Prolonged unlawful presence without prior analysis.',
          'Criminal history.',
          'Complex or inconsistent immigration processes.'
        ],
        safeText: 'In other scenarios, and after careful analysis, some people with DACA or TPS could travel and return without complications. It all depends on the complete immigration file, not just the current status.',
        note: 'That is why generalizing is never a good idea.'
      },
      visaUPending: {
        title: 'What About a Pending U Visa?',
        text: 'Some individuals with pending U Visa applications wonder if traveling is possible.',
        list: [
          'Having a pending U Visa does not equal automatic protection.',
          'Traveling with a pending case could affect the process, depending on the context.',
          'Immigration policies can change, and the analysis should always be individual.'
        ],
        note: 'Before considering any departure from the country, reviewing the potential impact is key.'
      },
      worthIt2026: {
        title: 'Is It Worth Considering Advance Parole in 2026?',
        text: 'In 2026, Advance Parole remains a tool that could be useful for some people, but not for everyone.',
        list: [
          'There is no universal answer.',
          'What worked for someone else will not necessarily work the same in another case.',
          'Getting informed before traveling could prevent mistakes that are difficult to reverse.'
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Traveling outside the U.S. with DACA, TPS, or a pending application is a decision that should not be taken lightly. Advance Parole could open opportunities in certain scenarios, but it could also carry risks if not properly analyzed.',
        advice: 'Before buying tickets or planning a trip, getting informed and seeking proper guidance could make a big difference.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Advance Parole (Form I-131)',
          'USCIS – DACA and Travel',
          'American Immigration Council – Advance Parole Guide',
          'ILRC – TPS Holder Travel Advisory'
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
      url: `${SITE_URL}/${lang}/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-03-05T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Advance Parole','DACA','TPS','Visa U','Permiso de viaje','Inmigración 2026'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`,
      languages: {
        'es': `${SITE_URL}/es/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`,
        'en': `${SITE_URL}/en/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`,
        'x-default': `${SITE_URL}/es/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`,
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
    { name: t.title, url: `/${lang}/blog/advance-parole-2026-viajar-con-daca-tps-visa-u` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="advance-parole-2026-viajar-con-daca-tps-visa-u"
        date="2025-03-05"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
      />
      <Script
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
                    fill
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
                     alt="Advance Parole 2026 viajar con DACA TPS Visa U"
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

                  {/* Introducción */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Sección 1: ¿Qué es el Advance Parole? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIs.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.whatIs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-white/60">
                      {t.sections.whatIs.note}
                    </p>
                  </section>

                  {/* Sección 2: ¿Quiénes podrían solicitar? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoQualifies.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoQualifies.subtitle}</p>

                    <p className="mb-8">{t.sections.whoQualifies.text}</p>

                    {/* DACA */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.whoQualifies.dacaSection.title}</h4>
                      <p className="mb-4">{t.sections.whoQualifies.dacaSection.text}</p>
                      <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                        {t.sections.whoQualifies.dacaSection.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                        <AlertCircle size={16} className="inline mr-2" />
                        {t.sections.whoQualifies.dacaSection.note}
                      </div>
                    </div>

                    {/* TPS */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.whoQualifies.tpsSection.title}</h4>
                      <p className="m-0">{t.sections.whoQualifies.tpsSection.text}</p>
                    </div>

                    {/* Trámites pendientes */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.whoQualifies.pendingSection.title}</h4>
                      <p className="m-0">{t.sections.whoQualifies.pendingSection.text}</p>
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Advance Parole entrada legal inspección"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: La importancia de la entrada legal */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.legalEntry.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.legalEntry.subtitle}</p>

                    <p className="mb-6">{t.sections.legalEntry.text}</p>

                    <p className="mb-4 font-medium text-white">{lang === 'es' ? 'Un reingreso con Advance Parole podría:' : 'A re-entry with Advance Parole could:'}</p>
                    <ul className="grid gap-3 mt-4 mb-8 list-none pl-0">
                      {t.sections.legalEntry.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4 font-medium text-white">{lang === 'es' ? 'Sin embargo, hay que tener en cuenta que:' : 'However, keep in mind that:'}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.legalEntry.warnings.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-amber-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.legalEntry.note}
                    </div>
                  </section>

                  {/* Sección 4: Mitos sobre quedarse atrapado */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.travelRisks.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.travelRisks.subtitle}</p>

                    <p className="mb-4 font-medium text-white">{lang === 'es' ? 'Viajar podría ser riesgoso si existen:' : 'Traveling could be risky if there are:'}</p>
                    <ul className="grid gap-3 mt-4 mb-8 list-none pl-0">
                      {t.sections.travelRisks.riskyList.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4">{t.sections.travelRisks.safeText}</p>
                    <p className="text-sm text-white/60">{t.sections.travelRisks.note}</p>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Visa U pendiente viaje fuera de Estados Unidos"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 5: Visa U pendiente */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.visaUPending.title}
                    </h2>
                    <p className="mb-6">{t.sections.visaUPending.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.visaUPending.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-amber-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.visaUPending.note}
                    </div>
                  </section>

                  {/* Sección 6: ¿Vale la pena en 2026? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><TrendingUp size={24} className="text-[#B2904D]" /></div>
                      {t.sections.worthIt2026.title}
                    </h2>
                    <p className="mb-6">{t.sections.worthIt2026.text}</p>
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.worthIt2026.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
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
            articles={getRelatedArticles('advance-parole-2026-viajar-con-daca-tps-visa-u', (lang as 'es' | 'en') || 'es')}
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
