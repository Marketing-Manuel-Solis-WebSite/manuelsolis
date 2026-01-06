'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostProps {
  post: {
    id: string | number; // Actualizado para soportar tu ruta de texto
    title: { es: string; en: string };
    excerpt: { es: string; en: string };
    category: { es: string; en: string };
    author: string;
    date: string;
    readTime: string;
    image: string;
  };
  lang: 'es' | 'en';
}

export default function FeaturedPost({ post, lang }: FeaturedPostProps) {
  const t = (obj: any) => obj[lang] || obj.es;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
  };

  if (!post) return null;

  return (
    <Link href={`/blog/${post.id}`}>
      <motion.article
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-[#B2904D]/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(178,144,77,0.2)]"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={t(post.title)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001540]/80 via-[#001540]/40 to-transparent lg:opacity-100 opacity-70" />
            
            <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D] backdrop-blur-sm border border-white/30 shadow-lg">
              <Star size={14} fill="white" className="text-white" />
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                {lang === 'es' ? 'Destacado' : 'Featured'}
              </span>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6 w-fit">
              <span className="text-[#B2904D] text-xs font-bold uppercase tracking-wider">
                {t(post.category)}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-thin text-white mb-6 leading-tight group-hover:text-[#B2904D] transition-colors">
              {t(post.title)}
            </h2>

            <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8">
              {t(post.excerpt)}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#B2904D] font-medium group-hover:gap-4 transition-all">
              <span className="text-lg">{lang === 'es' ? 'Leer artículo completo' : 'Read full article'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}