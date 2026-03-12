'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { pushToDataLayer, trackConversion } from '../../lib/tracking';

interface RelatedArticle {
  title: string;
  slug: string;
  image: string;
  category: string;
}

interface RelatedContentProps {
  articles: RelatedArticle[];
  lang: 'es' | 'en';
  servicePath?: string;
  serviceLabel?: string;
}

export default function RelatedContent({ articles, lang, servicePath, serviceLabel }: RelatedContentProps) {
  return (
    <section className="mt-16 mb-8">
      {/* Related Articles */}
      {articles.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#B2904D]" />
            {lang === 'es' ? 'Articulos Relacionados' : 'Related Articles'}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/${lang}/blog/${article.slug}`}
                  className="group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(178,144,77,0.15)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-[#B2904D] bg-[#001540]/80 backdrop-blur-sm px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                    <span className="mt-2 text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {lang === 'es' ? 'Leer' : 'Read'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Service CTA */}
      {servicePath && (
        <div className="rounded-2xl glass-gold p-8 text-center">
          <h3 className="text-xl font-light text-white mb-3">
            {lang === 'es' ? '¿Necesita Ayuda Legal?' : 'Need Legal Help?'}
          </h3>
          <p className="text-blue-100/60 text-sm mb-6 max-w-md mx-auto">
            {lang === 'es'
              ? 'Nuestro equipo de expertos puede evaluar su caso de forma gratuita y confidencial.'
              : 'Our team of experts can evaluate your case for free and confidentially.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}${servicePath}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B2904D] text-white text-sm font-medium hover:bg-[#96773E] transition-colors"
            >
              {serviceLabel || (lang === 'es' ? 'Ver Servicios' : 'View Services')}
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+18325980914"
              onClick={() => {
                pushToDataLayer('phone_click', {
                  event_category: 'conversion',
                  event_label: 'blog_cta_call',
                });
                trackConversion('phone_click', 'blog_cta_call');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              <Phone size={16} className="text-[#B2904D]" />
              {lang === 'es' ? 'Llamar Ahora' : 'Call Now'}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
