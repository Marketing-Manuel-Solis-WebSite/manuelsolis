'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { Outfit } from 'next/font/google';
import { useParams } from 'next/navigation';

// --- TUS IMPORTS REALES ---
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogCard from '../../components/blogs/BlogCard';
import FeaturedPost from '../../components/blogs/FeaturedPost';
import CategoryFilter from '../../components/blogs/CategoryFilter';
import SearchBar from '../../components/blogs/SearchBar';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// --- DATOS ---
const categories = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'visa-u', es: 'Visa U', en: 'U Visa' },
  { id: 'immigration', es: 'Inmigración', en: 'Immigration' },
  { id: 'work-permits', es: 'Permisos de Trabajo', en: 'Work Permits' }
];

const blogPosts = [
  {
    // ID ajustado a tu ruta real
    id: 'permiso_de_trabajo_visa_u', 
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
    date: '2025-01-15',
    readTime: '8 min',
    image: '/images/blog/visa-u.jpg', 
    featured: true
  }
];

const uiText = {
  hero: {
    badge: { es: 'BLOG LEGAL', en: 'LEGAL BLOG' },
    title: { es: 'Conocimiento Legal a tu Alcance', en: 'Legal Knowledge at Your Reach' },
    subtitle: { es: 'Mantente informado con nuestros artículos sobre inmigración, derechos y procesos legales en Estados Unidos.', en: 'Stay informed with our articles on immigration, rights and legal processes in the United States.' }
  },
  featured: { es: 'Artículo Destacado', en: 'Featured Article' },
  latest: { es: 'Últimos Artículos', en: 'Latest Articles' },
  noResults: { es: 'No se encontraron artículos', en: 'No articles found' }
};

export default function BlogPage() {
  const params = useParams();
  const lang = (params?.lang as 'es' | 'en') || 'es';
  const t = (obj: any) => obj ? (obj[lang] || obj.es) : '';

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de Filtrado
  const featuredPost = blogPosts.find(post => post.featured);
  const isDefaultView = searchQuery === '' && selectedCategoryId === 'all';

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategoryId === 'all' || post.categoryId === selectedCategoryId;
    const matchesSearch = searchQuery === '' || 
      t(post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());

    // Si es la vista por defecto, no duplicamos el post destacado en la lista
    if (isDefaultView && post.featured) {
      return false;
    }
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      
      <main className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
        
        {/* --- Background FX --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[180px]" 
          />
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        </div>

        {/* --- Contenido --- */}
        <div className="relative z-10 pt-[160px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-24"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6">
                <Sparkles className="text-[#B2904D]" size={14} />
                <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">
                  {t(uiText.hero.badge)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                {t(uiText.hero.title)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-8" />
              <p className="text-white/70 text-base md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
                {t(uiText.hero.subtitle)}
              </p>
            </motion.div>

            {/* Filtros */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 space-y-6"
            >
              <SearchBar value={searchQuery} onChange={setSearchQuery} lang={lang} />
              <CategoryFilter categories={categories} selected={selectedCategoryId} onSelect={setSelectedCategoryId} lang={lang} />
            </motion.div>

            {/* Post Destacado */}
            {isDefaultView && featuredPost && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-20"
              >
                <div className="flex items-center gap-4 mb-8">
                  <TrendingUp className="text-[#B2904D]" size={24} />
                  <h2 className="text-2xl md:text-3xl font-thin text-white">{t(uiText.featured)}</h2>
                </div>
                <FeaturedPost post={featuredPost} lang={lang} />
              </motion.div>
            )}

            {/* Lista de Posts */}
            {filteredPosts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1 h-10 bg-[#B2904D] rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-thin text-white">{t(uiText.latest)}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, idx) => (
                    <BlogCard key={post.id} post={post} lang={lang} delay={idx * 0.1} />
                  ))}
                </div>
              </motion.div>
            ) : (
              (!isDefaultView || !featuredPost) && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Search className="text-white/40" size={32} />
                  </div>
                  <p className="text-white/60 text-lg font-light">{t(uiText.noResults)}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}