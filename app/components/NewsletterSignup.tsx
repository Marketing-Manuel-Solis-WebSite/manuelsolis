'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Loader2, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
    cta: 'Suscribirme',
    sending: 'Enviando...',
    success: '¡Bienvenido! Revisa tu correo para confirmar.',
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
    cta: 'Subscribe',
    sending: 'Sending...',
    success: 'Welcome! Check your email to confirm.',
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
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, language }),
      });

      if (res.ok) {
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
        <p className="text-sm text-[#888] mb-4">{t.subtitle}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C4A265]/50 focus:ring-1 focus:ring-[#C4A265]/30 transition-all"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-3 rounded-lg bg-[#C4A265] text-[#0A0A0A] font-semibold text-sm hover:bg-[#c9a85e] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              t.cta
            )}
          </motion.button>
        </form>
        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-emerald-400 mt-2"
            >
              {t.success}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 mt-2"
            >
              {t.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full my-12 rounded-2xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url(/noise.png)' }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4A265] to-transparent" />

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C4A265]/10 border border-[#C4A265]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C4A265]" />
              <span className="text-xs font-medium text-[#C4A265] tracking-wide">{t.badge}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {t.title}
            </h3>
            <p className="text-[#888] text-sm md:text-base max-w-md">{t.subtitle}</p>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-auto md:min-w-[380px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-white font-medium text-center">{t.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C4A265]/50 focus:ring-1 focus:ring-[#C4A265]/30 transition-all backdrop-blur-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      required
                      className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C4A265]/50 focus:ring-1 focus:ring-[#C4A265]/30 transition-all backdrop-blur-sm"
                    />
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3.5 rounded-xl bg-[#C4A265] text-[#0A0A0A] font-bold text-sm hover:bg-[#c9a85e] transition-all shadow-lg shadow-[#C4A265]/20 disabled:opacity-50 flex items-center gap-2"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {t.cta}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-3.5 h-3.5 text-[#C4A265]/50" />
                    <p className="text-xs text-[#666]">{t.privacy}</p>
                  </div>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-400"
                    >
                      {t.error}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    );
  }

  // Default: inline variant (for blog sidebar, etc.)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#111111]" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4A265] to-transparent" />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#C4A265]/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#C4A265]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#C4A265] tracking-wide uppercase">
              {t.badge}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-[#888] mb-5">{t.subtitle}</p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-300">{t.success}</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C4A265]/50 focus:ring-1 focus:ring-[#C4A265]/30 transition-all"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-[#C4A265] text-[#0A0A0A] font-bold text-sm hover:bg-[#c9a85e] transition-all shadow-lg shadow-[#C4A265]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {t.cta}
                  </>
                )}
              </motion.button>
              <p className="text-xs text-[#666] text-center">{t.privacy}</p>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400 text-center"
                >
                  {t.error}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
