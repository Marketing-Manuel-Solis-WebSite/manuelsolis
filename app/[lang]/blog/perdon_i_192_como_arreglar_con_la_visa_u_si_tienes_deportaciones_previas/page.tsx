import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker'; // 👈 Importamos el tracker
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import RelatedContent from '../../../components/blogs/RelatedContent';
import { getRelatedArticles } from '../../../lib/blogRelations';
import BlogSchema from '../../../components/blogs/BlogSchema';


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_03/B3_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Perdon I-192: arreglar Visa U con deportaciones previas',
    metaDesc: 'Descubre como el perdon I-192 permite arreglar con Visa U aun con deportaciones, reingresos ilegales y un historial migratorio complejo.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir articulo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Visa U',
      date: '23 Ene, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Perdon I-192: como arreglar con la Visa U si tienes deportaciones previas',
    summary: {
      title: 'Resumen inicial',
      text: '¿Tienes deportaciones previas, reingresos ilegales o un historial migratorio complicado y crees que ya no hay solucion? Este articulo explica como el perdon I-192 podria permitirte arreglar con la Visa U, incluso cuando otros caminos estan cerrados. Aprenderas que perdona la Visa U, como funciona el waiver y por que podria ser tu ultima —y real— esperanza.'
    },
    intro: [
      'Hay personas que llegan a una consulta migratoria convencidas de que su caso ya no tiene arreglo. Entradas ilegales repetidas. Una o varias deportaciones. Reingreso despues de una orden de expulsion. A veces, incluso antecedentes penales relacionados con su supervivencia.',
      'En la mayoria de los procesos migratorios, ese historial es una sentencia definitiva. Pero la Visa U es diferente. Es una de las pocas categorias que podria perdonar violaciones migratorias gracias a una herramienta clave: el perdon I-192. Este articulo esta pensado para quienes han oido demasiados no se podria y necesitan entender por que, en el contexto correcto, si se podria.'
    ],
    sections: {
      whatIs: {
        title: '¿Que es el perdon I-192?',
        quote: 'El waiver que hace posible lo imposible.',
        text: 'El Formulario I-192, tambien conocido como Application for Advance Permission to Enter as a Nonimmigrant, es el perdon que se utiliza en la Visa U para solicitar que el gobierno perdone inadmisibilidades migratorias y penales.',
        list: [
          'Razones humanitarias',
          'Interes publico',
          'Beneficio para la administracion de justicia'
        ],
        note: '* USCIS tiene amplia discrecion para perdonar casi cualquier causal bajo la Visa U.'
      },
      whyExists: {
        title: '¿Que podria perdonar la Visa U con el I-192?',
        text: 'A diferencia de otros procesos migratorios, el waiver de la Visa U es extraordinariamente amplio. En la practica podria perdonar:',
        cards: {
          complete: { title: 'Entradas Ilegales', desc: 'Entradas ilegales multiples y presencia ilegal prolongada.' },
          victim: { title: 'Deportaciones', desc: 'Ordenes de deportacion previas y reingresos ilegales.' },
          coop: { title: 'Fraude', desc: 'Fraude migratorio y uso de documentos falsos.' },
          record: { title: 'Antecedentes', desc: 'Algunas condenas penales, dependiendo del caso.' }
        },
        footer: 'Esto convierte a la Visa U en una de las pocas vias reales para historiales migratorios severos.'
      },
      requirements: {
        title: 'Reingreso ilegal y Visa U',
        subtitle: '¿De verdad es posible?',
        list: [
          'Haber sido victima de un crimen grave en Estados Unidos.',
          'Haber cooperado con las autoridades.',
          'Representar un beneficio humanitario o publico.'
        ],
        note: 'El reingreso ilegal no es automaticamente descalificante en la Visa U.'
      },
      timeline: {
        title: '¿Que evalua USCIS al decidir un perdon I-192?',
        time: 'Analisis Discrecional',
        text: 'USCIS realiza un balance entre factores positivos y negativos. El perdon no se aprueba por existir, se aprueba porque esta estrategicamente argumentado.'
      },
      realCase: {
        title: 'Casos reales: cuando la Visa U fue la ultima esperanza',
        caseTitle: 'Dos deportaciones y violencia armada',
        date: '2024',
        quote: '"Un solicitante con dos deportaciones previas fue victima de un asalto con arma y coopero plenamente con la policia."',
        result: 'Su Visa U fue aprobada gracias a un I-192 bien trabajado.',
        benefits: [
          'Perdon aprobado',
          'Proteccion migratoria',
          'Reconocimiento como victima',
          'Estabilidad legal'
        ]
      },
      faq: {
        q1: '¿Por que es tan importante un perdon robusto?',
        a1: 'El I-192 es el corazon del caso Visa U complejo. Tratarlo como un simple formulario es un error grave.',
        q2: '¿Que errores pueden hundir un perdon?',
        a2: 'Minimizar deportaciones, copiar declaraciones genericas y no explicar el contexto humano.',
        list2: [
          'Ocultar historial migratorio',
          'No incluir evidencia humana',
          'Tratar el perdon como secundario'
        ],
        footer: 'En casos complejos, el perdon es el caso.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'La Visa U con perdon I-192 no es un camino facil, pero para muchas personas es el unico camino real.',
        advice: 'Un historial migratorio complicado no te descalifica automaticamente, pero exige un enfoque serio, estrategico y humano.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Formulario I-192',
          'USCIS – Visa U',
          'INA 212(d)(14)',
          'American Immigration Council – The U Visa',
          'ILRC – U Visa Practice Advisory'
        ]
      }
    }
  },
    en: {
    metaTitle: 'I-192 Waiver: Fix U Visa with Prior Deportations',
    metaDesc: 'Learn how the I-192 waiver can allow you to fix your U Visa even with prior deportations, illegal reentries, and a complex immigration history.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'U Visa',
      date: 'Jan 23, 2025',
      time: '10 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'I-192 Waiver: How to Fix Your U Visa Case with Prior Deportations',
    summary: {
      title: 'Initial Summary',
      text: 'Do you have prior deportations, illegal reentries, or a complicated immigration history and believe there is no solution? This article explains how the I-192 waiver may allow you to fix your U Visa case, even when other options are closed. You will learn what the U Visa can forgive, how the waiver works, and why it may be your last and real hope.'
    },
    intro: [
      'Many people come to an immigration consultation convinced that their case is beyond repair. Repeated illegal entries. One or more deportations. Reentry after a removal order. Sometimes even criminal records tied to survival.',
      'In most immigration processes, this history is a final sentence. But the U Visa is different. It is one of the few categories that can forgive immigration violations through a key tool: the I-192 waiver. This article is for those who have heard too many “it is not possible” and need to understand why, in the right context, it actually is.'
    ],
    sections: {
      whatIs: {
        title: 'What Is the I-192 Waiver?',
        quote: 'The waiver that makes the impossible possible.',
        text: 'Form I-192, also known as Application for Advance Permission to Enter as a Nonimmigrant, is the waiver used in U Visa cases to request forgiveness for immigration and criminal inadmissibilities.',
        list: [
          'Humanitarian reasons',
          'Public interest',
          'Benefit to the administration of justice'
        ],
        note: '* Under the U Visa, USCIS has broad discretion to forgive almost any ground of inadmissibility.'
      },
      whyExists: {
        title: 'What Can the U Visa Forgive with an I-192?',
        text: 'Unlike other immigration processes, the U Visa waiver is extraordinarily broad. In practice, it may forgive:',
        cards: {
          complete: { title: 'Illegal Entries', desc: 'Multiple illegal entries and long periods of unlawful presence.' },
          victim: { title: 'Deportations', desc: 'Prior removal orders and illegal reentry after deportation.' },
          coop: { title: 'Fraud', desc: 'Immigration fraud and false statements.' },
          record: { title: 'Criminal Issues', desc: 'Certain criminal convictions, depending on the case.' }
        },
        footer: 'This makes the U Visa one of the few real options for people with severe immigration histories.'
      },
      requirements: {
        title: 'Illegal Reentry and the U Visa',
        subtitle: 'Is it really possible?',
        list: [
          'You were the victim of a serious crime in the United States.',
          'You cooperated with law enforcement.',
          'Your case represents a humanitarian or public benefit.'
        ],
        note: 'Illegal reentry is not automatically disqualifying in a U Visa case.'
      },
      timeline: {
        title: 'What Does USCIS Evaluate When Deciding an I-192?',
        time: 'Discretionary Analysis',
        text: 'USCIS weighs positive and negative factors. A waiver is not approved just because it exists; it is approved because it is strategically and persuasively argued.'
      },
      realCase: {
        title: 'Real Cases: When the U Visa Was the Last Hope',
        caseTitle: 'Two Deportations and Armed Violence',
        date: '2024',
        quote: '"An applicant with two prior deportations was later the victim of an armed assault and fully cooperated with the police."',
        result: 'The U Visa was approved thanks to a well-prepared I-192 waiver.',
        benefits: [
          'Waiver approved',
          'Immigration protection',
          'Recognition as a crime victim',
          'Legal stability'
        ]
      },
      faq: {
        q1: 'Why is a strong waiver so important?',
        a1: 'The I-192 is the heart of a complex U Visa case. Treating it as a simple form is a serious mistake.',
        q2: 'What mistakes can sink an I-192 waiver?',
        a2: 'Minimizing deportations, copying generic statements, and failing to explain the human context behind past mistakes.',
        list2: [
          'Hiding immigration history',
          'Failing to include human evidence',
          'Treating the waiver as secondary'
        ],
        footer: 'In complex cases, the waiver is the case.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The U Visa with an I-192 waiver is not an easy path, but for many people it is the only real path.',
        advice: 'A complicated immigration history does not automatically disqualify you, but it does require a serious, strategic, and human-centered approach.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – Form I-192',
          'USCIS – U Visa',
          'INA §212(d)(14)',
          'American Immigration Council – The U Visa',
          'ILRC – U Visa Practice Advisory'
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
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas`,
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-01-16T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Visa U', 'Perdon I-192', 'Deportaciones', 'Reingreso Ilegal', 'Waiver Migratorio'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas`,
      languages: {
        'es': `${SITE_URL}/es/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas`,
        'en': `${SITE_URL}/en/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas`,
        'x-default': `${SITE_URL}/es/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas`,
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
    { name: t.title, url: `/${lang}/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas` },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t.sections.faq.q1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.sections.faq.a1.replace(/<[^>]*>/g, ''),
        }
      },
      {
        "@type": "Question",
        "name": t.sections.faq.q2,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${t.sections.faq.a2} ${t.sections.faq.list2.join('. ')}.`,
        }
      },
    ],
  };

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas"
        date="2025-01-23"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image 
                     src={IMAGES.article} 
                     alt="Visa U Permiso de Trabajo"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

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
                  
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

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

                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6">{t.sections.whyExists.title}</h2>
                    <p className="mb-8">{t.sections.whyExists.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <FileText className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.complete.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.complete.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <ShieldCheck className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.victim.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.victim.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <User className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.coop.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.coop.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <AlertCircle className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.record.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.record.desc}</span>
                        </div>
                    </div>
                    <p>{t.sections.whyExists.footer}</p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6">{t.sections.requirements.title}</h2>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-6 text-sm">{t.sections.requirements.subtitle}</h4>
                      <ul className="space-y-4 list-none pl-0 m-0">
                        {t.sections.requirements.list.map((req, idx) => (
                           <li key={idx} className="flex gap-3 items-start">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-2.5 shrink-0" />
                             <span>{req}</span>
                           </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                          {t.sections.requirements.note}
                      </div>
                    </div>
                  </section>

                  <section>
                     <h2 className="text-3xl font-serif text-white mb-6">{t.sections.timeline.title}</h2>
                     <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl inline-flex w-full md:w-auto">
                        <TrendingUp size={32} className="text-[#B2904D]" />
                        <span className="text-2xl font-bold text-white">{t.sections.timeline.time}</span>
                     </div>
                     <p>{t.sections.timeline.text}</p>
                  </section>

                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8">{t.sections.realCase.title}</h2>
                    
                    <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote size={120} />
                       </div>
                       
                       <h3 className="text-xl font-bold text-white mb-2">{t.sections.realCase.caseTitle}</h3>
                       <p className="text-sm text-[#B2904D] mb-6 font-bold uppercase tracking-wider">{t.sections.realCase.date}</p>

                       <p className="italic text-white/90 mb-6 text-lg">
                         {t.sections.realCase.quote}
                       </p>

                       <p className="mb-6">{t.sections.realCase.result}</p>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Award size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[0]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Heart size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[1]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Star size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[2]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <CheckCircle2 size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[3]}
                          </div>
                       </div>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl text-white font-bold mb-4">{t.sections.faq.q1}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t.sections.faq.a1 }} />

                    <h3 className="text-2xl text-white font-bold mb-4 mt-10">{t.sections.faq.q2}</h3>
                    <p>{t.sections.faq.a2}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-white/80">
                        {t.sections.faq.list2.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <p className="mt-4 font-medium text-white">{t.sections.faq.footer}</p>
                  </section>

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

              <aside className="lg:col-span-4 space-y-8">
                 
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                    <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Sobre el Autor</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
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
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent
            articles={getRelatedArticles('perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas', (lang as 'es' | 'en') || 'es')}
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
