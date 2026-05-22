import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Blog feed card — server-renderable, single-locale (enfoque b): the parent
 * resolves `title`/`excerpt`/`category` to the active locale, so the inactive
 * one never ships. Entrance animation is delegated to the parent <Stagger>;
 * the card itself uses `.card-3d` (workhorse) for the hover lift + glow.
 */
interface BlogCardProps {
  post: {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    slug: string;
  };
  lang: 'es' | 'en';
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
  };

  return (
    <article className="group h-full">
      <Link href={`/${lang}/blog/${post.slug}`} className="block h-full">
        <div className="card-3d bg-[#000F24] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B2904D]/50 transition-all duration-500 h-full flex flex-col hover:shadow-[0_20px_40px_-10px_rgba(178,144,77,0.15)] shimmer">

          {/* Imagen */}
          <div className="relative aspect-video overflow-hidden bg-gray-900">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000F24] to-transparent opacity-60" />

          </div>

          {/* Contenido */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta Datos */}
            <div className="flex items-center gap-4 text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#B2904D]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-3 leading-snug group-hover:text-[#B2904D] transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-blue-100/60 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#B2904D]">
                   <User size={12} />
                </div>
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-2 text-[#B2904D] text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                <span>{lang === 'es' ? 'Leer' : 'Read'}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
