import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

// Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogFeed from '../../components/blogs/BlogFeed'; // Importamos el nuevo componente interactivo

// --- DATOS CENTRALIZADOS DEL BLOG ---
// Estos datos se pasan al cliente para renderizar el feed y al servidor para el Schema/SEO
const BLOG_DATA = {
  posts: [
    {
      id: 'permiso_de_trabajo_visa_u',
      slug: 'permiso_de_trabajo_visa_u', // Coincide con la carpeta del artículo
      title: { 
        es: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final', 
        en: 'U Visa Work Permit (Bona Fide) Before Final Approval' 
      },
      excerpt: { 
        es: '¿Solicitaste la Visa U y estás esperando desde hace años sin poder trabajar legalmente? Te explicamos cómo obtener un permiso de trabajo bajo la determinación Bona Fide.', 
        en: 'Did you apply for the U Visa and have been waiting for years without being able to work legally? We explain how to obtain a work permit under Bona Fide determination.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-16',
      readTime: '8 min',
      image: '/images/blog/visa-u.jpg', // Asegúrate de tener una imagen o placeholder
      featured: true
    }
    // Aquí añadirías más posts en el futuro...
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
      title: { es: 'Conocimiento Legal a tu Alcance', en: 'Legal Knowledge at Your Reach' },
      subtitle: { es: 'Mantente informado con nuestros artículos sobre inmigración, derechos y procesos legales en Estados Unidos.', en: 'Stay informed with our articles on immigration, rights and legal processes in the United States.' }
    },
    featured: { es: 'Artículo Destacado', en: 'Featured Article' },
    latest: { es: 'Últimos Artículos', en: 'Latest Articles' },
    noResults: { es: 'No se encontraron artículos', en: 'No articles found' }
  }
};

// --- METADATA SEO SUPER PODEROSA ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? 'Blog Legal: Noticias de Inmigración y Consejos | Manuel Solís' 
    : 'Legal Blog: Immigration News & Advice | Manuel Solis';
  
  const description = isEs
    ? 'Manténgase al día con las últimas noticias de inmigración, cambios en la Visa U y consejos legales expertos del Abogado Manuel Solís.'
    : 'Stay up to date with the latest immigration news, U Visa changes, and expert legal advice from Attorney Manuel Solis.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/blog`,
      languages: {
        'es-US': '[https://www.manuelsolis.com/es/blog](https://www.manuelsolis.com/es/blog)',
        'en-US': '[https://www.manuelsolis.com/en/blog](https://www.manuelsolis.com/en/blog)',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/blog`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{
        url: '[https://www.manuelsolis.com/images/blog-og.jpg](https://www.manuelsolis.com/images/blog-og.jpg)', // Imagen general del blog
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['[https://www.manuelsolis.com/images/blog-og.jpg](https://www.manuelsolis.com/images/blog-og.jpg)'],
    },
    keywords: isEs 
      ? ['blog inmigración', 'noticias legales', 'visa u', 'abogado manuel solis', 'permiso trabajo']
      : ['immigration blog', 'legal news', 'u visa', 'attorney manuel solis', 'work permit'],
  };
}

// --- SCHEMA.ORG (JSON-LD) ---
const getBlogSchema = (lang: string) => {
  return {
    "@context": "[https://schema.org](https://schema.org)",
    "@type": "Blog",
    "name": lang === 'es' ? "Blog Legal Manuel Solís" : "Manuel Solis Legal Blog",
    "description": lang === 'es' ? "Recursos y noticias legales de inmigración." : "Immigration legal resources and news.",
    "url": `https://www.manuelsolis.com/${lang}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": "[https://www.manuelsolis.com/logo-manuel-solis.png](https://www.manuelsolis.com/logo-manuel-solis.png)"
      }
    },
    // Genera automáticamente el esquema para cada post en la lista
    "blogPost": BLOG_DATA.posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[lang as 'es'|'en'],
      "description": post.excerpt[lang as 'es'|'en'],
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://www.manuelsolis.com/${lang}/blog/${post.slug}`,
      "image": `https://www.manuelsolis.com${post.image}`
    }))
  };
};

// --- COMPONENTE PRINCIPAL (SERVER) ---
export default async function BlogPageIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'es';
  const schemaData = getBlogSchema(currentLang);

  return (
    <>
      {/* Inyección de Schema.org para Google */}
      <Script
        id="blog-feed-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header />
      
      {/* Renderizamos el componente cliente interactivo pasando los datos estáticos */}
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