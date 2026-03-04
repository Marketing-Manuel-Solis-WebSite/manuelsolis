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


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_13/BLOG03_CR1.png',
  inside1: '/blog/blog_13/BLOG03_CR2.png',
  inside2: '/blog/blog_13/BLOG03_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Residencia laboral entrando indocumentado: EB-3 y 245(i) | Manuel Solís',
    metaDesc: '¿Tu jefe quiere pedirte la residencia? Conoce si una visa laboral podría funcionar si entraste indocumentado y los riesgos del proceso.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Residencia laboral EB-3',
      date: '08 Mar, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: '¿Puede mi patrón pedirme la residencia si entré indocumentado? Visas EB-3 y la Ley 245(i)',
    summary: {
      title: 'Resumen inicial',
      text: 'Ante la escasez de trabajadores en Estados Unidos, cada vez más empleadores ofrecen "pedir los papeles" a sus empleados. Sin embargo, una certificación laboral aprobada <strong>no siempre soluciona la entrada indocumentada</strong>. En este artículo explicamos cómo funciona el proceso laboral, cuáles son los principales obstáculos y en qué casos podría existir una excepción, como la <strong>Ley 245(i)</strong>.'
    },
    intro: [
      'Para muchas personas que han trabajado durante años de forma constante, escuchar a su patrón decir <strong>"yo te pido"</strong> genera esperanza inmediata. Después de todo, hay empleo estable, necesidad de mano de obra y buena relación laboral.',
      'Pero en inmigración, la intención del empleador no siempre es suficiente.',
      'Aunque el proceso laboral es una vía válida en ciertos escenarios, <strong>entrar sin inspección cambia por completo el panorama legal</strong>.',
      'Entender esta diferencia podría ayudar a evitar decisiones que impliquen riesgos serios, especialmente cuando se habla de salir del país para continuar el trámite.'
    ],
    sections: {
      howPERMWorks: {
        title: '¿Cómo funciona una petición laboral (PERM) en términos simples?',
        quote: 'El PERM confirma la necesidad laboral, no el estatus migratorio.',
        text: 'La mayoría de los procesos laborales para residencia comienzan con la Certificación Laboral, también conocida como PERM.',
        list: [
          'El empleador necesita llenar un puesto específico.',
          'No hay trabajadores disponibles en EE. UU. para ese puesto.',
          'El salario cumple con los estándares establecidos.'
        ],
        note: 'Este trámite no es del trabajador, sino del empleador. Si es aprobado, solo confirma la necesidad laboral, no el estatus migratorio del empleado.'
      },
      permMyth: {
        title: 'El error común: pensar que el PERM "arregla todo"',
        subtitle: 'Una certificación laboral no cura la entrada indocumentada',
        text: 'Uno de los mitos más frecuentes es creer que una certificación laboral aprobada arregla automáticamente la situación migratoria.',
        list: [
          'El PERM no cura la entrada indocumentada.',
          'No borra presencia ilegal acumulada.',
          'No evita castigos migratorios por salir del país.'
        ],
        note: 'Por eso, tener un PERM aprobado no significa que el siguiente paso sea sencillo.'
      },
      consularAndPenalties: {
        title: 'El gran obstáculo: el proceso consular y los castigos',
        subtitle: 'Salir del país podría activar castigos migratorios',
        text: 'Para muchas personas que entraron sin inspección, el camino laboral implica salir de EE. UU. para una entrevista consular.',
        penalties: [
          'Castigo de 3 años (presencia ilegal de más de 180 días).',
          'Castigo de 10 años (presencia ilegal de más de un año).'
        ],
        penaltiesNote: 'Estos castigos no desaparecen por tener una oferta laboral.',
        waiverText: 'En algunos casos, podrían existir perdones provisionales, pero no todas las personas podrían calificar. Los requisitos son estrictos y el análisis depende del historial migratorio completo.',
        warning: 'Salir sin una estrategia clara podría dejar a la persona fuera por años.'
      },
      law245i: {
        title: 'La excepción clave: la Ley 245(i)',
        subtitle: 'La llamada "excepción de oro"',
        text: 'Dentro de este complejo panorama, existe una excepción importante conocida como la Ley 245(i).',
        whatIs: 'Es una disposición legal que podría permitir a ciertas personas ajustar estatus dentro de EE. UU. a pesar de haber entrado sin inspección.',
        requirements: [
          'La persona fue beneficiaria de una petición familiar o laboral.',
          'Esa petición fue presentada antes del 30 de abril de 2001.',
          'La petición fue "aprobable" al momento de presentarse.'
        ],
        note: 'No importa si la petición antigua ya no existe o fue negada; lo relevante es haber estado protegido bajo esa fecha límite.',
        whyGolden: 'Porque, en ciertos casos, podría evitar la salida consular y los castigos, algo que no ocurre en la mayoría de procesos laborales.'
      },
      eb3Visa: {
        title: '¿Y qué pasa con las Visas EB-3?',
        text: 'La visa EB-3 es una categoría laboral común para trabajadores no calificados, trabajadores calificados y profesionales.',
        list: [
          'La EB-3 no elimina la entrada indocumentada.',
          'Sin 245(i) o perdón aplicable, el proceso podría requerir la salida del país.',
          'Cada paso implica riesgos que deben evaluarse con cuidado.'
        ],
        note: 'Por eso, no todos los casos laborales llevan al mismo resultado.'
      },
      hypothetical: {
        title: 'Ejemplo hipotético',
        scenario: 'Imagina a una persona que entró sin inspección hace 15 años, ha trabajado de forma estable, y su patrón quiere ayudarle con una residencia laboral.',
        analysis: [
          'Aunque el empleo es real y necesario:',
          'Sin 245(i), salir a consular podría activar un castigo.',
          'Con una petición antigua antes de 2001, el panorama podría ser distinto.'
        ],
        note: 'Este tipo de diferencias solo se detectan con una revisión detallada del historial.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Que un patrón quiera ayudar es valioso, pero no siempre es suficiente para arreglar una entrada indocumentada. Las peticiones laborales, como la EB-3, podrían ser una vía válida en ciertos contextos, pero también podrían implicar riesgos importantes si no se analizan correctamente.',
        advice: 'La Ley 245(i) sigue siendo una excepción clave, aunque limitada a casos muy específicos. Por eso, antes de iniciar cualquier proceso laboral, informarse bien y buscar orientación adecuada podría evitar consecuencias difíciles de revertir.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Employment-Based Immigration: Third Preference (EB-3)',
          'USCIS – PERM Labor Certification',
          'USCIS – Section 245(i) Adjustment',
          'American Immigration Council – Employer-Sponsored Immigration Guide'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Employment-Based Residency for Undocumented Entry: EB-3 and 245(i) | Manuel Solís',
    metaDesc: 'Can your employer sponsor your green card? Learn if an employment visa could work if you entered undocumented and the risks involved.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Employment-Based EB-3',
      date: 'Mar 08, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Can My Employer Sponsor My Residency If I Entered Undocumented? EB-3 Visas and Section 245(i)',
    summary: {
      title: 'Initial Summary',
      text: 'With the growing labor shortage in the United States, more and more employers are offering to "sponsor papers" for their employees. However, an approved labor certification <strong>does not always resolve an undocumented entry</strong>. In this article, we explain how the employment-based process works, the main obstacles, and in which cases an exception like <strong>Section 245(i)</strong> could apply.'
    },
    intro: [
      'For many people who have worked steadily for years, hearing their employer say <strong>"I\'ll sponsor you"</strong> brings immediate hope. After all, there is stable employment, a need for workers, and a good working relationship.',
      'But in immigration, the employer\'s intention is not always enough.',
      'Although the employment-based process is a valid pathway in certain scenarios, <strong>entering without inspection completely changes the legal landscape</strong>.',
      'Understanding this difference could help avoid decisions that carry serious risks, especially when it comes to leaving the country to continue the process.'
    ],
    sections: {
      howPERMWorks: {
        title: 'How Does an Employment Petition (PERM) Work in Simple Terms?',
        quote: 'The PERM confirms the labor need, not the immigration status.',
        text: 'Most employment-based residency processes begin with the Labor Certification, also known as PERM.',
        list: [
          'The employer needs to fill a specific position.',
          'There are no available workers in the U.S. for that position.',
          'The salary meets established standards.'
        ],
        note: 'This process belongs to the employer, not the worker. If approved, it only confirms the labor need, not the employee\'s immigration status.'
      },
      permMyth: {
        title: 'The Common Mistake: Thinking PERM "Fixes Everything"',
        subtitle: 'A labor certification does not cure undocumented entry',
        text: 'One of the most common myths is believing that an approved labor certification automatically fixes the immigration situation.',
        list: [
          'The PERM does not cure undocumented entry.',
          'It does not erase accumulated unlawful presence.',
          'It does not prevent immigration penalties for leaving the country.'
        ],
        note: 'That is why having an approved PERM does not mean the next step will be simple.'
      },
      consularAndPenalties: {
        title: 'The Major Obstacle: Consular Processing and Penalties',
        subtitle: 'Leaving the country could trigger immigration penalties',
        text: 'For many people who entered without inspection, the employment-based path requires leaving the U.S. for a consular interview.',
        penalties: [
          '3-year bar (unlawful presence of more than 180 days).',
          '10-year bar (unlawful presence of more than one year).'
        ],
        penaltiesNote: 'These penalties do not disappear because you have a job offer.',
        waiverText: 'In some cases, provisional waivers may exist, but not everyone qualifies. The requirements are strict and the analysis depends on the complete immigration history.',
        warning: 'Leaving without a clear strategy could keep a person out of the country for years.'
      },
      law245i: {
        title: 'The Key Exception: Section 245(i)',
        subtitle: 'The so-called "golden exception"',
        text: 'Within this complex landscape, there is an important exception known as Section 245(i).',
        whatIs: 'It is a legal provision that could allow certain individuals to adjust status within the U.S. despite having entered without inspection.',
        requirements: [
          'The person was the beneficiary of a family or employment petition.',
          'That petition was filed before April 30, 2001.',
          'The petition was "approvable when filed."'
        ],
        note: 'It does not matter if the old petition no longer exists or was denied; what matters is having been protected under that deadline.',
        whyGolden: 'Because, in certain cases, it could avoid consular processing and the bars, something that does not happen in most employment-based processes.'
      },
      eb3Visa: {
        title: 'What About EB-3 Visas?',
        text: 'The EB-3 visa is a common employment-based category for unskilled workers, skilled workers, and professionals.',
        list: [
          'The EB-3 does not eliminate undocumented entry.',
          'Without 245(i) or an applicable waiver, the process may require leaving the country.',
          'Each step involves risks that must be carefully evaluated.'
        ],
        note: 'That is why not all employment-based cases lead to the same outcome.'
      },
      hypothetical: {
        title: 'Hypothetical Example',
        scenario: 'Imagine a person who entered without inspection 15 years ago, has worked steadily, and their employer wants to help them obtain employment-based residency.',
        analysis: [
          'Even though the employment is real and necessary:',
          'Without 245(i), leaving for consular processing could trigger a bar.',
          'With an old petition filed before 2001, the outlook could be different.'
        ],
        note: 'These kinds of differences can only be detected through a detailed review of the immigration history.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Having an employer willing to help is valuable, but it is not always enough to resolve an undocumented entry. Employment-based petitions, like the EB-3, could be a valid pathway in certain contexts, but they could also carry significant risks if not properly analyzed.',
        advice: 'Section 245(i) remains a key exception, although limited to very specific cases. That is why, before starting any employment-based process, getting properly informed and seeking appropriate guidance could prevent consequences that are difficult to reverse.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Employment-Based Immigration: Third Preference (EB-3)',
          'USCIS – PERM Labor Certification',
          'USCIS – Section 245(i) Adjustment',
          'American Immigration Council – Employer-Sponsored Immigration Guide'
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
    title: t.metaTitle,
    description: t.metaDesc,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-03-08T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['EB-3','Ley 245(i)','Residencia laboral','PERM','Certificación laboral','Entrada indocumentada'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`,
      languages: {
        'es': `${SITE_URL}/es/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`,
        'en': `${SITE_URL}/en/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`,
        'x-default': `${SITE_URL}/en/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t.title,
    "image": `${SITE_URL}${IMAGES.article}`,
    "author": {
      "@type": "Person",
      "name": "Manuel Solís",
      "url": `${SITE_URL}/abogados`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-manuel-solis.png`
      }
    },
    "datePublished": "2025-03-08",
    "dateModified": "2025-03-08",
    "description": t.metaDesc,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada`
    }
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada` },
  ]);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]`}>

        <Header />

        <BlogBackground />

        <main className="relative z-10 pt-32 pb-20">

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
                    unoptimized
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
                     alt="Residencia laboral EB-3 y Ley 245(i)"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                     unoptimized
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

                  {/* Sección 1: howPERMWorks */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.howPERMWorks.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.howPERMWorks.quote}
                    </p>
                    <p className="mb-4">{t.sections.howPERMWorks.text}</p>
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.howPERMWorks.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-white/60">
                      {t.sections.howPERMWorks.note}
                    </p>
                  </section>

                  {/* Sección 2: permMyth */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.permMyth.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.permMyth.subtitle}</p>

                    <p className="mb-4">{t.sections.permMyth.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.permMyth.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.permMyth.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Proceso consular y castigos migratorios"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                       unoptimized
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: consularAndPenalties */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.consularAndPenalties.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.consularAndPenalties.subtitle}</p>

                    <p className="mb-6">{t.sections.consularAndPenalties.text}</p>

                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.consularAndPenalties.penalties.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4 font-medium text-white">{t.sections.consularAndPenalties.penaltiesNote}</p>
                    <p className="mb-4">{t.sections.consularAndPenalties.waiverText}</p>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.consularAndPenalties.warning}
                      </p>
                    </div>
                  </section>

                  {/* Sección 4: law245i */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Award size={24} className="text-[#B2904D]" /></div>
                      {t.sections.law245i.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.law245i.subtitle}</p>

                    <p className="mb-6">{t.sections.law245i.text}</p>

                    <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 mb-6">
                      <p className="text-white font-bold text-lg flex items-center gap-2 m-0">
                        <ShieldCheck size={20} className="text-[#B2904D]" />
                        {t.sections.law245i.whatIs}
                      </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <ul className="space-y-4 list-none pl-0 m-0">
                        {t.sections.law245i.requirements.map((req, idx) => (
                           <li key={idx} className="flex gap-3 items-start">
                             <div className="w-8 h-8 rounded-full bg-[#B2904D]/20 flex items-center justify-center shrink-0 mt-0.5">
                               <span className="text-[#B2904D] font-bold text-sm">{idx + 1}</span>
                             </div>
                             <span>{req}</span>
                           </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-4 text-sm text-white/60">
                      {t.sections.law245i.note}
                    </p>

                    <div className="mt-6 p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <Award size={16} className="inline mr-2" />
                      {t.sections.law245i.whyGolden}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Visa EB-3 y proceso laboral"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                       unoptimized
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 5: eb3Visa */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Building2 size={24} className="text-[#B2904D]" /></div>
                      {t.sections.eb3Visa.title}
                    </h2>
                    <p className="mb-4">{t.sections.eb3Visa.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.eb3Visa.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-white/60">{t.sections.eb3Visa.note}</p>
                  </section>

                  {/* Sección 6: hypothetical */}
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

                       <ul className="space-y-3 list-none pl-0 m-0">
                         {t.sections.hypothetical.analysis.map((item, idx) => (
                           <li key={idx} className="flex items-start gap-3">
                             {idx === 0 ? (
                               <span className="font-medium text-white">{item}</span>
                             ) : (
                               <>
                                 <AlertCircle size={20} className="text-[#B2904D] shrink-0 mt-1" />
                                 <span>{item}</span>
                               </>
                             )}
                           </li>
                         ))}
                       </ul>

                       <p className="mt-6 text-sm text-white/60">{t.sections.hypothetical.note}</p>
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
                      <h4 className="text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/40 list-none pl-0">
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" unoptimized />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         Ver Perfil
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>

        <div id="contacto">
           <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}
