'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
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
  delay?: number;
}

export default function BlogCard({ post, lang, delay = 0 }: BlogCardProps) {
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#B2904D]/50 transition-all duration-500 h-full flex flex-col hover:shadow-[0_0_40px_rgba(178,144,77,0.15)]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={t(post.title)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#B2904D]/90 backdrop-blur-sm border border-white/20">
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                {t(post.category)}
              </span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
              <div className="flex items-center gap-1.5"><Calendar size={14} /><span>{formatDate(post.date)}</span></div>
              <div className="flex items-center gap-1.5"><Clock size={14} /><span>{post.readTime}</span></div>
            </div>

            <h3 className="text-xl font-light text-white mb-3 leading-snug group-hover:text-[#B2904D] transition-colors line-clamp-2">
              {t(post.title)}
            </h3>

            <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
              {t(post.excerpt)}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-[#B2904D] text-sm font-medium group-hover:gap-3 transition-all">
                <span>{lang === 'es' ? 'Leer más' : 'Read more'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}