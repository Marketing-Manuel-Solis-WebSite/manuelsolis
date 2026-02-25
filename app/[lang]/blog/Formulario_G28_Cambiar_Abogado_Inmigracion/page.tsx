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


const SITE_URL = 'https://www.manuelsolis.com'; 

const IMAGES = {
  // Asegúrate de que este archivo exista en tu carpeta public/blog/
  article: '/blog/blog_09/B9_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Formulario G-28: cómo cambiar de abogado sin afectar tu caso | Manuel Solís',
    metaDesc: '¿Quieres cambiar de abogado en inmigración? Aprende cómo funciona el Formulario G-28 y cómo notificar a USCIS correctamente sin poner en riesgo tu proceso migratorio.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Formulario G-28 cambio de abogado',
      date: '12 Feb, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Formulario G-28: cómo cambiar de abogado sin dañar tu caso',
    summary: {
      title: 'Resumen inicial',
      text: '¿Te sientes atrapado con un abogado que no responde o un notario que no avanza tu caso? El <strong>Formulario G-28</strong> permite notificar oficialmente a USCIS cuando cambias de representante, sin perjudicar tu proceso migratorio.'
    },
    intro: [
      '“Si me cambio de abogado, ¿me negarán el caso?”',
      'Muchas personas permanecen con representación ineficiente por miedo a afectar su trámite migratorio.',
      'La realidad es que la ley protege tu derecho a cambiar de abogado en cualquier momento, y el Formulario G-28 es la herramienta oficial para hacerlo correctamente.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es el Formulario G-28?',
        quote: 'El documento que autoriza oficialmente a un abogado a representarte ante USCIS.',
        text: 'El Formulario G-28, Notice of Entry of Appearance as Attorney or Accredited Representative, es el documento que informa a USCIS quién es tu representante legal actual.',
        list: [
          'Permite que USCIS envíe notificaciones a tu nuevo abogado.',
          'Revoca automáticamente al abogado anterior.',
          'Protege tu derecho a tener representación adecuada.'
        ],
        note: 'Presentar un nuevo G-28 no genera castigos ni retrasos automáticos.'
      },
      whyExists: {
        title: '¿Por qué es importante presentar un nuevo G-28?',
        text: 'Cuando cambias de abogado, USCIS necesita saber quién está autorizado para recibir información y actuar en tu nombre.',
        cards: {
          complete: { title: 'Control del Caso', desc: 'Tu nuevo abogado puede revisar y corregir errores.' },
          victim: { title: 'Notificaciones Seguras', desc: 'Evita perder citas o cartas importantes.' },
          coop: { title: 'Transparencia', desc: 'Define claramente quién te representa.' },
          record: { title: 'Protección Legal', desc: 'Evita que terceros actúen sin autorización.' }
        },
        footer: 'Sin un G-28 actualizado, podrías perder comunicaciones importantes de USCIS.'
      },
      requirements: {
        title: 'Cómo cambiar de abogado paso a paso',
        subtitle: 'Proceso seguro',
        list: [
          'Elegir y contratar a tu nuevo abogado.',
          'Solicitar copia de tu expediente (si es posible).',
          'Firmar el nuevo Formulario G-28.',
          'Permitir que el nuevo despacho lo presente ante USCIS.'
        ],
        note: 'No necesitas permiso de tu abogado anterior para cambiar.'
      },
      timeline: {
        title: 'Qué ocurre después de presentar el G-28',
        time: 'Proceso posterior',
        text: 'Una vez presentado el Formulario G-28, USCIS actualiza su sistema y reconoce al nuevo abogado como tu representante oficial. Todas las futuras notificaciones serán enviadas al nuevo despacho.'
      },
      realCase: {
        title: 'Casos reales: cambiar a tiempo marcó la diferencia',
        caseTitle: 'Cliente con Visa U pendiente',
        date: '05 de Febrero de 2025',
        quote: '"Pensé que cambiar de abogado arruinaría mi caso, pero en realidad lo salvó."',
        result: 'Después del cambio se logró:',
        benefits: [
          'Corrección de errores en el expediente',
          'Envío de evidencia faltante',
          'Comunicación directa con USCIS',
          'Avance real del proceso'
        ]
      },
      faq: {
        q1: '¿USCIS penaliza por cambiar de abogado?',
        a1: 'No. Cambiar de abogado es un derecho del cliente y no afecta negativamente el caso.',
        q2: '¿Pierdo mi lugar en la fila?',
        a2: 'No. Tu fecha de prioridad y proceso continúan igual.',
        list2: [
          'No hay cancelación automática del caso.',
          'No hay sospecha automática de fraude.',
          'No hay reinicio del proceso por el cambio.'
        ],
        footer: 'El mayor riesgo no es cambiar de abogado, sino permanecer con una mala representación.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El Formulario G-28 existe para proteger tu derecho a elegir representación legal adecuada. Cambiar de abogado, cuando es necesario, puede fortalecer tu caso en lugar de dañarlo.',
        advice: 'Tu caso migratorio es demasiado importante para dejarlo en manos equivocadas. Informarte y actuar a tiempo puede marcar la diferencia.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Formulario G-28: Notice of Entry of Appearance',
          'USCIS – Working with an Attorney or Accredited Representative',
          'American Immigration Lawyers Association (AILA) – Client Rights',
          'FTC – Immigration Services Scams and Notarios'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Form G-28: How to Change Your Immigration Attorney Without Hurting Your Case | Manuel Solís',
    metaDesc: 'Want to change your immigration attorney? Learn how Form G-28 works and how to properly notify USCIS without putting your immigration case at risk.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Form G-28 attorney change',
      date: 'Feb 12, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Form G-28: How to Change Your Attorney Without Damaging Your Case',
    summary: {
      title: 'Quick Summary',
      text: 'Feeling stuck with an attorney who does not respond or a notary who is not moving your case forward? <strong>Form G-28</strong> allows you to officially notify USCIS when you change representatives—without harming your immigration process.'
    },
    intro: [
      '"If I change attorneys, will my case be denied?"',
      'Many immigrants stay with ineffective representation out of fear of damaging their case.',
      'The truth is that the law protects your right to change attorneys at any time, and Form G-28 is the official tool to do it correctly.'
    ],
    sections: {
      whatIs: {
        title: 'What Is Form G-28?',
        quote: 'The official document that authorizes an attorney to represent you before USCIS.',
        text: 'Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative, informs USCIS who your current legal representative is.',
        list: [
          'Allows USCIS to send notices to your new attorney.',
          'Automatically removes the prior attorney from representation.',
          'Protects your right to proper legal representation.'
        ],
        note: 'Filing a new G-28 does not trigger penalties or automatic delays.'
      },
      whyExists: {
        title: 'Why Is Filing a New G-28 Important?',
        text: 'When you change attorneys, USCIS must know who is authorized to receive information and act on your behalf.',
        cards: {
          complete: { title: 'Case Control', desc: 'Your new attorney can review and correct mistakes.' },
          victim: { title: 'Secure Notifications', desc: 'Prevents missed appointments or important letters.' },
          coop: { title: 'Transparency', desc: 'Clearly defines who represents you.' },
          record: { title: 'Legal Protection', desc: 'Prevents unauthorized individuals from acting for you.' }
        },
        footer: 'Without an updated G-28, you risk missing critical USCIS communications.'
      },
      requirements: {
        title: 'How to Change Attorneys Step by Step',
        subtitle: 'Safe Process',
        list: [
          'Hire and retain your new attorney.',
          'Request a copy of your case file (if possible).',
          'Sign the new Form G-28.',
          'Allow your new attorney to file it with USCIS.'
        ],
        note: 'You do not need permission from your previous attorney to make the change.'
      },
      timeline: {
        title: 'What Happens After Filing Form G-28',
        time: 'After Filing',
        text: 'Once Form G-28 is submitted, USCIS updates its system and officially recognizes your new attorney. All future notices will be sent to the new legal office.'
      },
      realCase: {
        title: 'Real Cases: Changing Attorneys Made the Difference',
        caseTitle: 'Client with Pending U Visa',
        date: 'February 5, 2025',
        quote: '"I thought switching attorneys would hurt my case, but it actually saved it."',
        result: 'After the change, the following was achieved:',
        benefits: [
          'Correction of case errors',
          'Submission of missing evidence',
          'Direct communication with USCIS',
          'Real progress in the case'
        ]
      },
      faq: {
        q1: 'Does USCIS penalize you for changing attorneys?',
        a1: 'No. Changing attorneys is your right as a client and does not negatively affect your case.',
        q2: 'Do I lose my place in line?',
        a2: 'No. Your priority date and case timeline remain the same.',
        list2: [
          'There is no automatic case cancellation.',
          'There is no automatic fraud suspicion.',
          'Your process does not restart because you changed attorneys.'
        ],
        footer: 'The real risk is not changing attorneys—it is staying with poor representation.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Form G-28 exists to protect your right to choose proper legal representation. Changing attorneys when necessary can strengthen your case rather than harm it.',
        advice: 'Your immigration case is too important to leave in the wrong hands. Getting informed and acting in time can make all the difference.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Form G-28: Notice of Entry of Appearance',
          'USCIS – Working with an Attorney or Accredited Representative',
          'American Immigration Lawyers Association (AILA) – Client Rights',
          'Federal Trade Commission – Immigration Services Scams and Notarios'
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
      url: `${SITE_URL}/${lang}/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`,
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-02-20T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Formulario G-28', 'Cambio de abogado', 'Abogado de inmigración', 'USCIS', 'Proceso migratorio'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`,
        'en': `${SITE_URL}/en/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`,
        'x-default': `${SITE_URL}/en/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`,
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
    "datePublished": "2025-02-12",
    "dateModified": "2025-02-12",
    "description": t.metaDesc,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/Formulario_G28_Cambiar_Abogado_Inmigracion`
    }
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/Formulario_G28_Cambiar_Abogado_Inmigracion` },
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