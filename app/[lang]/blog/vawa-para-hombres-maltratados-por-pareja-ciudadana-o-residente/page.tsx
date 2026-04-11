import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2
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
  // Asegúrate de que este archivo exista en tu carpeta public/blog/
  article: '/blog/blog_06/B6_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'VAWA para hombres: abuso de pareja ciudadana o residente',
    metaDesc: '¿Eres hombre y sufres maltrato por tu esposa ciudadana o residente permanente? Descubre cómo VAWA puede protegerte y ayudarte a obtener la residencia sin depender de tu agresora.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '8 min de lectura',
      tags: 'VAWA para hombres',
      date: '30 Ene, 2025',
      time: '8 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'VAWA para hombres: protección migratoria por abuso de pareja ciudadana o residente',
    summary: {
      title: 'Resumen inicial',
      text: '¿Eres hombre y estás siendo maltratado por tu esposa ciudadana o residente legal? En este artículo descubrirás <strong>cómo la ley VAWA puede protegerte y permitirte solicitar la residencia legal</strong> sin depender de tu agresora.'
    },
    intro: [
      'Cuando se habla de violencia doméstica, pocas veces se menciona a los hombres como víctimas, especialmente dentro de la comunidad inmigrante.',
      'Muchos hombres sufren abuso emocional, verbal, financiero o físico por parte de sus parejas ciudadanas o residentes, pero callan por miedo, vergüenza o por amenazas de deportación.',
      'Lo que muchos no saben es que la ley VAWA también fue creada para protegerlos y permitirles recuperar su seguridad y su estatus migratorio.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es VAWA y cómo protege a los hombres?',
        quote: 'Una ley que protege a cualquier víctima de violencia doméstica, sin importar el género.',
        text: 'VAWA (Violence Against Women Act) permite que hombres inmigrantes maltratados por una esposa ciudadana o residente permanente soliciten beneficios migratorios por cuenta propia y de forma confidencial.',
        list: [
          'No requiere la participación ni el consentimiento de la agresora.',
          'El proceso es completamente confidencial.',
          'Reconoce abuso físico, emocional, psicológico, sexual y financiero.'
        ],
        note: 'VAWA existe para romper el ciclo de control y permitir que las víctimas recuperen su independencia y dignidad.'
      },
      whyExists: {
        title: 'Maltrato de pareja ciudadana: ¿esto califica para VAWA?',
        text: 'El abuso no siempre es físico. Muchos hombres viven violencia silenciosa que afecta profundamente su estabilidad emocional y migratoria.',
        cards: {
          complete: { title: 'Abuso Verbal', desc: 'Insultos, humillaciones y gritos constantes.' },
          victim: { title: 'Abuso Emocional', desc: 'Manipulación, amenazas o intimidación.' },
          coop: { title: 'Abuso Financiero', desc: 'Control del dinero, prohibición para trabajar o salir.' },
          record: { title: 'Amenazas Migratorias', desc: 'Uso del estatus migratorio como forma de control.' }
        },
        footer: 'Si reconoces estas conductas, podrías calificar para protección bajo VAWA.'
      },
      requirements: {
        title: 'VAWA para hombres: requisitos principales',
        subtitle: 'Lo que necesitas cumplir',
        list: [
          'Estar o haber estado casado con una ciudadana o residente permanente.',
          'Haber sufrido abuso o crueldad extrema.',
          'Demostrar que el matrimonio fue de buena fe.',
          'Haber convivido con la agresora en algún momento.',
          'Demostrar buen carácter moral.'
        ],
        note: 'No es obligatorio tener denuncias policiales ni estar divorciado para calificar.'
      },
      timeline: {
        title: 'Cómo iniciar tu solicitud VAWA',
        time: 'Paso a paso',
        text: 'Busca asesoría legal especializada. Redacta una declaración personal detallada. Reúne evidencia como mensajes, testimonios o evaluaciones psicológicas. Presenta el Formulario I-360 ante USCIS y, tras su aprobación, continúa con el ajuste de estatus si calificas.'
      },
      realCase: {
        title: 'Casos reales: hombres que rompieron el silencio',
        caseTitle: 'Juan: Recuperando su libertad',
        date: '30 de Enero de 2025',
        quote: '"Vivía bajo amenazas constantes de deportación y control económico por parte de su esposa..."',
        result: 'Gracias a VAWA, logró:',
        benefits: [
          'Petición VAWA aprobada',
          'Permiso de Trabajo',
          'Protección Migratoria',
          'Proceso de Residencia en Curso'
        ]
      },
      faq: {
        q1: '¿Mi esposa será notificada?',
        a1: '<strong>No.</strong> El proceso VAWA es completamente confidencial.',
        q2: '¿El abuso tiene que ser físico?',
        a2: 'No. El abuso emocional, psicológico y financiero también califica.',
        list2: [
          'Amenazas de deportación.',
          'Control económico.',
          'Aislamiento social.'
        ],
        footer: 'La violencia doméstica no tiene género.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Si eres hombre y estás siendo maltratado por tu pareja ciudadana o residente, tienes derechos y opciones legales. VAWA existe para protegerte.',
        advice: 'Buscar ayuda legal puede ser el primer paso para recuperar tu seguridad, tu estatus migratorio y tu dignidad.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – VAWA I-360 Petition Guidelines',
          'National Domestic Violence Hotline – Men as Victims',
          'American Immigration Council – VAWA Protections'
        ]
      }
    }
  },
  en: {
    metaTitle: 'VAWA for Men: Abuse by U.S. Citizen or Resident Spouse',
    metaDesc: 'Are you a man being abused by your U.S. citizen or permanent resident spouse? Learn how VAWA may protect you and help you obtain legal residency without relying on your abuser.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'VAWA for Men',
      date: 'Jan 30, 2025',
      time: '8 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'VAWA for Men: Immigration Protection from Abuse by a Citizen or Resident Spouse',
    summary: {
      title: 'Overview',
      text: 'Are you a man being abused by your U.S. citizen or permanent resident spouse and don’t know what to do? In this article, you will learn <strong>how VAWA may protect you and allow you to apply for legal residency</strong> without depending on your abuser.'
    },
    intro: [
      'When people think of domestic violence, men are rarely seen as victims—especially within immigrant communities.',
      'Many immigrant men suffer emotional, verbal, financial, or physical abuse from their U.S. citizen or permanent resident spouses but remain silent out of fear, shame, or threats of deportation.',
      'What many do not realize is that VAWA also exists to protect men and give them a safe, independent path to immigration relief.'
    ],
    sections: {
      whatIs: {
        title: 'What is VAWA and how does it protect men?',
        quote: 'A law that protects victims of domestic violence, regardless of gender.',
        text: 'VAWA (Violence Against Women Act) allows immigrant men who have been abused by a U.S. citizen or permanent resident spouse to file an independent and confidential immigration petition.',
        list: [
          'Does not require the abuser’s consent or participation.',
          'The process is confidential and does not notify the abusive spouse.',
          'Recognizes physical, emotional, psychological, sexual, and financial abuse.'
        ],
        note: 'VAWA exists to help victims break free from control and regain safety, independence, and dignity.'
      },
      whyExists: {
        title: 'Abuse by a citizen or resident spouse: does it qualify for VAWA?',
        text: 'Abuse is not always physical. Many men experience silent forms of violence that deeply affect their emotional and immigration stability.',
        cards: {
          complete: { title: 'Verbal Abuse', desc: 'Insults, humiliation, and constant yelling.' },
          victim: { title: 'Emotional Abuse', desc: 'Manipulation, threats, or intimidation.' },
          coop: { title: 'Financial Abuse', desc: 'Controlling money or preventing you from working or leaving.' },
          record: { title: 'Immigration Threats', desc: 'Using your immigration status as a form of control.' }
        },
        footer: 'If these behaviors are present in your relationship, you may qualify for VAWA protection.'
      },
      requirements: {
        title: 'VAWA for men: main requirements',
        subtitle: 'What you must meet',
        list: [
          'Be or have been married to a U.S. citizen or permanent resident.',
          'Have suffered abuse or extreme cruelty.',
          'Demonstrate the marriage was entered into in good faith.',
          'Have lived with the abusive spouse at some point.',
          'Demonstrate good moral character.'
        ],
        note: 'You do not need a police report or a finalized divorce to qualify under VAWA.'
      },
      timeline: {
        title: 'How to start your VAWA application',
        time: 'Step by step',
        text: 'Consult with an attorney experienced in VAWA cases. Write a detailed personal declaration describing the abuse. Gather supporting evidence such as messages, witness statements, or psychological evaluations. File Form I-360 with USCIS and, once approved, proceed with adjustment of status if eligible.'
      },
      realCase: {
        title: 'Real cases: men who broke the silence',
        caseTitle: 'Juan: Regaining freedom',
        date: 'January 23, 2025',
        quote: '"He lived under constant threats of deportation and financial control by his spouse..."',
        result: 'Through VAWA, he obtained:',
        benefits: [
          'VAWA Petition Approved',
          'Work Permit',
          'Immigration Protection',
          'Green Card Process Ongoing'
        ]
      },
      faq: {
        q1: 'Will my spouse be notified?',
        a1: '<strong>No.</strong> VAWA is a fully confidential and independent process.',
        q2: 'Does the abuse have to be physical?',
        a2: 'No. Emotional, psychological, and financial abuse also qualify.',
        list2: [
          'Threats of deportation.',
          'Financial control.',
          'Social isolation.'
        ],
        footer: 'Domestic violence has no gender.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'If you are a man being abused by your U.S. citizen or permanent resident spouse, you have rights and legal options. VAWA exists to protect you.',
        advice: 'Seeking legal help may be the first step toward reclaiming your safety, immigration status, and dignity.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – VAWA I-360 Petition Guidelines',
          'National Domestic Violence Hotline – Men as Victims',
          'American Immigration Council – VAWA Protections'
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
      url: `${SITE_URL}/${lang}/blog/vawa-para-hombres-maltrato-por-pareja-ciudadana-o-residente`,
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-01-20T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Immigration',
      tags: [
        'VAWA',
        'VAWA for Men',
        'Domestic Violence',
        'Abusive Spouse',
        'U.S. Immigration'
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente`,
      languages: {
        'es': `${SITE_URL}/es/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente`,
        'en': `${SITE_URL}/en/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente`,
        'x-default': `${SITE_URL}/es/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente`,
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
    { name: t.title, url: `/${lang}/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente` },
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
        slug="vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente"
        date="2025-01-30"
        image={IMAGES.article}
        lang={lang as string}
        readTime="8"
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
                     alt="Policía negando firma visa u"
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
                          <Search className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.complete.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.complete.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <Building2 className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.victim.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.victim.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <Gavel className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.coop.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.coop.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <User className="text-[#B2904D]" />
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
            articles={getRelatedArticles('vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', (lang as 'es' | 'en') || 'es')}
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
