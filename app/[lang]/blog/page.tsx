import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

// Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogFeed from '../../components/blogs/BlogFeed';

// --- CONFIGURACIÓN DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/blog/visa-u.png`; 

// --- DATOS CENTRALIZADOS DEL BLOG (CMS Simulado) ---
const BLOG_DATA = {
  posts: [
    // --- NUEVO BLOG POST ---
    {
      id: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
      slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
      title: { 
        es: 'Parar deportación urgente: cómo frenarla con Visa U o VAWA pendiente (Stay of Removal)', 
        en: 'Stop an Urgent Deportation: How a Pending U Visa or VAWA Can Help (Stay of Removal)' 
      },
      excerpt: { 
        es: '¿Recibiste una orden de deportación y no sabes qué hacer? Aprende cómo podrías frenar una deportación inminente con una solicitud humanitaria pendiente (Visa U, VAWA u otras) mediante un Stay of Removal ante ICE.', 
        en: 'Have a final removal order and don’t know what to do? Learn how a pending humanitarian petition (U Visa, VAWA, and others) may help pause an urgent deportation through a Stay of Removal with ICE.' 
      },
      categoryId: 'visa-humanitaria',
      category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
      author: 'Manuel Solís',
      date: '2025-02-10',
      readTime: '7 min',
      image: '/blog/blog_08/B8_CR1.png', 
      featured: true
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'Visa_T_trabajo_forzado_por_deuda_con_coyote',
      slug: 'Visa_T_trabajo_forzado_por_deuda_con_coyote',
      title: { 
        es: 'Visa T: papeles para víctimas de coyotes y trabajo forzado por deuda', 
        en: 'T Visa: Immigration Relief for Victims of Forced Labor and Smuggling Debt' 
      },
      excerpt: { 
        es: '¿Te obligaron a trabajar para pagarle a un coyote bajo amenazas o coerción? Esa experiencia podría calificarte para la Visa T, una protección legal para víctimas de trata laboral que permite vivir y trabajar legalmente en EE. UU.', 
        en: 'Were you forced to work to repay a smuggler under threats or coercion? That experience may qualify you for a T Visa, a form of immigration protection for victims of labor trafficking in the United States.' 
      },
      categoryId: 'visa-T',
      category: { es: 'Visa T', en: 'T Visa' },
      author: 'Manuel Solís',
      date: '2025-02-03',
      readTime: '9 min',
      image: '/blog/blog_07/B7_CR1.png', 
      featured: false
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
      slug: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
      title: { 
        es: 'VAWA para hombres: protección migratoria por abuso de pareja ciudadana o residente', 
        en: 'VAWA for Men: Immigration Protection from Abuse by a Citizen or Resident Spouse' 
      },
      excerpt: { 
        es: '¿Eres hombre y estás siendo maltratado por tu esposa ciudadana o residente permanente? Conoce cómo VAWA puede protegerte y permitirte solicitar la residencia sin depender de tu agresora.', 
        en: 'Are you a man being abused by your U.S. citizen or permanent resident spouse? Learn how VAWA can protect you and allow you to apply for residency without relying on your abuser.' 
      },
      categoryId: 'visa-VAWA',
      category: { es: 'Visa VAWA', en: 'VAWA Visa' },
      author: 'Manuel Solís',
      date: '2025-01-30',
      readTime: '8 min',
      image: '/blog/blog_06/B6_CR1.png', 
      featured: false
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
      slug: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
      title: { 
        es: 'VAWA para padres: maltrato de hijos ciudadanos estadounidenses', 
        en: 'VAWA for Parents: Abuse by U.S. Citizen Children' 
      },
      excerpt: { 
        es: '¿Te sientes maltratado por tu hijo ciudadano estadounidense y no sabes qué hacer? Descubre cómo la ley VAWA podría ayudarte a protegerte y obtener la residencia legal sin depender del hijo que te agrede.', 
        en: 'Are you being abused by your U.S. citizen child and don’t know what to do? Learn how VAWA may help you protect yourself and obtain legal residency without relying on the abusive child.' 
      },
      categoryId: 'visa-VAWA',
      category: { es: 'Visa VAWA', en: 'VAWA Visa' },
      author: 'Manuel Solís',
      date: '2025-01-28',
      readTime: '10 min',
      image: '/blog/blog_05/B5_CR1.png', 
      featured: false
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
      slug: 'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
      title: { 
        es: 'Perdón I-192: cómo arreglar con la Visa U si tienes deportaciones previas', 
        en: 'I-192 Waiver: How to Fix Your U Visa Case with Prior Deportations' 
      },
      excerpt: { 
        es: '¿Tienes deportaciones previas, reingresos ilegales o un historial migratorio complicado? Descubre como el perdon I-192 puede permitirte arreglar con la Visa U incluso cuando otros caminos estan cerrados.', 
        en: 'Do you have prior deportations, illegal reentries, or a complicated immigration history? Learn how the I-192 waiver may allow you to fix your U Visa case even when other options are closed.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-23',
      readTime: '10 min',
      image: '/blog/blog_03/B3_CR1.png', 
      featured: false
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'que-hacer-si-la-policia-no-firma',
      slug: 'que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',
      title: { 
        es: '¿Qué hacer si la policía no firma la certificación Visa U?', 
        en: 'What to do if the police refuse to sign the U Visa certification?' 
      },
      excerpt: { 
        es: '¿La policía se negó a firmar tu certificación para la Visa U? No todo está perdido. Descubre qué hacer y quién más podría firmar el suplemento B.', 
        en: 'Did the police refuse to sign your certification for the U Visa? All is not lost. Discover what to do and who else could sign Supplement B.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-20',
      readTime: '6 min',
      // Imagen de portada actualizada
      image: '/blog/blog_02/B2_CR1.png', 
      featured: false
    },
    // --- BLOG POST ANTERIOR ---
    {
      id: 'permiso_de_trabajo_visa_u',
      slug: 'permiso_de_trabajo_visa_u',
      title: { 
        es: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final', 
        en: 'U Visa Work Permit (Bona Fide) Before Final Approval' 
      },
      excerpt: { 
        es: '¿Solicitaste la Visa U y esperas sin poder trabajar? Descubre cómo obtener un permiso de trabajo bajo la determinación Bona Fide y asegura tu estabilidad económica.', 
        en: 'Did you apply for the U Visa and are waiting without being able to work? Discover how to obtain a work permit under Bona Fide determination and secure your financial stability.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-16',
      readTime: '8 min',
      image: '/blog/visa-u.png', 
      featured: false
    }
  ],
  categories: [
    { id: 'all', es: 'Todos', en: 'All' },
    { id: 'visa-u', es: 'Visa U', en: 'U Visa' },
    { id: 'immigration', es: 'Inmigración', en: 'Immigration' },
    { id: 'work-permits', es: 'Permisos de Trabajo', en: 'Work Permits' }
  ],
  uiText: {
    hero: {
      badge: { es: 'BLOG LEGAL', en: 'LEGAL BLOG' },
      title: { es: 'Noticias de Inmigración y Consejos Legales', en: 'Immigration News & Legal Advice' },
      subtitle: { es: 'Recursos confiables sobre la Visa U, residencia, defensa contra deportación y más, escritos por expertos.', en: 'Reliable resources on U Visa, residency, deportation defense, and more, written by experts.' }
    },
    featured: { es: 'Artículo Destacado', en: 'Featured Article' },
    latest: { es: 'Últimos Artículos', en: 'Latest Articles' },
    noResults: { es: 'No se encontraron artículos', en: 'No articles found' }
  }
};

// --- METADATA SEO POTENCIADA ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? 'Blog de Inmigración y Noticias Legales | Manuel Solís Law Firm' 
    : 'Immigration Blog & Legal News | Manuel Solis Law Firm';
  
  const description = isEs
    ? 'Manténgase informado con las últimas noticias de inmigración, cambios en la Visa U, consejos para la residencia y guías legales del Abogado Manuel Solís.'
    : 'Stay informed with the latest immigration news, U Visa updates, residency tips, and legal guides from Attorney Manuel Solis.';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        'es-US': `${SITE_URL}/es/blog`,
        'en-US': `${SITE_URL}/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{
        url: DEFAULT_OG_IMAGE, 
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE], 
      creator: '@AbogadoMSolis'
    },
    keywords: isEs 
      ? ['blog inmigración', 'noticias visa u', 'abogado manuel solis', 'permiso trabajo', 'noticias legales usa', 'bona fide visa u']
      : ['immigration blog', 'u visa news', 'attorney manuel solis', 'work permit', 'legal news usa', 'bona fide u visa'],
  };
}

// --- SCHEMA.ORG (JSON-LD) PARA BLOG ---
const getBlogSchema = (lang: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === 'es' ? "Blog Legal Manuel Solís" : "Manuel Solis Legal Blog",
    "description": lang === 'es' ? "Recursos y noticias legales de inmigración." : "Immigration legal resources and news.",
    "url": `${SITE_URL}/${lang}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-manuel-solis.png`
      }
    },
    "blogPost": BLOG_DATA.posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[lang as 'es'|'en'],
      "description": post.excerpt[lang as 'es'|'en'],
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `${SITE_URL}/${lang}/blog/${post.slug}`,
      "image": `${SITE_URL}${post.image}`
    }))
  };
};

export default async function BlogPageIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'es';
  const schemaData = getBlogSchema(currentLang);

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header />
      
      <BlogFeed 
        initialPosts={BLOG_DATA.posts}
        categories={BLOG_DATA.categories}
        uiText={BLOG_DATA.uiText}
        lang={currentLang}
      />

      <Footer />
    </>
  );
}