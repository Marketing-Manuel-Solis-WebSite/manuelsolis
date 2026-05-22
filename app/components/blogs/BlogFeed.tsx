'use client';

import React, { useState } from 'react';
import { TrendingUp, Sparkles, Frown } from 'lucide-react';
// Imports de tus componentes existentes
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import BlogBackground from './BlogBackground';
import NewsletterSignup from '../NewsletterSignup';
import { Reveal, Stagger, StaggerItem } from '../motion';

/**
 * Blog feed — interactive island (search + category filter). Receives posts /
 * categories / UI text already resolved to the active locale on the server
 * (enfoque b): the inactive locale never reaches the bundle. The hero renders
 * statically (LCP); the featured card and grid enter via Reveal/Stagger and the
 * cards use `.card-3d`.
 */
export interface FeedPost {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  categoryId: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
}

interface BlogFeedProps {
  initialPosts: FeedPost[];
  categories: { id: string; label: string }[];
  uiText: {
    hero: { badge: string; title: string; subtitle: string };
    featured: string;
    latest: string;
    noResults: string;
  };
  lang: 'es' | 'en';
}

export default function BlogFeed({ initialPosts, categories, uiText, lang }: BlogFeedProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de Filtrado
  const featuredPost = initialPosts.find(post => post.featured);
  const isDefaultView = searchQuery === '' && selectedCategoryId === 'all';

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = selectedCategoryId === 'all' || post.categoryId === selectedCategoryId;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    // Si es la vista por defecto, no mostramos el destacado en la lista (para no duplicarlo)
    if (isDefaultView && featuredPost && post.id === featuredPost.id) {
      return false;
    }
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`relative w-full min-h-screen bg-[#001540] overflow-hidden`}>

      {/* --- Fondo Animado (Reutilizamos tu componente) --- */}
      <BlogBackground />

      {/* --- Contenido Principal --- */}
      <div className="relative z-10 pt-[160px] pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section del Blog (static — LCP) */}
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6 backdrop-blur-md">
              <Sparkles className="text-[#B2904D]" size={14} />
              <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">
                {uiText.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              {uiText.hero.title}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-8 opacity-60" />

            <p className="text-blue-100/70 text-base md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
              {uiText.hero.subtitle}
            </p>
          </div>

          {/* Barra de Herramientas (Search + Filter) */}
          <div className="mb-16 space-y-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} lang={lang} />
            <CategoryFilter categories={categories} selected={selectedCategoryId} onSelect={setSelectedCategoryId} />
          </div>

          {/* Artículo Destacado (Solo en vista por defecto) */}
          <div className="min-h-[500px]"> {/* Contenedor para evitar saltos de layout */}
            {isDefaultView && featuredPost && (
              <Reveal variant="up" amount={0.1} className="mb-24">
                <div className="flex items-center gap-3 mb-8 px-2">
                  <div className="p-2 rounded-lg bg-[#B2904D]/10">
                    <TrendingUp className="text-[#B2904D]" size={24} />
                  </div>
                  <h2 className="text-3xl font-serif text-white">{uiText.featured}</h2>
                </div>

                <FeaturedPost post={featuredPost} lang={lang} />
              </Reveal>
            )}

            {/* Grid de Artículos */}
            {filteredPosts.length > 0 ? (
              <div>
                <Reveal variant="up" amount={0.3} className="flex items-center gap-4 mb-10 px-2">
                  <div className="w-1.5 h-8 bg-[#B2904D]" />
                  <h2 className="text-3xl font-serif text-white">{uiText.latest}</h2>
                </Reveal>

                <Stagger gap={0.06} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" amount={0.05}>
                  {filteredPosts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                      <StaggerItem as="div">
                        <BlogCard post={post} lang={lang} />
                      </StaggerItem>
                      {/* Insert newsletter CTA after 3rd post */}
                      {idx === 2 && filteredPosts.length > 3 && (
                        <div className="md:col-span-2 lg:col-span-3">
                          <NewsletterSignup variant="banner" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </Stagger>
              </div>
            ) : (
              // Estado Vacío (si no hay resultados)
              (!isDefaultView || !featuredPost) && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#001540] border border-white/10 mb-6 shadow-xl">
                    <Frown className="text-white/40" size={32} />
                  </div>
                  <p className="text-white/60 text-lg font-light">{uiText.noResults}</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategoryId('all'); }}
                    className="mt-6 text-[#B2904D] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-[#B2904D] pb-1"
                  >
                    {lang === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </button>
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
