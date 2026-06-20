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
  article: '/blog/blog_08/B8_CR1.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Parar deportación urgente: Stay of Removal con Visa U o VAWA pendiente',
    metaDesc: '¿Tienes una deportación inminente? Descubre cómo frenar la expulsión con una Visa U o VAWA pendiente y solicitar un Stay of Removal (I-246) ante ICE a tiempo.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'Stay of Removal y visa humanitaria',
      date: '10 Feb, 2025',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Parar deportación urgente: cómo frenarla con Visa Humanitaria pendiente (Stay of Removal)',
    summary: {
      title: 'Resumen inicial',
      text: '¿Recibiste una orden de deportación y no sabes qué hacer? Este artículo explica cómo podrías <strong>frenar una deportación urgente</strong> con una solicitud de Visa Humanitaria pendiente, como la <strong>Visa U</strong> o <strong>VAWA</strong>. Conoce cómo funciona el <strong>Stay of Removal</strong>, quién lo podría solicitar y cómo actuar rápido ante ICE.'
    },
    intro: [
      'Imagina que ICE llega a tu casa o te detiene en el trabajo. Tienes una orden de deportación final. Tus hijos lloran. Tienes miedo. Y lo único que buscas es cómo parar la deportación ya.',
      'Esta no es una historia aislada. Le pasa a miles de personas cada año. Pero lo que muchos desconocen es que inmigración podría frenar la deportación si tienes una solicitud humanitaria pendiente.',
      'Este artículo está pensado para quienes están al borde del abismo y necesitan una estrategia legal inmediata. Explicamos cómo funciona un Stay of Removal, cuándo podría ser aprobado y cómo tu petición pendiente podría darte una oportunidad real.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es un Stay of Removal?',
        quote: 'El freno legal a una deportación inminente.',
        text: 'Un Stay of Removal es una solicitud formal para que ICE suspenda temporalmente una deportación ya ordenada. No elimina tu orden, pero detiene tu expulsión mientras se revisa otra petición migratoria.',
        list: [
          'Detiene temporalmente una deportación ya ordenada.',
          'Permite ganar tiempo mientras se revisa una petición humanitaria u otro recurso legal.',
          'Se solicita ante ICE y su aprobación es discrecional.'
        ],
        note: 'Un Stay no borra la orden de deportación: solo la pausa mientras tu caso principal se revisa.'
      },
      whyExists: {
        title: '¿Cuándo se podría solicitar un Stay of Removal?',
        text: 'El momento es clave. Un Stay podría solicitarse antes de una cita de deportación, después de una detención si aún no ejecutan la remoción, o cuando recibes una notificación de deportación inminente.',
        cards: {
          complete: { title: 'Antes de tu cita', desc: 'Cuando ICE te cita a firmar o reportarte para deportación.' },
          victim: { title: 'Después de detención', desc: 'Si estás detenido y aún no han ejecutado tu remoción.' },
          coop: { title: 'Notificación inminente', desc: 'Cuando te informan que la deportación ocurrirá pronto.' },
          record: { title: 'Con evidencia lista', desc: 'Cuando puedes probar petición pendiente, lazos familiares y buen carácter.' }
        },
        footer: 'En todos los casos debes mostrar que tienes una solicitud pendiente, que hay mérito humanitario y que no eres un riesgo para la comunidad.'
      },
      requirements: {
        title: 'Qué debes demostrar para que ICE lo considere',
        subtitle: 'Elementos clave del Stay',
        list: [
          'Tener una solicitud humanitaria o recurso legal pendiente en USCIS o en corte.',
          'Que tu caso tenga mérito humanitario (familia, salud, riesgo en tu país, etc.).',
          'Que no representas un riesgo para la comunidad.',
          'Lazos fuertes en EE. UU. (familia, trabajo, tiempo en el país).',
          'Buen carácter moral (impuestos, voluntariado, historial limpio, etc.).'
        ],
        note: 'La decisión es discrecional: ICE evalúa cada caso individualmente según tus pruebas y el contexto.'
      },
      timeline: {
        title: '¿Cómo se solicita el Stay of Removal?',
        time: 'Documentación y estrategia',
        text: 'El proceso suele presentarse ante ICE con el Formulario I-246 y evidencia sólida. Incluye el recibo o prueba de tu solicitud pendiente, lazos familiares, cartas de apoyo y pruebas de buen carácter moral. Una presentación clara y rápida puede marcar la diferencia.'
      },
      realCase: {
        title: 'Casos reales: cuando una petición pendiente cambió el destino',
        caseTitle: 'Andrés y Luisa',
        date: '2023',
        quote: '"Teníamos poco tiempo, pero la evidencia y la estrategia frenaron la remoción."',
        result: 'En ambos casos, el Stay de Removal ayudó a:',
        benefits: [
          'Suspender temporalmente una deportación inminente',
          'Ganar tiempo mientras se procesa la petición principal',
          'Presentar evidencia humanitaria y lazos familiares',
          'Evitar una separación familiar inmediata'
        ]
      },
      faq: {
        q1: '¿Qué visa o solicitud podría frenar la deportación?',
        a1: 'Una petición humanitaria pendiente puede respaldar un Stay, como Visa U, VAWA, T Visa, asilo, TPS o recursos como una moción de reapertura.',
        q2: '¿Qué pasa si ICE niega el Stay?',
        a2: 'Aún podrías intentar opciones urgentes: apelar ante OPLA, buscar intervención judicial, presentar una moción de emergencia con tu abogado o pedir apoyo de organizaciones y congresistas.',
        list2: [
          'Apelar ante OPLA (Oficina de Asesoría Legal de ICE).',
          'Solicitar intervención judicial urgente.',
          'Presentar una moción de emergencia con tu abogado.',
          'Contactar organizaciones de derechos civiles o congresistas.'
        ],
        footer: 'Cada minuto cuenta: mientras más preparado estés, más posibilidades hay de frenar una deportación urgente.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Una deportación inminente no significa el fin. Si tienes una solicitud humanitaria pendiente, podrías frenar el proceso con una estrategia bien estructurada. La clave está en actuar rápido, reunir evidencia sólida y buscar ayuda legal experta.',
        advice: 'Si estás en esta situación, no pierdas tiempo esperando un milagro. El Stay of Removal existe para casos como el tuyo. Usa la ley a tu favor.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Visa U',
          'USCIS – VAWA',
          'ICE – I-246 Stay of Removal Instructions',
          'American Immigration Council – Enforcement and Removal Process',
          'ILRC – Strategies to Stop Deportation'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Stop an Urgent Deportation: Stay of Removal with a Pending U Visa or VAWA',
    metaDesc: 'Facing an imminent deportation? Learn how a pending U Visa or VAWA petition may help pause removal through a Stay of Removal (I-246) with ICE.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'Stay of Removal and humanitarian relief',
      date: 'Feb 10, 2025',
      time: '9 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Stop an Urgent Deportation: How a Pending Humanitarian Petition Can Help (Stay of Removal)',
    summary: {
      title: 'Initial Summary',
      text: 'Have you received a removal order and don’t know what to do? This article explains how you may <strong>pause an urgent deportation</strong> with a pending humanitarian petition, such as a <strong>U Visa</strong> or <strong>VAWA</strong>. Learn how a <strong>Stay of Removal</strong> works, who may request it, and how to act quickly with ICE.'
    },
    intro: [
      'Imagine ICE arriving at your home or detaining you at work. You have a final removal order. Your children are crying. You are scared. And all you want is to stop the deportation now.',
      'This is not an isolated story. It happens to thousands of people every year. What many do not know is that immigration authorities may pause removal if you have a pending humanitarian petition.',
      'This article is designed for those on the edge who need an immediate legal strategy. We explain how a Stay of Removal works, when it may be approved, and how your pending petition could give you a real opportunity.'
    ],
    sections: {
      whatIs: {
        title: 'What Is a Stay of Removal?',
        quote: 'The legal brake on an imminent deportation.',
        text: 'A Stay of Removal is a formal request asking ICE to temporarily suspend a deportation that has already been ordered. It does not erase the order, but it pauses removal while another immigration request is reviewed.',
        list: [
          'Temporarily pauses a deportation that has already been ordered.',
          'Buys time while a humanitarian petition or other legal remedy is reviewed.',
          'Requested with ICE and granted at the agency’s discretion.'
        ],
        note: 'A Stay does not cancel the removal order—it only pauses enforcement while your main case is reviewed.'
      },
      whyExists: {
        title: 'When Can a Stay of Removal Be Requested?',
        text: 'Timing is critical. A Stay may be requested before a deportation appointment, after detention if removal has not yet been executed, or when you receive notice that deportation is imminent.',
        cards: {
          complete: { title: 'Before Your Appointment', desc: 'When ICE schedules you to report or sign for deportation.' },
          victim: { title: 'After Detention', desc: 'If you are detained and removal has not yet been carried out.' },
          coop: { title: 'Imminent Notice', desc: 'When you are informed that deportation will occur soon.' },
          record: { title: 'With Evidence Ready', desc: 'When you can show a pending petition, family ties, and good moral character.' }
        },
        footer: 'In all cases, you must show a pending request, humanitarian merit, and that you are not a danger to the community.'
      },
      requirements: {
        title: 'What You Must Show for ICE to Consider It',
        subtitle: 'Key Elements of a Stay',
        list: [
          'A pending humanitarian petition or legal remedy with USCIS or the court.',
          'Humanitarian merit (family ties, health issues, risk in your home country, etc.).',
          'That you do not pose a risk to the community.',
          'Strong ties to the U.S. (family, employment, length of stay).',
          'Good moral character (tax filings, volunteering, clean record, etc.).'
        ],
        note: 'The decision is discretionary—ICE evaluates each case individually based on your evidence and circumstances.'
      },
      timeline: {
        title: 'How to Request a Stay of Removal',
        time: 'Documentation and Strategy',
        text: 'The request is typically submitted to ICE using Form I-246 with strong supporting evidence. This includes proof of your pending petition, family ties, support letters, and evidence of good moral character. A clear and timely filing can make a critical difference.'
      },
      realCase: {
        title: 'Real Cases: When a Pending Petition Changed the Outcome',
        caseTitle: 'Andrés and Luisa',
        date: '2023',
        quote: '"Time was short, but the evidence and strategy paused the removal."',
        result: 'In both cases, the Stay of Removal helped to:',
        benefits: [
          'Temporarily suspend an imminent deportation',
          'Gain time while the main petition was processed',
          'Present humanitarian evidence and family ties',
          'Avoid immediate family separation'
        ]
      },
      faq: {
        q1: 'Which petitions can help stop deportation?',
        a1: 'A pending humanitarian petition can support a Stay, including a U Visa, VAWA, T Visa, asylum, TPS, or legal remedies such as a motion to reopen.',
        q2: 'What if ICE denies the Stay?',
        a2: 'Urgent options may still exist: appeal to OPLA, seek emergency judicial intervention, file an emergency motion with your attorney, or request support from rights organizations or members of Congress.',
        list2: [
          'Appeal to OPLA (ICE Office of the Principal Legal Advisor).',
          'Seek emergency judicial intervention.',
          'File an emergency motion with your attorney.',
          'Contact civil rights organizations or members of Congress.'
        ],
        footer: 'Every minute counts—the more prepared you are, the better your chances of pausing an urgent deportation.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'An imminent deportation is not the end. If you have a pending humanitarian petition, you may be able to pause the process with a well-structured strategy. Acting quickly, gathering strong evidence, and seeking experienced legal help are key.',
        advice: 'If you are in this situation, do not wait for a miracle. The Stay of Removal exists for cases like yours. Use the law to your advantage.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – U Visa',
          'USCIS – VAWA',
          'ICE – I-246 Stay of Removal Instructions',
          'American Immigration Council – Enforcement and Removal Process',
          'ILRC – Strategies to Stop Deportation'
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
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`,
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
      tags: ['Stay of Removal','Deportación inminente','Visa Humanitaria','Visa U','VAWA'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`,
      languages: {
        'es': `${SITE_URL}/es/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`,
        'en': `${SITE_URL}/en/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`,
        'x-default': `${SITE_URL}/es/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`,
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
    { name: t.title, url: `/${lang}/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria` },
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
        slug="frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria"
        date="2025-02-10"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
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
            articles={getRelatedArticles('frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', (lang as 'es' | 'en') || 'es')}
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
