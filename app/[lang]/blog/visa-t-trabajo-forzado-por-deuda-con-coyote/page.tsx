import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { addInlineLinks, createInlineLinkState } from '../../../lib/blogInlineLinks';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import InlineLinkedText from '../../../components/blogs/InlineLinkedText';
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
  article: '/blog/blog_07/B7_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Visa T: papeles si trabajaste para pagar deuda a un coyote',
    metaDesc: '¿Te obligaron a trabajar para pagarle a un coyote bajo amenazas? Descubre cómo la Visa T protege a víctimas de trata laboral y te ayuda a arreglar papeles.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'Visa T por trabajo forzado',
      date: '03 Feb, 2026',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Visa T: papeles para víctimas de coyotes y deuda forzada',
    summary: {
      title: 'Resumen inicial',
      text: '¿Te obligaron a trabajar para pagarle al coyote que te cruzó la frontera? Esa experiencia podría <strong>calificarte para la Visa T</strong>, una protección legal para víctimas de trata laboral que permite vivir y trabajar legalmente en Estados Unidos.'
    },
    intro: [
      '“No tenía opción. Me dijo que si no trabajaba para pagarle, me entregaría a migración”.',
      'Cada año, miles de personas cruzan la frontera con ayuda de coyotes, pero lo que comienza como un acuerdo termina en explotación laboral, amenazas y abuso psicológico.',
      'Lo que muchos no saben es que la ley en Estados Unidos reconoce el trabajo forzado por deuda como trata de personas y ofrece una vía legal de protección: la Visa T.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es la Visa T?',
        quote: 'Una visa humanitaria para víctimas de trata de personas.',
        text: 'La Visa T es una visa no inmigrante creada para proteger a personas que fueron explotadas mediante fraude, coerción o amenazas. Aplica tanto a trata laboral como sexual y ofrece un camino hacia la residencia permanente.',
        list: [
          'Protege a víctimas de trabajo forzado o servicios obligados.',
          'Permite vivir y trabajar legalmente en EE. UU.',
          'Puede conducir a la residencia permanente después de tres años.'
        ],
        note: 'Muchas personas no se identifican como víctimas de trata, aunque legalmente sí lo sean.'
      },
      whyExists: {
        title: 'Deuda con coyotes y trabajo forzado: ¿esto es trata?',
        text: 'La ley federal considera trata de personas cuando alguien es obligado a trabajar bajo amenazas, manipulación o una deuda injusta.',
        cards: {
          complete: { title: 'Trabajo Forzado', desc: 'Obligación de trabajar para pagar una deuda inflada.' },
          victim: { title: 'Amenazas', desc: 'Amenazas de deportación, violencia o represalias.' },
          coop: { title: 'Control y Vigilancia', desc: 'Restricción de movimiento o supervisión constante.' },
          record: { title: 'Retención', desc: 'Retención de documentos o pertenencias personales.' }
        },
        footer: 'Si viviste alguna de estas situaciones, podrías calificar para la Visa T.'
      },
      requirements: {
        title: 'Visa T: requisitos principales',
        subtitle: 'Lo que debes cumplir',
        list: [
          'Ser víctima de trata de personas.',
          'Estar en EE. UU. a causa de la trata.',
          'Haber cooperado o estar dispuesto a cooperar con autoridades.',
          'Demostrar que sufrirías daño extremo si eres deportado.',
          'Ser admisible o solicitar un perdón migratorio.'
        ],
        note: 'Muchas personas con entradas ilegales u órdenes de deportación aún pueden calificar.'
      },
      timeline: {
        title: 'Cómo iniciar el proceso de la Visa T',
        time: 'Paso a paso',
        text: 'Consulta con un abogado especializado en trata. Redacta una declaración personal detallada. Reúne evidencia como mensajes, testimonios o evaluaciones psicológicas. Presenta el Formulario I-914 y, si es necesario, el perdón I-192.'
      },
      realCase: {
        title: 'Casos reales: cuando el cruce terminó en abuso',
        caseTitle: 'Javier, 34 años',
        date: '15 de Enero de 2025',
        quote: '"Me dijeron que debía trabajar hasta pagar la deuda o llamarían a migración..."',
        result: 'Gracias a la Visa T, logró:',
        benefits: [
          'Reconocimiento como víctima de trata laboral',
          'Permiso de Trabajo',
          'Estatus Legal en EE. UU.',
          'Camino a la Residencia Permanente'
        ]
      },
      faq: {
        q1: '¿Tengo que denunciar al coyote?',
        a1: 'No siempre. La cooperación puede ser flexible y depende del caso.',
        q2: '¿La trata solo es abuso físico?',
        a2: 'No. El abuso psicológico, las amenazas y la deuda forzada también califican.',
        list2: [
          'Amenazas de deportación.',
          'Control del salario.',
          'Restricción de libertad.'
        ],
        footer: 'La trata laboral muchas veces es invisible, pero el daño es real.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Si alguien te obligó a trabajar para pagar una deuda bajo amenazas, no solo fuiste explotado: fuiste víctima de trata. La Visa T existe para protegerte.',
        advice: 'Tu historia no te descalifica. Informarte y buscar ayuda legal puede ser el primer paso para vivir sin miedo.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Visa T Información Oficial (Formulario I-914)',
          'American Immigration Council – T Visa Overview',
          'Polaris Project – What Is Labor Trafficking?',
          'ILRC – Practice Advisory: T Visa for Immigrant Victims'
        ]
      }
    }
  },
  en: {
    metaTitle: 'T Visa: Immigration Relief for Forced Labor by Smuggling Debt',
    metaDesc: 'Were you forced to work to repay a smuggler under threats? Learn how the T Visa protects victims of labor trafficking and can lead to legal status.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'T Visa Forced Labor',
      date: 'Feb 03, 2026',
      time: '9 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'T Visa: Immigration Relief for Victims of Smugglers and Forced Labor',
    summary: {
      title: 'Overview',
      text: 'Were you forced to work to repay the smuggler who helped you cross the border? That experience may <strong>qualify you for a T Visa</strong>, a form of immigration protection for victims of labor trafficking in the United States.'
    },
    intro: [
      '“I had no choice. He told me that if I didn’t work to pay the debt, he would turn me in to immigration.”',
      'Every year, thousands of people cross the border with the help of smugglers, only to find themselves trapped in forced labor, threats, and psychological abuse.',
      'What many people do not realize is that U.S. law recognizes forced labor through debt and threats as human trafficking—and provides a powerful form of protection known as the T Visa.'
    ],
    sections: {
      whatIs: {
        title: 'What is the T Visa?',
        quote: 'A humanitarian visa for victims of human trafficking.',
        text: 'The T Visa is a nonimmigrant visa created to protect individuals who were exploited through fraud, coercion, or threats. It applies to both labor and sex trafficking and may lead to permanent residence.',
        list: [
          'Protects victims of forced labor or involuntary services.',
          'Allows you to live and work legally in the U.S.',
          'May lead to a green card after three years.'
        ],
        note: 'Many victims do not identify as trafficking victims, even though the law says otherwise.'
      },
      whyExists: {
        title: 'Smuggling debt and forced labor: does this count as trafficking?',
        text: 'Federal law considers human trafficking to include forced labor through threats, manipulation, or unfair debt.',
        cards: {
          complete: { title: 'Forced Labor', desc: 'Being required to work to repay an inflated or abusive debt.' },
          victim: { title: 'Threats', desc: 'Threats of deportation, violence, or retaliation.' },
          coop: { title: 'Control & Surveillance', desc: 'Restricted movement or constant monitoring.' },
          record: { title: 'Withholding', desc: 'Holding documents or personal belongings.' }
        },
        footer: 'If any of these situations happened to you, you may qualify for a T Visa.'
      },
      requirements: {
        title: 'T Visa: main requirements',
        subtitle: 'What you must meet',
        list: [
          'Be a victim of human trafficking.',
          'Be physically present in the U.S. because of the trafficking.',
          'Have complied with or be willing to comply with law enforcement requests.',
          'Show that you would suffer extreme hardship if deported.',
          'Be admissible or apply for an immigration waiver.'
        ],
        note: 'Many people with unlawful entry or removal orders may still qualify.'
      },
      timeline: {
        title: 'How to start the T Visa process',
        time: 'Step by step',
        text: 'Consult with an attorney experienced in trafficking cases. Write a detailed personal declaration. Gather evidence such as messages, witness statements, or psychological evaluations. File Form I-914 and, if needed, Form I-192 for a waiver.'
      },
      realCase: {
        title: 'Real cases: when crossing turned into abuse',
        caseTitle: 'Javier, age 34',
        date: 'January 15, 2025',
        quote: '"They told me I had to work until the debt was paid or they would call immigration..."',
        result: 'Through the T Visa, he obtained:',
        benefits: [
          'Recognition as a labor trafficking victim',
          'Work Authorization',
          'Legal Status in the U.S.',
          'Pathway to Permanent Residence'
        ]
      },
      faq: {
        q1: 'Do I have to report the smuggler?',
        a1: 'Not always. Cooperation with authorities may be flexible depending on the case.',
        q2: 'Does trafficking require physical violence?',
        a2: 'No. Psychological abuse, threats, and debt coercion also qualify.',
        list2: [
          'Threats of deportation.',
          'Wage control or confiscation.',
          'Loss of freedom.'
        ],
        footer: 'Labor trafficking is often invisible, but the harm is real.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'If someone forced you to work to repay a debt under threats, you were not just exploited—you were trafficked. The T Visa exists to protect you.',
        advice: 'Your experience does not disqualify you. Learning your rights and seeking legal help may be the first step toward living without fear.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – T Visa Official Information (Form I-914)',
          'American Immigration Council – T Visa Overview',
          'Polaris Project – What Is Labor Trafficking?',
          'ILRC – Practice Advisory: T Visa for Immigrant Victims'
        ]
      }
    }
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;
  
  const social = buildSocialMetadata({
    lang: lang === 'en' ? 'en' : 'es',
    path: `/${lang}/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-02-03T08:00:00.000Z',
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
      tags: ['Visa T', 'Trata laboral', 'Trabajo forzado', 'Deuda con coyote', 'Inmigración USA'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`,
      languages: {
        'es': `${SITE_URL}/es/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`,
        'en': `${SITE_URL}/en/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`,
        'x-default': `${SITE_URL}/es/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;
  const enlacesInline = createInlineLinkState();



  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/visa-t-trabajo-forzado-por-deuda-con-coyote` },
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
        slug="visa-t-trabajo-forzado-por-deuda-con-coyote"
        date="2026-02-03"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <script
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
                
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image
                     src={IMAGES.article}
                     alt="Policía negando firma visa u"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

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
                  
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: addInlineLinks(paragraph, lang as 'es' | 'en', enlacesInline) }} className="mb-6" />
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
                    <p className="mb-4"><InlineLinkedText text={t.sections.whatIs.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
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
                    <p className="mb-8"><InlineLinkedText text={t.sections.whyExists.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
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
                      <p><InlineLinkedText text={t.sections.timeline.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
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
            articles={getRelatedArticles('visa-t-trabajo-forzado-por-deuda-con-coyote', (lang as 'es' | 'en') || 'es')}
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
