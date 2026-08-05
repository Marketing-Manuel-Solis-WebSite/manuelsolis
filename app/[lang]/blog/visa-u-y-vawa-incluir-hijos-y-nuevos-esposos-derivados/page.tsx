import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
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
  article: '/blog/blog_10/B10_CR1.png',
  inside1: '/blog/blog_10/B10_CR2.png',
  inside2: '/blog/blog_10/B10_CR3.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Visa U y VAWA: Incluir hijos y cónyuges derivados',
    metaDesc: '¿Tienes una Visa U o VAWA en trámite? Descubre cómo incluir a hijos o pareja como derivados y proteger a tu familia legalmente.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '8 min de lectura',
      tags: 'Derivados Visa U y VAWA',
      date: '16 Feb, 2026',
      time: '8 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Visa U y VAWA: Incluir a hijos y nuevos esposos (Derivados)',
    summary: {
      title: 'Resumen inicial',
      text: '¿Solicitaste la <strong>Visa U</strong> o <strong>VAWA</strong> y te preocupa qué pasará con tus hijos o tu nueva pareja? Este artículo te explica cómo incluir a familiares como <strong>derivados</strong> en tu caso, los requisitos, los límites de edad y cómo reunificar a tu familia legalmente dentro o fuera de Estados Unidos.'
    },
    intro: [
      'Cuando alguien inicia una solicitud de Visa U o VAWA, lo hace buscando protección, estabilidad y una nueva oportunidad. Pero una vez el caso avanza, surge otra preocupación aún más fuerte:',
      '<strong>"¿Podré traer a mis hijos?"</strong> o <strong>"¿Mi nueva pareja podría arreglar conmigo?"</strong>',
      'La buena noticia es que sí existen opciones legales para incluir a ciertos familiares en tu caso como "derivados". Esto no solo protege a la víctima principal, sino que expande ese beneficio a su núcleo familiar, ya sea dentro de EE. UU. o en el extranjero.',
      'Este artículo te explica cómo funciona este proceso, quién califica, qué formularios se deben presentar y cuál es la edad máxima para incluir a tus hijos antes de que sea demasiado tarde.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es un derivado en inmigración?',
        quote: 'El beneficio que podría proteger a tu familia.',
        text: 'En el contexto de la Visa U y VAWA, un derivado es un familiar que podría obtener beneficios migratorios a través del solicitante principal, sin haber sido víctima directa del crimen o abuso.',
        text2: 'No es automático. Se debe solicitar por separado, cumpliendo ciertos requisitos, pero es una vía legal poderosa para reunir o proteger a la familia del solicitante.'
      },
      visaUDerivados: {
        title: 'Visa U derivados: ¿a quién podrías incluir?',
        subtitle: 'Dependiendo de si eres víctima directa o derivada',
        text: 'Si eres el solicitante principal de una Visa U, podrías incluir como derivados a:',
        list1: [
          'Cónyuge (legalmente casado/a al momento de la solicitud)',
          'Hijos solteros menores de 21 años'
        ],
        text2: 'Si eres menor de 21 años y solicitante principal, podrías además incluir a:',
        list2: [
          'Padres',
          'Hermanos solteros menores de 18 años'
        ],
        note: 'La relación debe existir antes de que se apruebe la Visa U. Si te casas o tienes un hijo después, no se podrían incluir como derivados, aunque sí podrían beneficiarse más adelante cuando solicites la residencia.'
      },
      vawaFamily: {
        title: 'VAWA y la reunificación familiar',
        subtitle: '¿Puedo incluir a mis hijos o nuevo esposo/a?',
        text: 'En VAWA, podrías incluir en tu solicitud a:',
        mainBenefit: 'Hijos solteros menores de 21 años, aunque no hayan sido víctimas del abuso.',
        applies: [
          'Estás solicitando VAWA como esposo/a maltratado/a',
          'Como padre/madre maltratado/a por un hijo ciudadano',
          'Como hijo/a maltratado/a'
        ],
        note: 'No podrías incluir a una nueva pareja como derivado directo en VAWA, pero si te casas después de obtener la residencia por VAWA, sí podrás pedirlo como cónyuge en una petición familiar regular.'
      },
      ageFactor: {
        title: 'Edad máxima para hijos: el factor más crítico',
        subtitle: 'Cómo evitar que "se queden fuera" por unos meses',
        text: 'Uno de los errores más tristes en estos procesos es perder el beneficio para un hijo porque pasó los 21 años sin haber sido incluido a tiempo.',
        strategies: [
          'En Visa U, el hijo debe ser soltero y menor de 21 años al momento en que se presenta el Formulario I-918A.',
          'En VAWA, lo ideal es incluirlo en el Formulario I-360 antes de que cumpla 21.',
          'Hay una protección llamada CSPA (Child Status Protection Act) que podría congelar la edad en ciertos casos, pero no aplica automáticamente. Requiere análisis legal.'
        ],
        warning: 'Si tus hijos están por cumplir 21 años, habla con un abogado inmediatamente para evaluar si podrías incluirlos antes de que sea tarde.'
      },
      abroad: {
        title: '¿Y si mis hijos están fuera de Estados Unidos?',
        subtitle: 'También podrían recibir la visa desde su país',
        text: 'Sí. Tus hijos derivados podrían:',
        list: [
          'Esperar en su país mientras se procesa tu caso',
          'Recibir la Visa U o Visa de inmigrante en el consulado correspondiente, si son aprobados como derivados'
        ],
        note: 'Es un proceso más lento, pero totalmente posible. Muchos padres se sorprenden al saber que no necesitan estar físicamente con sus hijos en EE. UU. para iniciar su reunificación.'
      },
      realCases: {
        title: 'Casos reales: proteger más que a uno solo',
        case1: {
          name: 'Ana: VAWA y sus dos hijos adolescentes',
          text: 'Ana, víctima de violencia doméstica, inició su caso VAWA con ayuda legal. Al incluir a sus dos hijos (17 y 13), logró que toda la familia obtuviera protección migratoria, sin que ellos estuvieran involucrados directamente en el abuso.'
        },
        case2: {
          name: 'Luis: Visa U con esposa e hija fuera del país',
          text: 'Luis fue víctima de un robo violento y colaboró con la policía. Inició su Visa U y agregó a su esposa e hija de 9 años, que aún vivían en su país de origen. Aunque el proceso fue largo, hoy viven juntos en EE. UU. de forma legal.'
        },
        footer: 'Estos casos muestran que tu proceso podría ser el inicio de algo más grande para toda tu familia.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Iniciar una solicitud de Visa U o VAWA no tiene por qué ser un camino solitario. La ley permite que tu esfuerzo y valentía también protejan a quienes amas, siempre que lo hagas a tiempo y con estrategia.',
        advice: 'Si ya tienes una solicitud pendiente o aprobada, evalúa inmediatamente si podrías incluir a tus hijos o a tu cónyuge como derivados. No esperes a que sea tarde. Una llamada o consulta podría marcar la diferencia entre un caso individual y un cambio de vida familiar.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Visa U Derivatives',
          'USCIS – VAWA Self-Petitioning Provisions',
          'ILRC – Child Status Protection Act (CSPA) Guide',
          'American Immigration Council – U Visa and Family Members'
        ]
      }
    }
  },
  en: {
    metaTitle: 'U Visa & VAWA: Adding Children and Spouses',
    metaDesc: 'Do you have a pending U Visa or VAWA? Learn how to include children or a spouse as derivatives and legally protect your family.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '8 min read',
      tags: 'U Visa & VAWA Derivatives',
      date: 'Feb 16, 2026',
      time: '8 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'U Visa & VAWA: Including Children and New Spouses (Derivatives)',
    summary: {
      title: 'Initial Summary',
      text: 'Did you apply for a <strong>U Visa</strong> or <strong>VAWA</strong> and are worried about what will happen with your children or new partner? This article explains how to include family members as <strong>derivatives</strong> in your case, the requirements, age limits, and how to legally reunify your family inside or outside the United States.'
    },
    intro: [
      'When someone files a U Visa or VAWA petition, they do so seeking protection, stability, and a new opportunity. But once the case moves forward, an even stronger concern arises:',
      '<strong>"Will I be able to bring my children?"</strong> or <strong>"Could my new partner apply with me?"</strong>',
      'The good news is that there are legal options to include certain family members in your case as "derivatives." This not only protects the principal applicant but extends that benefit to their family, whether inside the U.S. or abroad.',
      'This article explains how this process works, who qualifies, what forms must be filed, and the maximum age to include your children before it\'s too late.'
    ],
    sections: {
      whatIs: {
        title: 'What Is a Derivative in Immigration?',
        quote: 'The benefit that could protect your family.',
        text: 'In the context of the U Visa and VAWA, a derivative is a family member who could obtain immigration benefits through the principal applicant, without having been a direct victim of the crime or abuse.',
        text2: 'It is not automatic. It must be requested separately, meeting certain requirements, but it is a powerful legal pathway to reunite or protect the applicant\'s family.'
      },
      visaUDerivados: {
        title: 'U Visa Derivatives: Who Can You Include?',
        subtitle: 'Depending on whether you are a direct victim or derivative',
        text: 'If you are the principal U Visa applicant, you may include as derivatives:',
        list1: [
          'Spouse (legally married at the time of the application)',
          'Unmarried children under 21 years old'
        ],
        text2: 'If you are under 21 and the principal applicant, you may also include:',
        list2: [
          'Parents',
          'Unmarried siblings under 18 years old'
        ],
        note: 'The relationship must exist before the U Visa is approved. If you marry or have a child afterward, they cannot be included as derivatives, although they may benefit later when you apply for residency.'
      },
      vawaFamily: {
        title: 'VAWA and Family Reunification',
        subtitle: 'Can I include my children or new spouse?',
        text: 'Under VAWA, you may include in your petition:',
        mainBenefit: 'Unmarried children under 21 years old, even if they were not victims of the abuse.',
        applies: [
          'You are filing VAWA as an abused spouse',
          'As an abused parent by a U.S. citizen child',
          'As an abused child'
        ],
        note: 'You cannot include a new partner as a direct derivative under VAWA, but if you marry after obtaining residency through VAWA, you can petition for them as a spouse through a regular family petition.'
      },
      ageFactor: {
        title: 'Maximum Age for Children: The Most Critical Factor',
        subtitle: 'How to prevent them from being "left out" by a few months',
        text: 'One of the saddest mistakes in these processes is losing the benefit for a child because they turned 21 without being included in time.',
        strategies: [
          'For the U Visa, the child must be unmarried and under 21 when Form I-918A is filed.',
          'For VAWA, ideally include them on Form I-360 before they turn 21.',
          'There is a protection called CSPA (Child Status Protection Act) that may freeze the age in certain cases, but it does not apply automatically. It requires legal analysis.'
        ],
        warning: 'If your children are about to turn 21, speak with an attorney immediately to evaluate whether you can include them before it\'s too late.'
      },
      abroad: {
        title: 'What If My Children Are Outside the United States?',
        subtitle: 'They may also receive the visa from their country',
        text: 'Yes. Your derivative children may:',
        list: [
          'Wait in their country while your case is processed',
          'Receive the U Visa or immigrant visa at the corresponding consulate, if approved as derivatives'
        ],
        note: 'It is a slower process, but entirely possible. Many parents are surprised to learn that they do not need to be physically with their children in the U.S. to start the reunification process.'
      },
      realCases: {
        title: 'Real Cases: Protecting More Than Just One Person',
        case1: {
          name: 'Ana: VAWA and Her Two Teenage Children',
          text: 'Ana, a domestic violence victim, started her VAWA case with legal help. By including her two children (ages 17 and 13), the entire family obtained immigration protection, without the children being directly involved in the abuse.'
        },
        case2: {
          name: 'Luis: U Visa with Wife and Daughter Abroad',
          text: 'Luis was the victim of a violent robbery and cooperated with police. He filed his U Visa and added his wife and 9-year-old daughter, who still lived in their home country. Although the process was long, they now live together in the U.S. legally.'
        },
        footer: 'These cases show that your process could be the beginning of something much bigger for your entire family.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Filing a U Visa or VAWA petition does not have to be a lonely path. The law allows your effort and courage to also protect those you love, as long as you act in time and with strategy.',
        advice: 'If you already have a pending or approved petition, immediately evaluate whether you can include your children or spouse as derivatives. Don\'t wait until it\'s too late. One call or consultation could make the difference between an individual case and a life-changing family outcome.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – U Visa Derivatives',
          'USCIS – VAWA Self-Petitioning Provisions',
          'ILRC – Child Status Protection Act (CSPA) Guide',
          'American Immigration Council – U Visa and Family Members'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;
  
  const social = buildSocialMetadata({
    lang: lang === 'en' ? 'en' : 'es',
    path: `/${lang}/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-02-16T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Visa U','VAWA','Derivados','Hijos','Cónyuge','Reunificación familiar'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`,
      languages: {
        'es': `${SITE_URL}/es/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`,
        'en': `${SITE_URL}/en/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`,
        'x-default': `${SITE_URL}/es/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`,
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
    { name: t.title, url: `/${lang}/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados"
        date="2026-02-16"
        image={IMAGES.article}
        lang={lang as string}
        readTime="8"
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
                     alt="Visa U y VAWA derivados familia"
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

                  {/* ¿Qué es un derivado? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIs.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <p>{t.sections.whatIs.text2}</p>
                  </section>

                  {/* Visa U Derivados */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.visaUDerivados.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.visaUDerivados.subtitle}</p>
                    
                    <p className="mb-4">{t.sections.visaUDerivados.text}</p>
                    <ul className="grid gap-3 mt-4 mb-8 list-none pl-0">
                      {t.sections.visaUDerivados.list1.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4">{t.sections.visaUDerivados.text2}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.visaUDerivados.list2.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.visaUDerivados.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image 
                       src={IMAGES.inside1} 
                       alt="VAWA reunificación familiar derivados"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* VAWA y reunificación */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Heart size={24} className="text-[#B2904D]" /></div>
                      {t.sections.vawaFamily.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.vawaFamily.subtitle}</p>
                    
                    <p className="mb-4">{t.sections.vawaFamily.text}</p>
                    
                    <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 mb-6">
                      <p className="text-white font-bold text-lg flex items-center gap-2 m-0">
                        <ShieldCheck size={20} className="text-[#B2904D]" />
                        {t.sections.vawaFamily.mainBenefit}
                      </p>
                    </div>

                    <p className="mb-4">Esto aplica tanto si:</p>
                    <ul className="grid gap-3 mt-2 mb-6 list-none pl-0">
                      {t.sections.vawaFamily.applies.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.vawaFamily.note}
                    </div>
                  </section>

                  {/* Edad máxima */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.ageFactor.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.ageFactor.subtitle}</p>
                    
                    <p className="mb-6">{t.sections.ageFactor.text}</p>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <ul className="space-y-4 list-none pl-0 m-0">
                        {t.sections.ageFactor.strategies.map((item, idx) => (
                           <li key={idx} className="flex gap-3 items-start">
                             <div className="w-8 h-8 rounded-full bg-[#B2904D]/20 flex items-center justify-center shrink-0 mt-0.5">
                               <span className="text-[#B2904D] font-bold text-sm">{idx + 1}</span>
                             </div>
                             <span>{item}</span>
                           </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.ageFactor.warning}
                      </p>
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image 
                       src={IMAGES.inside2} 
                       alt="Hijos derivados fuera de Estados Unidos"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Hijos en el extranjero */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Globe size={24} className="text-[#B2904D]" /></div>
                      {t.sections.abroad.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.abroad.subtitle}</p>
                    
                    <p className="mb-4">{t.sections.abroad.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.abroad.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-white/60">{t.sections.abroad.note}</p>
                  </section>

                  {/* Casos reales */}
                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8">{t.sections.realCases.title}</h2>
                    
                    <div className="space-y-6">
                      {/* Caso Ana */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={100} />
                         </div>
                         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                           <Heart size={20} className="text-[#B2904D]" />
                           {t.sections.realCases.case1.name}
                         </h3>
                         <p className="text-white/80 m-0">{t.sections.realCases.case1.text}</p>
                      </div>

                      {/* Caso Luis */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={100} />
                         </div>
                         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                           <Globe size={20} className="text-[#B2904D]" />
                           {t.sections.realCases.case2.name}
                         </h3>
                         <p className="text-white/80 m-0">{t.sections.realCases.case2.text}</p>
                      </div>
                    </div>

                    <p className="mt-6 font-medium text-white">{t.sections.realCases.footer}</p>
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
            articles={getRelatedArticles('visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', (lang as 'es' | 'en') || 'es')}
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
