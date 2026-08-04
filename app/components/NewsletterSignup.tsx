'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Loader2, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fireConversion } from '../lib/conversion';
import { fetchWithTimeout } from '../lib/fetchTimeout';

interface NewsletterSignupProps {
  variant?: 'inline' | 'banner' | 'footer';
}

const texts = {
  es: {
    badge: 'Newsletter Gratuito',
    title: 'Mantente informado sobre tus derechos',
    subtitle:
      'Recibe actualizaciones sobre leyes de inmigración, cambios de política y consejos legales directamente en tu correo.',
    emailPlaceholder: 'Tu correo electrónico',
    namePlaceholder: 'Tu nombre (opcional)',
    emailLabel: 'Correo electrónico',
    nameLabel: 'Nombre (opcional)',
    cta: 'Suscribirme',
    sending: 'Enviando...',
    subscribed: 'Suscrito',
    // El alta es directa (sin doble confirmación): lo único que llega es el
    // correo de bienvenida que envía /api/newsletter/subscribe.
    success: '¡Listo! Ya estás suscrito. Te enviamos un correo de bienvenida.',
    error: 'Hubo un error. Intenta de nuevo.',
    privacy: 'Respetamos tu privacidad. Cancela cuando quieras.',
    readers: '+2,500 lectores confían en nosotros',
  },
  en: {
    badge: 'Free Newsletter',
    title: 'Stay informed about your rights',
    subtitle:
      'Get updates on immigration law changes, policy shifts, and legal tips delivered to your inbox.',
    emailPlaceholder: 'Your email address',
    namePlaceholder: 'Your name (optional)',
    emailLabel: 'Email address',
    nameLabel: 'First name (optional)',
    cta: 'Subscribe',
    sending: 'Sending...',
    subscribed: 'Subscribed',
    success: "You're subscribed! We just sent you a welcome email.",
    error: 'Something went wrong. Try again.',
    privacy: 'We respect your privacy. Unsubscribe anytime.',
    readers: '+2,500 readers trust us',
  },
};

export default function NewsletterSignup({ variant = 'inline' }: NewsletterSignupProps) {
  const { language } = useLanguage();
  const t = texts[language] || texts.es;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      // Sin tope, un fetch que nunca resuelve deja el botón en "cargando" para
      // siempre y el visitante no sabe si se suscribió.
      const res = await fetchWithTimeout(
        '/api/newsletter/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName, language }),
        },
        15000,
      );

      if (res.ok) {
        // Solo tras el alta confirmada por el servidor: un evento disparado al
        // enviar contaría intentos, no suscripciones.
        fireConversion('newsletter_signup', `newsletter_${variant}`, { language });
        setStatus('success');
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'footer') {
    return (
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-blue-200/60 mb-4">{t.subtitle}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            aria-label={t.emailLabel}
            autoComplete="email"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#B2904D]/50 focus:ring-1 focus:ring-[#B2904D]/30 transition-all"
          />
          <m.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            aria-label={status === 'loading' ? t.sending : status === 'success' ? t.subscribed : undefined}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-3 rounded-lg bg-[#B2904D] text-[#001540] font-semibold text-sm hover:bg-[#c9a85e] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              t.cta
            )}
          </m.button>
        </form>
        {/* El contenedor del mensaje existe siempre: una región live que se
            inserta junto con su contenido no se anuncia. */}
        <div role="status" aria-live="polite">
          <AnimatePresence>
            {status === 'success' && (
              <m.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-400 mt-2"
              >
                {t.success}
              </m.p>
            )}
            {status === 'error' && (
              <m.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 mt-2"
              >
                {t.error}
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <m.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full my-12 rounded-2xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001540] via-[#001a4d] to-[#002060]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url(/noise.png)' }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent" />

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B2904D]" />
              <span className="text-xs font-medium text-[#B2904D] tracking-wide">{t.badge}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {t.title}
            </h3>
            <p className="text-blue-200/60 text-sm md:text-base max-w-md">{t.subtitle}</p>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-auto md:min-w-[380px]">
            {/* El panel de éxito sustituye al formulario, así que el aviso para
                lectores de pantalla vive en una región persistente aparte. */}
            <div role="status" aria-live="polite" className="sr-only">
              {status === 'success' ? t.success : status === 'error' ? t.error : ''}
            </div>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-white font-medium text-center">{t.success}</p>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    aria-label={t.nameLabel}
                    autoComplete="given-name"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#B2904D]/50 focus:ring-1 focus:ring-[#B2904D]/30 transition-all backdrop-blur-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      aria-label={t.emailLabel}
                      autoComplete="email"
                      required
                      className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#B2904D]/50 focus:ring-1 focus:ring-[#B2904D]/30 transition-all backdrop-blur-sm"
                    />
                    <m.button
                      type="submit"
                      disabled={status === 'loading'}
                      aria-label={status === 'loading' ? t.sending : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3.5 rounded-xl bg-[#B2904D] text-[#001540] font-bold text-sm hover:bg-[#c9a85e] transition-all shadow-lg shadow-[#B2904D]/20 disabled:opacity-50 flex items-center gap-2"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {t.cta}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </m.button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-3.5 h-3.5 text-[#B2904D]/50" />
                    <p className="text-xs text-blue-200/40">{t.privacy}</p>
                  </div>
                  {status === 'error' && (
                    <m.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-400"
                    >
                      {t.error}
                    </m.p>
                  )}
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.section>
    );
  }

  // Default: inline variant (for blog sidebar, etc.)
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#001540] to-[#001a4d]" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent" />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#B2904D]/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#B2904D]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#B2904D] tracking-wide uppercase">
              {t.badge}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-blue-200/60 mb-5">{t.subtitle}</p>

        {/* Ver la nota de la variante banner: el éxito reemplaza al formulario. */}
        <div role="status" aria-live="polite" className="sr-only">
          {status === 'success' ? t.success : status === 'error' ? t.error : ''}
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <m.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-300">{t.success}</p>
            </m.div>
          ) : (
            <m.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                aria-label={t.emailLabel}
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#B2904D]/50 focus:ring-1 focus:ring-[#B2904D]/30 transition-all"
              />
              <m.button
                type="submit"
                disabled={status === 'loading'}
                aria-label={status === 'loading' ? t.sending : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-[#B2904D] text-[#001540] font-bold text-sm hover:bg-[#c9a85e] transition-all shadow-lg shadow-[#B2904D]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {t.cta}
                  </>
                )}
              </m.button>
              <p className="text-xs text-blue-200/40 text-center">{t.privacy}</p>
              {status === 'error' && (
                <m.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400 text-center"
                >
                  {t.error}
                </m.p>
              )}
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
