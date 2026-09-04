import React from 'react';
import {
  ArrowLeft, ArrowRight, Mail, Quote, Users, Globe, Star, ExternalLink,
  Facebook, Instagram, Youtube, Linkedin, Twitter, BadgeCheck, FileText,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import {
  getCollaborator,
  collaborators,
  officialLinks,
  documentReviews,
  featuredGoogleReviews,
  type OfficialLinkType,
} from '../../../lib/collaboratorData';
import { Reveal, Stagger, StaggerItem } from '../../../components/motion';

/**
 * Collaborator profile — server-first (mirrors AttorneyProfile). Purely
 * presentational: bilingual data is resolved to the active `lang` on the
 * server, so the inactive locale never reaches the client bundle. Movement
 * lives in Reveal/Stagger islands; cards use `.card-3d`. LCP sacred: the hero
 * photo (priority) + H1 render statically. The per-route page.tsx
 * (generateMetadata + Person/Breadcrumb JSON-LD) is untouched.
 */
interface CollaboratorProfileProps {
  slug: string;
  lang: string;
}

const LINK_ICONS: Record<OfficialLinkType, React.ComponentType<{ size?: number; className?: string }>> = {
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function CollaboratorProfile({ slug, lang }: CollaboratorProfileProps) {
  const language: 'es' | 'en' = lang === 'en' ? 'en' : 'es';
  const collaborator = getCollaborator(slug);

  const relatedCollaborators = collaborators.filter((c) => c.id !== slug);

  const texts = {
    backToTeam: { es: 'Volver a Colaboradores', en: 'Back to Collaborators' },
    badge: { es: 'Equipo Manuel Solís', en: 'Manuel Solís Team' },
    testimonialTitle: { es: 'Testimonio', en: 'Testimonial' },
    reviewsBadge: { es: 'Reseñas Verificadas', en: 'Verified Reviews' },
    reviewsTitle: { es: 'Resultados con documentos en mano', en: 'Results with documents in hand' },
    reviewsSubtitle: {
      es: 'Clientes reales que recibieron sus documentos. Reseñas verificables en Google.',
      en: 'Real clients who received their documents. Reviews verifiable on Google.',
    },
    viewOnGoogle: { es: 'Ver en Google', en: 'View on Google' },
    relatedTitle: { es: 'Otros Colaboradores', en: 'Other Collaborators' },
    viewProfile: { es: 'Ver Perfil', en: 'View Profile' },
    contactTitle: { es: 'Contacto', en: 'Contact' },
    contactSubtitle: {
      es: 'Déjenos sus datos y nuestro equipo se pondrá en contacto con usted.',
      en: 'Leave us your details and our team will get in touch with you.',
    },
    reviewsDisclaimer: {
      es: 'Las reseñas son verificables en Google Maps. Resultados pasados no garantizan resultados futuros.',
      en: 'Reviews are verifiable on Google Maps. Past results do not guarantee future outcomes.',
    },
  };

  if (!collaborator) return null;

  const testimonial = collaborator.testimonial;

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* FONDO ATMOSFÉRICO - CSS only, no JS animations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-600/20 rounded-full blur-[180px] opacity-40" />
      </div>

      {/* BREADCRUMB + BACK */}
      <section className="relative pt-32 pb-4 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/${language}/colaboradores`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B2904D] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {texts.backToTeam[language]}
          </Link>
        </div>
      </section>

      {/* HERO SECTION - Photo + Info (static — LCP) */}
      <section className="relative pt-8 pb-16 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Photo - Left Side */}
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  src={collaborator.image}
                  alt={collaborator.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Info - Right Side */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 mb-4 w-fit">
                <BadgeCheck size={14} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                  {texts.badge[language]}
                </span>
              </div>

              {/* Name + Role in H1 for SEO */}
              <h1 className="mb-3 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {/* Separador invisible: los dos <span> son `block`, así que el
                    salto lo da el layout y no hay espacio en el texto. Sin él
                    el H1 se extrae como "Jennifer OlveraMarketing Operations
                    Manager". Mismo patrón que el hero de la portada. */}
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {collaborator.name}
                </span>{' '}
                <span className="block text-[#B2904D] text-lg md:text-xl font-medium mt-2">
                  {collaborator.role[language]}
                </span>
              </h1>

              {/* Email — opcional: sin dirección confirmada no se pinta un
                  mailto: vacío, que manda al cliente a un buzón inexistente. */}
              {collaborator.email && (
                <a
                  href={`mailto:${collaborator.email}`}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-[#B2904D] transition-colors text-sm md:text-base mb-6 w-fit"
                >
                  <Mail size={16} className="text-[#B2904D]" />
                  {collaborator.email}
                </a>
              )}

              {/* Description */}
              <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed font-light mb-8">
                {collaborator.description[language].map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Official links row */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {officialLinks.map((link) => {
                  const Icon = LINK_ICONS[link.type];
                  return (
                    <a
                      key={link.type}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#B2904D] hover:border-[#B2904D] hover:text-[#001540] transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — rendered only when a real, attributable one exists */}
      {testimonial && (
      <section className="relative px-4 pb-16 z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="up" amount={0.3} className="relative bg-gradient-to-br from-[#B2904D]/15 to-[#B2904D]/5 rounded-2xl border border-[#B2904D]/30 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#B2904D]/20 rounded-lg">
                <Quote size={22} className="text-[#B2904D]" />
              </div>
              <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                {texts.testimonialTitle[language]}
              </span>
            </div>
            <div
              className="flex gap-1 mb-5"
              role="img"
              aria-label={language === 'es' ? '5 de 5 estrellas' : '5 out of 5 stars'}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#B2904D] fill-[#B2904D]" aria-hidden="true" />
              ))}
            </div>
            <p className="text-white text-xl md:text-2xl font-light italic leading-relaxed mb-6">
              &ldquo;{testimonial.quote[language]}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-[#B2904D]" />
              <div>
                <p className="text-white font-bold">{testimonial.author}</p>
                {testimonial.context && (
                  <p className="text-[#B2904D] text-xs font-medium tracking-wide uppercase">
                    {testimonial.context[language]}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* GOOGLE REVIEWS — DOCUMENTS IN HAND */}
      <section className="relative px-4 pb-16 z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="up" className="text-center mb-12" amount={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                {texts.reviewsBadge[language]}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {texts.reviewsTitle[language]}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {texts.reviewsSubtitle[language]}
            </p>
          </Reveal>

          {/* Document gallery — clients holding their documents */}
          <Stagger gap={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" amount={0.1}>
            {documentReviews.map((doc) => (
              <StaggerItem key={doc.src} as="div">
                <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#B2904D]/40 transition-all duration-500">
                  <Image
                    src={doc.src}
                    alt={doc.name}
                    width={400}
                    height={533}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-medium text-sm">{doc.name}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Verified Google review cards */}
          <Stagger gap={0.06} className="grid grid-cols-1 md:grid-cols-3 gap-6" amount={0.1}>
            {featuredGoogleReviews.map((review) => (
              <StaggerItem key={review.googleUrl + review.name} as="div">
                <div className="card-3d h-full bg-[#000a20]/80 border border-white/10 rounded-2xl p-6 hover:border-[#B2904D]/40 transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{review.name}</h3>
                    <span className="text-xs text-white/40">{review.office[language]}</span>
                  </div>
                  <div
                    className="flex gap-0.5 mb-4"
                    role="img"
                    aria-label={language === 'es' ? '5 de 5 estrellas' : '5 out of 5 stars'}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-[#B2904D] fill-[#B2904D]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-sm text-blue-100/70 leading-relaxed mb-5 flex-grow">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <a
                    href={review.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B2904D] hover:text-white transition-colors font-medium pt-4 border-t border-white/5"
                  >
                    <ExternalLink size={11} />
                    {texts.viewOnGoogle[language]}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="text-center text-xs text-white/30 mt-8">
            {texts.reviewsDisclaimer[language]}
          </p>
        </div>
      </section>

      {/* RELATED COLLABORATORS */}
      {relatedCollaborators.length > 0 && (
        <section className="relative px-4 pb-16 z-10">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="up" className="flex items-center gap-3 mb-8" amount={0.4}>
              <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/40 to-transparent" />
              <h2 className="text-lg sm:text-xl font-semibold text-[#B2904D] uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                <Users size={20} />
                {texts.relatedTitle[language]}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/40 to-transparent" />
            </Reveal>

            <Stagger gap={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" amount={0.1}>
              {relatedCollaborators.slice(0, 4).map((related) => (
                <StaggerItem key={related.id} as="div">
                  <Link
                    href={`/${language}/colaboradores/${related.id}`}
                    className="card-3d group relative h-[350px] rounded-2xl overflow-hidden block border border-white/10 bg-[#001540]/60 hover:border-[#B2904D]/70 hover:shadow-[0_0_30px_rgba(178,144,77,0.25)] transition-all duration-500"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/90 via-[#001540]/50 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-full p-5 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-1 bg-[#B2904D] mb-2 rounded-full group-hover:w-20 transition-all duration-500 shadow-[0_0_15px_#B2904D]" />
                      <h3 className="text-xl font-bold text-white leading-none mb-1 drop-shadow-lg">
                        {related.name}
                      </h3>
                      <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-3">
                        {related.role[language]}
                      </p>
                      <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                        {texts.viewProfile[language]} <ArrowRight size={16} className="text-[#B2904D]" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CONTACT FORM */}
      <section id="contacto" className="relative px-4 pb-24 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <FileText size={28} className="text-[#B2904D]" />
              {texts.contactTitle[language]}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {texts.contactSubtitle[language]}
            </p>
          </div>
          <div className="bg-[#001026]/80 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <ContactForm lang={language} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
