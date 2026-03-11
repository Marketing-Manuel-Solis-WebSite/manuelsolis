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


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  // Asegúrate de que este archivo exista en tu carpeta public/blog/
  article: '/blog/blog_02/B2_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Firma policía Visa U negada: alternativas legales | Manuel Solís',
    metaDesc: '¿La policía negó tu certificación Visa U? Descubre qué hacer, quién más podría firmar el suplemento B y cómo seguir adelante con tu caso.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '6 min de lectura',
      tags: 'Certificación Visa U',
      date: '20 Ene, 2025',
      time: '6 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: '¿Qué hacer si la policía no firma la certificación Visa U?',
    summary: {
      title: 'Lo que debes saber',
      text: '¿La policía se negó a firmar tu certificación para la Visa U? No todo está perdido. En este artículo descubrirás <strong>qué hacer si tu certificación suplemento B fue negada</strong>, quién más podría firmar y cómo avanzar incluso cuando te dijeron que “no”.'
    },
    intro: [
      'Presentas una denuncia. Colaboraste con la policía. Quizá incluso testificaste. Pero cuando pediste la firma para la Visa U, la respuesta fue un no. “No firmamos ese tipo de papeles”. “El caso ya está cerrado”. “Eso no depende de nosotros”.',
      'Esta es la barrera más común para quienes buscan la Visa U: la negativa de la policía a firmar el Suplemento B. Y lo más doloroso es que muchos creen que ahí termina todo. Que si no hay firma policial, no hay caso. Pero no es así.',
      'Este artículo te mostrará que existen otras opciones legales. Que aún podrías avanzar. Que hay otras autoridades con poder para firmar la certificación, y que un "no" no siempre es definitivo.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es la certificación Suplemento B?',
        quote: 'La llave que abre el camino a la Visa U.',
        text: 'El Formulario I-918, Suplemento B, es un documento que debe firmar una autoridad del orden público para confirmar hechos vitales:',
        list: [
          'Fuiste víctima de un crimen calificado.',
          'Colaboraste con la investigación.',
          'Eres elegible para solicitar la Visa U.'
        ],
        note: 'Sin esta firma, no podrías presentar oficialmente tu solicitud. Por eso, cuando la policía se niega a firmar, muchas personas creen que su única oportunidad se ha perdido.'
      },
      whyExists: {
        title: '¿Por qué la policía podría negarse a firmar?',
        text: 'No siempre es mala voluntad. Hay departamentos que, por política, simplemente no firman certificaciones para Visa U, sin importar el mérito del caso. Las razones más comunes son:',
        cards: {
          complete: { title: 'Desconocimiento', desc: 'Falta de conocimiento del proceso migratorio.' },
          victim: { title: 'Políticas Internas', desc: 'Prohíben firmar por reglamento interno.' },
          coop: { title: 'Caso Cerrado', desc: 'Casos antiguos o sin arrestos.' },
          record: { title: 'Cambios', desc: 'Cambios de personal o decisiones políticas.' }
        },
        footer: 'Esto es legal, aunque cuestionable desde lo ético.'
      },
      requirements: {
        title: '¿Qué hacer si la policía no firma?',
        subtitle: 'Alternativas y otras autoridades',
        list: [
          'Fiscales o procuradores: Si tu caso llegó al fiscal, ellos podrían certificar.',
          'Jueces de tribunales criminales: Poco común, pero válido si presidieron tu caso.',
          'Oficinas de servicios a víctimas: Suelen ser más empáticas y conocen la Visa U.',
          'Agencias federales: FBI, ICE, Homeland Security si estuvieron involucrados.',
          'Servicios de Protección Infantil (CPS): En casos con menores involucrados.'
        ],
        note: 'Nota importante: La ley permite que cualquier agencia del sistema de justicia criminal que haya tenido contacto con el caso pueda firmar.'
      },
      timeline: {
        title: 'Estrategias prácticas',
        time: 'No te rindas',
        text: 'Revisa todo tu expediente e identifica qué agencias participaron (policía, fiscalía, cortes). Consulta con tu abogado de inmigración para saber a quién acudir. Solicita la firma por escrito formalmente. No asumas que una negativa es final; en muchos casos, un cambio de administración o una nueva revisión podría abrir la puerta.'
      },
      realCase: {
        title: 'Casos reales: cuando otros sí firmaron',
        caseTitle: 'Luis y Carla: Superando el "No"',
        date: '20 de Enero de 2025',
        quote: '"A Luis la policía le dijo que el caso estaba cerrado. Carla recibió un no rotundo del departamento local. Parecía el fin..."',
        result: 'Gracias a la estrategia legal correcta, se encontraron caminos alternativos:',
        benefits: [
          'Firma de Fiscalía (Luis)',
          'Apoyo Servicios Víctimas',
          'Permiso de Trabajo',
          'Proceso en Curso'
        ]
      },
      faq: {
        q1: '¿Qué pasa si nadie quiere firmar?',
        a1: '<strong>Posibles caminos si todas las puertas se cierran.</strong> Puedes apelar internamente dentro de la agencia que negó la firma, esperar cambios de personal (especialmente en fiscalías) o intentar reabrir el caso si surgen nuevas pruebas.',
        q2: '¿Ayuda la presión pública?',
        a2: 'En ocasiones extremas, sí.',
        list2: [
          'Buscar apoyo con organizaciones comunitarias.',
          'Contactar medios de comunicación locales.',
          'Documentar cada negativa para tu expediente.'
        ],
        footer: 'Aunque es difícil, no es imposible. Lo importante es no abandonar el caso sin antes explorar todas las vías legales.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Una negativa de la policía no significa que tu sueño de obtener la Visa U terminó. Hay más caminos, más opciones y más autoridades dispuestas a reconocer tu cooperación. El sistema es complejo, pero tu historia y tu esfuerzo valen la pena.',
        advice: 'Si ya te dijeron “no”, es momento de buscar a alguien que te diga “sí”. La clave está en insistir con estrategia, con asesoría y con claridad legal.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Formulario I-918 Suplemento B',
          'American Immigration Council – Visa U Overview',
          'ILRC – Manual de certificaciones para Visa U'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Police Denied U Visa Signature: Legal Alternatives | Manuel Solis',
    metaDesc: 'Did the police refuse your U Visa certification? Discover what to do, who else could sign Supplement B, and how to move forward with your case.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '6 min read',
      tags: 'U Visa Certification',
      date: 'Jan 20, 2025',
      time: '6 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'What to do if the police refuse to sign the U Visa certification?',
    summary: {
      title: 'What you need to know',
      text: 'Did the police refuse to sign your certification for the U Visa? All is not lost. In this article you will discover <strong>what to do if your Supplement B certification was denied</strong>, who else could sign and how to move forward even when you were told “no”.'
    },
    intro: [
      'You file a report. You cooperated with the police. Maybe you even testified. But when you asked for the U Visa signature, the answer was no. “We don’t sign those papers”. “The case is already closed”. “That’s not up to us”.',
      'This is the most common barrier for those seeking the U Visa: the police refusal to sign Supplement B. And the most painful part is that many believe it ends there. That if there is no police signature, there is no case. But that is not true.',
      'This article will show you that there are other legal options. That you could still move forward. That there are other authorities with power to sign the certification, and that a "no" is not always final.'
    ],
    sections: {
      whatIs: {
        title: 'What is the Supplement B certification?',
        quote: 'The key that opens the path to the U Visa.',
        text: 'Form I-918, Supplement B, is a document that must be signed by a law enforcement authority to confirm vital facts:',
        list: [
          'You were a victim of a qualifying crime.',
          'You cooperated with the investigation.',
          'You are eligible to apply for the U Visa.'
        ],
        note: 'Without this signature, you could not officially submit your application. That is why, when the police refuse to sign, many people believe their only chance is lost.'
      },
      whyExists: {
        title: 'Why might the police refuse to sign?',
        text: 'It is not always ill will. There are departments that, by policy, simply do not sign certifications for U Visas, regardless of the merit of the case. Common reasons are:',
        cards: {
          complete: { title: 'Lack of Knowledge', desc: 'Lack of knowledge of the immigration process.' },
          victim: { title: 'Internal Policies', desc: 'Policies prohibiting signing.' },
          coop: { title: 'Case Closed', desc: 'Cases closed or without arrests.' },
          record: { title: 'Changes', desc: 'Staff changes or political decisions.' }
        },
        footer: 'This is legal, although questionable ethically.'
      },
      requirements: {
        title: 'What to do if the police do not sign?',
        subtitle: 'Alternatives and other authorities',
        list: [
          'Prosecutors or District Attorneys: If your case reached the prosecutor, they could certify.',
          'Criminal Court Judges: Rare, but valid if they presided over your case.',
          'Victim Services Offices: Usually more empathetic and know the U Visa.',
          'Federal Agencies: FBI, ICE, Homeland Security if involved.',
          'Child Protective Services (CPS): In cases involving minors.'
        ],
        note: 'Important note: The law allows any criminal justice agency that has had contact with the case to sign.'
      },
      timeline: {
        title: 'Practical Strategies',
        time: 'Don\'t Give Up',
        text: 'Review your entire file and identify which agencies participated (police, prosecutor, courts). Consult with your immigration attorney to know who to turn to. Request the signature in writing formally. Do not assume a refusal is final; in many cases, a change of administration or a new review could open the door.'
      },
      realCase: {
        title: 'Real cases: when others did sign',
        caseTitle: 'Luis and Carla: Overcoming the "No"',
        date: 'January 20, 2025',
        quote: '"Police told Luis the case was closed. Carla received a flat no from the local department. It seemed like the end..."',
        result: 'Thanks to the right legal strategy, alternative paths were found:',
        benefits: [
          'DA Signature (Luis)',
          'Victim Services Support (Carla)',
          'Work Permit',
          'Process Ongoing'
        ]
      },
      faq: {
        q1: 'What happens if no one wants to sign?',
        a1: '<strong>Possible paths if all doors close.</strong> You can appeal internally within the agency that denied the signature, wait for staff changes (especially in prosecutor\'s offices) or try to reopen the case if new evidence arises.',
        q2: 'Does public pressure help?',
        a2: 'In extreme cases, yes.',
        list2: [
          'Seek support with community organizations.',
          'Contact local media.',
          'Document every refusal for your file.'
        ],
        footer: 'Although it is difficult, it is not impossible. The important thing is not to abandon the case without first exploring all legal avenues.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'A refusal from the police does not mean your dream of obtaining the U Visa is over. There are more paths, more options and more authorities willing to recognize your cooperation. The system is complex, but your story and your effort are worth it.',
        advice: 'If they already told you "no", it is time to look for someone who tells you "yes". The key is to insist with strategy, advice and legal clarity.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – Form I-918 Supplement B',
          'American Immigration Council – U Visa Overview',
          'ILRC – U Visa Certification Manual'
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
      url: `${SITE_URL}/${lang}/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u`,
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
      section: 'Inmigración',
      tags: ['Visa U', 'Certificación', 'Policía', 'Suplemento B', 'Inmigración USA'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u`,
      languages: {
        'es': `${SITE_URL}/es/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u`,
        'en': `${SITE_URL}/en/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u`,
        'x-default': `${SITE_URL}/en/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u`,
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
    "datePublished": "2025-01-20",
    "dateModified": "2025-01-20",
    "description": t.metaDesc,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u`
    }
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u` },
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
            articles={getRelatedArticles('que_hacer_si_la_policia_no_firma_la_certificacion_visa_u', (lang as 'es' | 'en') || 'es')}
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