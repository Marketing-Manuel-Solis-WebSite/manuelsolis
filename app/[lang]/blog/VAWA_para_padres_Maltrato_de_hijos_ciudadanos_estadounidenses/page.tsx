import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2
} from 'lucide-react';

// IMPORTACIONES
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'] 
});

const SITE_URL = 'https://www.manuelsolis.com'; 

const IMAGES = {
  // Asegúrate de que este archivo exista en tu carpeta public/blog/
  article: '/blog/blog_05/B5_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'VAWA para padres: hijo ciudadano maltrata a sus padres | Manuel Solís',
    metaDesc: '¿Tu hijo ciudadano estadounidense te maltrata? Descubre cómo la ley VAWA podría protegerte y permitirte obtener la residencia legal sin depender del hijo abusivo.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'VAWA para padres',
      date: '28 Ene, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'VAWA para padres: maltrato de hijos ciudadanos estadounidenses',
    summary: {
      title: 'Resumen inicial',
      text: '¿Te sientes maltratado por tu hijo ciudadano estadounidense y no sabes qué hacer? En este artículo descubrirás <strong>cómo la ley VAWA podría ayudarte a protegerte y obtener la residencia legal</strong> sin depender del hijo que te agrede.'
    },
    intro: [
      'En muchas familias latinas, los padres hacen todo por sus hijos: los crían, los apoyan económicamente y emocionalmente, incluso cuando ya son adultos.',
      'Pero cuando ese hijo, ahora ciudadano estadounidense, comienza a maltratar, amenazar o controlar a sus propios padres, el hogar se convierte en un lugar de miedo y silencio.',
      'Lo que muchos padres no saben es que este tipo de abuso puede abrir la puerta a una protección migratoria poderosa: VAWA para padres.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es VAWA y cómo protege a los padres?',
        quote: 'Una ley creada para proteger a víctimas de violencia familiar.',
        text: 'VAWA (Violence Against Women Act) permite que padres y madres víctimas de abuso por parte de hijos ciudadanos estadounidenses mayores de 21 años soliciten beneficios migratorios de manera independiente.',
        list: [
          'Permite presentar una petición sin el consentimiento del hijo.',
          'El proceso es confidencial y no notifica al agresor.',
          'Reconoce abuso físico, emocional, psicológico y financiero.'
        ],
        note: 'Esta ley existe para proteger la dignidad y seguridad de los padres, incluso cuando el abuso proviene de un hijo.'
      },
      whyExists: {
        title: 'Hijo ciudadano maltrata padres: ¿esto califica para VAWA?',
        text: 'El abuso no siempre deja marcas visibles. VAWA reconoce múltiples formas de maltrato que pueden afectar profundamente la vida de los padres.',
        cards: {
          complete: { title: 'Abuso Verbal', desc: 'Gritos, insultos y humillaciones constantes.' },
          victim: { title: 'Abuso Emocional', desc: 'Amenazas, manipulación o intimidación.' },
          coop: { title: 'Abuso Financiero', desc: 'Control del dinero o prohibición para trabajar.' },
          record: { title: 'Amenazas Migratorias', desc: 'Uso del estatus migratorio como control.' }
        },
        footer: 'Si estas situaciones forman parte de tu vida, podrías calificar para VAWA.'
      },
      requirements: {
        title: 'VAWA para padres: requisitos principales',
        subtitle: 'Lo que necesitas cumplir',
        list: [
          'Ser padre o madre de un ciudadano estadounidense.',
          'Que el hijo tenga 21 años o más.',
          'Haber sufrido el abuso dentro de Estados Unidos.',
          'Demostrar buen carácter moral.',
          'Presentar evidencia creíble del abuso.'
        ],
        note: 'No es necesario haber reportado a tu hijo a la policía para calificar.'
      },
      timeline: {
        title: 'Cómo iniciar tu solicitud VAWA',
        time: 'Paso a paso',
        text: 'Consulta con un abogado con experiencia en VAWA. Redacta una declaración personal detallada. Reúne evidencia de apoyo como cartas, evaluaciones psicológicas o mensajes. Presenta el Formulario I-360 ante USCIS y espera la decisión para avanzar al ajuste de estatus.'
      },
      realCase: {
        title: 'Casos reales: cuando los padres sí lograron protección',
        caseTitle: 'María y José: Recuperando la dignidad',
        date: '23 de Enero de 2025',
        quote: '"Vivían con miedo en su propia casa. Su hijo los amenazaba con llamar a inmigración..."',
        result: 'Gracias a VAWA, lograron:',
        benefits: [
          'Petición VAWA aprobada',
          'Permiso de Trabajo',
          'Protección Migratoria',
          'Proceso de Residencia en Curso'
        ]
      },
      faq: {
        q1: '¿Necesito que mi hijo firme algo?',
        a1: '<strong>No.</strong> El proceso VAWA es completamente independiente y confidencial.',
        q2: '¿El abuso tiene que ser físico?',
        a2: 'No. El abuso emocional, psicológico y financiero también es válido.',
        list2: [
          'Amenazas constantes.',
          'Control de dinero.',
          'Aislamiento familiar.'
        ],
        footer: 'VAWA reconoce que el daño emocional también destruye vidas.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Si tu hijo ciudadano te maltrata o te controla usando tu estatus migratorio, tienes derecho a protegerte. VAWA para padres existe para darte una salida legal y humana.',
        advice: 'No estás solo. Informarte y buscar ayuda legal puede ser el primer paso para recuperar tu tranquilidad y tu futuro.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – VAWA I-360 Petition Guidelines',
          'National Domestic Violence Hotline – Abuse by Children',
          'American Immigration Council – VAWA Overview'
        ]
      }
    }
  },
  en: {
    metaTitle: 'VAWA for Parents: Abuse by U.S. Citizen Children | Manuel Solis',
    metaDesc: 'Is your U.S. citizen child abusing you? Learn how VAWA may protect parents and help you obtain legal residency without relying on the abusive child.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'VAWA for Parents',
      date: 'Jan 23, 2025',
      time: '10 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'VAWA for Parents: Abuse by U.S. Citizen Children',
    summary: {
      title: 'Overview',
      text: 'Are you being abused by your U.S. citizen child and don’t know what to do? In this article you will learn <strong>how VAWA may help protect you and allow you to apply for legal residency</strong> without depending on the abusive child.'
    },
    intro: [
      'In many cultures, especially within Latino families, parents give everything for their children: housing, food, emotional and financial support, even well into adulthood.',
      'But when that same adult child—now a U.S. citizen—begins to abuse, threaten, or control their parents, the home can become a place of fear and silence.',
      'What many parents do not know is that this type of abuse may open the door to a powerful form of immigration protection: VAWA for parents.'
    ],
    sections: {
      whatIs: {
        title: 'What is VAWA and how does it protect parents?',
        quote: 'A law designed to protect victims of family violence.',
        text: 'VAWA (Violence Against Women Act) allows parents who are abused by U.S. citizen children over the age of 21 to file an independent immigration petition.',
        list: [
          'Allows parents to apply without the child’s consent.',
          'The process is confidential and does not notify the abuser.',
          'Recognizes physical, emotional, psychological, and financial abuse.'
        ],
        note: 'VAWA exists to protect the safety and dignity of parents, even when the abuser is their own child.'
      },
      whyExists: {
        title: 'Can abuse by a U.S. citizen child qualify for VAWA?',
        text: 'Abuse does not always leave visible injuries. VAWA recognizes many forms of harm that deeply affect parents.',
        cards: {
          complete: { title: 'Verbal Abuse', desc: 'Constant yelling, insults, or humiliation.' },
          victim: { title: 'Emotional Abuse', desc: 'Threats, manipulation, or intimidation.' },
          coop: { title: 'Financial Abuse', desc: 'Controlling money or preventing you from working.' },
          record: { title: 'Immigration Threats', desc: 'Using your immigration status as control.' }
        },
        footer: 'If these situations reflect your reality, you may qualify for VAWA.'
      },
      requirements: {
        title: 'VAWA for parents: main requirements',
        subtitle: 'What you must meet',
        list: [
          'Be the parent of a U.S. citizen.',
          'Your child must be at least 21 years old.',
          'The abuse occurred while you were in the United States.',
          'Demonstrate good moral character.',
          'Provide credible evidence of the abuse.'
        ],
        note: 'You do not need a police report to qualify under VAWA.'
      },
      timeline: {
        title: 'How to start your VAWA application',
        time: 'Step by step',
        text: 'Consult with an attorney experienced in VAWA cases. Write a detailed personal declaration describing the abuse. Gather supporting evidence such as letters, psychological evaluations, or messages. File Form I-360 with USCIS and wait for a decision to move forward with adjustment of status.'
      },
      realCase: {
        title: 'Real cases: when parents found protection',
        caseTitle: 'Maria and Jose: Reclaiming dignity',
        date: 'January 23, 2025',
        quote: '"They lived in fear inside their own home. Their son threatened to call immigration..."',
        result: 'Through VAWA, they achieved:',
        benefits: [
          'VAWA Petition Approved',
          'Work Permit',
          'Immigration Protection',
          'Green Card Process Ongoing'
        ]
      },
      faq: {
        q1: 'Do I need my child to sign anything?',
        a1: '<strong>No.</strong> VAWA is an independent and confidential process.',
        q2: 'Does the abuse have to be physical?',
        a2: 'No. Emotional, psychological, and financial abuse are also valid.',
        list2: [
          'Constant threats.',
          'Financial control.',
          'Isolation from family.'
        ],
        footer: 'VAWA recognizes that emotional abuse is just as damaging as physical violence.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'If your U.S. citizen child abuses, threatens, or controls you using your immigration status, you have the right to protect yourself. VAWA for parents exists to offer a legal and humane solution.',
        advice: 'You are not alone. Learning your rights and seeking legal help can be the first step toward peace, safety, and stability.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – VAWA I-360 Petition Guidelines',
          'National Domestic Violence Hotline – Abuse by Children',
          'American Immigration Council – VAWA Overview'
        ]
      }
    }
  },
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
    }
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
      "@id": `${SITE_URL}/${lang}/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u`
    }
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <BlogTracker 
        title={t.title} 
        author="Manuel Solís" 
        category="Inmigración" 
      />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540] ${font.className}`}>
        
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
                
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image 
                     src={IMAGES.article} 
                     alt="Policía negando firma visa u"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                     unoptimized
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
                      <h4 className="text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/40 list-none pl-0">
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