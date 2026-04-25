'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Send,
  Users,
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Calendar,
  Languages,
  ChevronDown,
  ChevronUp,
  Loader2,
  Eye,
  X,
  Newspaper,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { logoutAction } from './actions';

type Edition = {
  slug: string;
  titleEs: string;
  titleEn: string;
  date: string;
  descriptionEs: string;
  descriptionEn: string;
  sectionsCountEs: number;
  sectionsCountEn: number;
};

type Blog = {
  slug: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  categoryEs: string;
  categoryEn: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

type ProgressEvent = {
  type: 'progress' | 'summary' | 'error' | 'started';
  processed: number;
  total: number;
  withCta: number;
  withoutCta: number;
  errors: number;
  currentEmail?: string;
  message?: string;
};

type Mode = 'production' | 'test';
type ContentType = 'edition' | 'blog';

export default function AdminClient({
  lang,
  editions,
  blogs,
}: {
  lang: 'es' | 'en';
  editions: Edition[];
  blogs: Blog[];
}) {
  const [contentType, setContentType] = useState<ContentType>('blog');
  const [editionSlug, setEditionSlug] = useState(editions[0]?.slug ?? '');
  const [blogSlug, setBlogSlug] = useState(blogs[0]?.slug ?? '');
  const slug = contentType === 'edition' ? editionSlug : blogSlug;
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [mode, setMode] = useState<Mode>('production');
  const [dryRun, setDryRun] = useState(true);
  const [testEmailsText, setTestEmailsText] = useState('');
  const [confirmStep, setConfirmStep] = useState(false);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<ProgressEvent[]>([]);
  const [summary, setSummary] = useState<ProgressEvent | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const latest = events.at(-1);
  const progressPct =
    latest && latest.total > 0 ? Math.round((latest.processed / latest.total) * 100) : 0;
  const selectedEdition = editions.find((e) => e.slug === editionSlug);
  const selectedBlog = blogs.find((b) => b.slug === blogSlug);
  const selectedTitle =
    contentType === 'blog'
      ? selectedBlog && (language === 'es' ? selectedBlog.titleEs : selectedBlog.titleEn)
      : selectedEdition && (language === 'es' ? selectedEdition.titleEs : selectedEdition.titleEn);
  const errorEvents = events.filter((e) => e.type === 'progress' && e.message);

  const testEmails = testEmailsText
    .split(/[\n,]/)
    .map((e) => e.trim())
    .filter(Boolean);

  const canStart =
    !running &&
    Boolean(slug) &&
    (mode === 'production' || testEmails.length > 0);

  async function startBlast() {
    setEvents([]);
    setSummary(null);
    setFatalError(null);
    setRunning(true);
    setConfirmStep(false);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/newsletter/blast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          slug,
          language,
          dryRun,
          contentType,
          testEmails: mode === 'test' ? testEmails : undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const text = await response.text().catch(() => '');
        setFatalError(`Request failed (${response.status}): ${text || response.statusText}`);
        setRunning(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const line = part.split('\n').find((l) => l.startsWith('data: '));
          if (!line) continue;
          const payload = line.slice(6).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload) as ProgressEvent;
            setEvents((prev) => [...prev, evt]);
            if (evt.type === 'summary') setSummary(evt);
            if (evt.type === 'error') setFatalError(evt.message ?? 'Unknown error');
          } catch {
            // ignore malformed
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setFatalError((err as Error).message);
      }
    } finally {
      setRunning(false);
    }
  }

  function cancel() {
    abortRef.current?.abort();
    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Link
            href={`/${lang}/admin`}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#001540] mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al panel
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001540] text-white text-xs font-bold tracking-wider uppercase mb-3">
                <Mail className="w-3.5 h-3.5" />
                Admin · Newsletter
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#001540] tracking-tight">
                Newsletter Blast
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Envío segmentado contra BOS · Manuel Solis Law
              </p>
            </div>
            <form action={logoutAction}>
              <input type="hidden" name="lang" value={lang} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#001540] hover:bg-white px-3 py-2 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </button>
            </form>
          </div>
          <div className="h-[3px] w-20 bg-[#B2904D] mt-4 rounded-full" />
        </header>

        <Card>
          <SectionTitle icon={FileText} step={1} title="Tipo de envío" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <TypeTab
              active={contentType === 'blog'}
              disabled={running}
              onClick={() => setContentType('blog')}
              icon={FileText}
              title="Blog post"
              caption={`${blogs.length} disponibles`}
            />
            <TypeTab
              active={contentType === 'edition'}
              disabled={running}
              onClick={() => setContentType('edition')}
              icon={Newspaper}
              title="Edición de newsletter"
              caption={`${editions.length} disponibles`}
            />
          </div>

          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              {contentType === 'blog' ? 'Elige el blog' : 'Elige la edición'}
            </h3>
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {contentType === 'blog'
                ? blogs.map((b) => (
                    <button
                      key={b.slug}
                      type="button"
                      onClick={() => setBlogSlug(b.slug)}
                      disabled={running}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                        blogSlug === b.slug
                          ? 'border-[#B2904D] bg-[#fbf7ef]'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      } ${running ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            blogSlug === b.slug
                              ? 'border-[#B2904D] bg-[#B2904D]'
                              : 'border-gray-300'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-[#001540] text-white text-[10px] font-bold uppercase tracking-wide">
                              {language === 'es' ? b.categoryEs : b.categoryEn}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(b.date).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            <span>· {b.readTime}</span>
                          </div>
                          <div className="font-semibold text-[#001540] text-sm leading-snug">
                            {language === 'es' ? b.titleEs : b.titleEn}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {language === 'es' ? b.excerptEs : b.excerptEn}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                : editions.map((ed) => (
                    <button
                      key={ed.slug}
                      type="button"
                      onClick={() => setEditionSlug(ed.slug)}
                      disabled={running}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        editionSlug === ed.slug
                          ? 'border-[#B2904D] bg-[#fbf7ef]'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      } ${running ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            editionSlug === ed.slug
                              ? 'border-[#B2904D] bg-[#B2904D]'
                              : 'border-gray-300'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(ed.date).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="font-semibold text-[#001540] text-sm md:text-base">
                            {language === 'es' ? ed.titleEs : ed.titleEn}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {language === 'es' ? ed.descriptionEs : ed.descriptionEn}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle icon={Languages} step={2} title="Idioma del envío" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                disabled={running}
                className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                  language === l
                    ? 'border-[#001540] bg-[#001540] text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                } ${running ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {l === 'es' ? '🇲🇽 Español' : '🇺🇸 English'}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle icon={Users} step={3} title="¿A quién enviar?" />
          <div className="mt-4 space-y-3">
            <ModeOption
              active={mode === 'production'}
              disabled={running}
              onClick={() => setMode('production')}
              icon={Users}
              title="Toda la audiencia activa"
              description="Trae automáticamente todos los suscriptores activos desde Resend, los clasifica contra BOS y envía a cada uno."
              badge="Producción"
              badgeColor="navy"
            />
            <ModeOption
              active={mode === 'test'}
              disabled={running}
              onClick={() => setMode('test')}
              icon={FlaskConical}
              title="Lista manual de prueba"
              description="Solo envía a los emails que pegues abajo. Útil para QA antes de un envío real."
              badge="Avanzado"
              badgeColor="gold"
            />
          </div>
          <AnimatePresence initial={false}>
            {mode === 'test' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pl-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Emails de prueba (uno por línea o separados por coma)
                  </label>
                  <textarea
                    value={testEmailsText}
                    onChange={(e) => setTestEmailsText(e.target.value)}
                    placeholder={'email1@ejemplo.com\nemail2@ejemplo.com'}
                    disabled={running}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#B2904D] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {testEmails.length} email{testEmails.length === 1 ? '' : 's'} válidos detectados.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <Card>
          <SectionTitle icon={Send} step={4} title="Acción" />
          <div className="mt-4 space-y-3">
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                dryRun
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } ${running ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <input
                type="checkbox"
                checked={dryRun}
                onChange={(e) => setDryRun(e.target.checked)}
                disabled={running}
                className="mt-1 w-4 h-4 accent-emerald-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold text-sm text-emerald-900">
                    Dry run — solo previsualiza
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80 mt-1">
                  Clasifica todos los suscriptores contra BOS pero <strong>no envía</strong> ningún correo. Recomendado antes del envío real.
                </p>
              </div>
            </label>
          </div>

          {!confirmStep && !running && (
            <button
              type="button"
              onClick={() => setConfirmStep(true)}
              disabled={!canStart}
              className={`mt-5 w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                canStart
                  ? dryRun
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#B2904D] hover:bg-[#9a7c40] text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {dryRun ? (
                <>
                  <Eye className="w-4 h-4" />
                  Preparar dry run
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Preparar envío real
                </>
              )}
            </button>
          )}

          <AnimatePresence>
            {confirmStep && !running && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-5 p-5 rounded-xl border-2 ${
                  dryRun ? 'border-emerald-200 bg-emerald-50' : 'border-amber-300 bg-amber-50'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  {dryRun ? (
                    <Eye className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {dryRun
                        ? 'Vas a ejecutar un DRY RUN.'
                        : 'Vas a enviar correos REALES.'}
                    </p>
                    <ul className="text-xs text-gray-700 mt-2 space-y-1">
                      <li>· Tipo: <strong>{contentType === 'blog' ? 'Blog post' : 'Edición de newsletter'}</strong></li>
                      <li>· Contenido: <strong>{selectedTitle}</strong></li>
                      <li>· Idioma: <strong>{language === 'es' ? 'Español' : 'English'}</strong></li>
                      <li>· Audiencia: <strong>{mode === 'production' ? 'Toda la lista activa de Resend' : `${testEmails.length} emails de prueba`}</strong></li>
                      <li>· Modo: <strong>{dryRun ? 'Sin enviar (preview)' : 'Envío real'}</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={startBlast}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm text-white transition-colors ${
                      dryRun
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    {dryRun ? 'Ejecutar dry run' : 'Sí, enviar ahora'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmStep(false)}
                    className="px-4 py-2.5 rounded-lg font-semibold text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {running && (
            <button
              type="button"
              onClick={cancel}
              className="mt-5 w-full py-3 px-4 rounded-xl font-semibold text-sm text-red-700 bg-white border-2 border-red-300 hover:bg-red-50 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar proceso
            </button>
          )}
        </Card>

        <AnimatePresence>
          {(running || events.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {running ? (
                      <Loader2 className="w-5 h-5 text-[#B2904D] animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    <h2 className="font-semibold text-[#001540]">
                      {running ? 'Procesando...' : 'Proceso completado'}
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">
                    {progressPct}%
                  </span>
                </div>

                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#B2904D] to-[#d4a85f]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                  <Metric label="Procesados" value={latest?.processed ?? 0} />
                  <Metric label="Total" value={latest?.total ?? 0} />
                  <Metric label="Con CTA" value={latest?.withCta ?? 0} tone="cta" />
                  <Metric label="Sin CTA" value={latest?.withoutCta ?? 0} tone="no-cta" />
                  <Metric label="Errores" value={latest?.errors ?? 0} tone="error" />
                </div>

                {latest?.currentEmail && running && (
                  <div className="text-xs text-gray-500 font-mono px-3 py-2 bg-gray-50 rounded-lg">
                    → {latest.currentEmail}
                  </div>
                )}

                {errorEvents.length > 0 && (
                  <details className="mt-4 group">
                    <summary className="flex items-center justify-between cursor-pointer text-xs font-semibold text-red-700 hover:text-red-800">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errorEvents.length} evento{errorEvents.length === 1 ? '' : 's'} con mensaje
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 group-open:hidden" />
                      <ChevronUp className="w-3.5 h-3.5 hidden group-open:block" />
                    </summary>
                    <div className="mt-3 max-h-48 overflow-y-auto bg-red-50 border border-red-200 rounded-lg divide-y divide-red-100">
                      {errorEvents.slice(-30).map((e, i) => (
                        <div key={i} className="px-3 py-2 text-xs font-mono">
                          <span className="text-gray-500">{e.currentEmail}</span>
                          <span className="text-red-700 ml-2 break-all">{e.message}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {summary && !running && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <h2 className="font-bold text-emerald-900">Resumen final</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <SummaryStat label="Procesados" value={`${summary.processed} / ${summary.total}`} />
                  <SummaryStat label="Con CTA" value={summary.withCta} />
                  <SummaryStat label="Sin CTA" value={summary.withoutCta} />
                  <SummaryStat label="Errores" value={summary.errors} highlight={summary.errors > 0} />
                </div>
                {summary.message && (
                  <p className="text-xs text-emerald-700 mt-4">{summary.message}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {fatalError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-800 mt-1 break-words">{fatalError}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  step,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  step: number;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#001540] text-white text-xs font-bold">
        {step}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#B2904D]" />
        <h2 className="font-semibold text-[#001540]">{title}</h2>
      </div>
    </div>
  );
}

function TypeTab({
  active,
  disabled,
  onClick,
  icon: Icon,
  title,
  caption,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  caption: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-xl border-2 text-left transition-all ${
        active
          ? 'border-[#001540] bg-[#001540] text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${active ? 'text-[#B2904D]' : 'text-gray-500'}`} />
        <span className="font-bold text-sm">{title}</span>
      </div>
      <div className={`text-xs ${active ? 'text-blue-100/80' : 'text-gray-500'}`}>
        {caption}
      </div>
    </button>
  );
}

function ModeOption({
  active,
  disabled,
  onClick,
  icon: Icon,
  title,
  description,
  badge,
  badgeColor,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  badgeColor: 'navy' | 'gold';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        active
          ? 'border-[#001540] bg-blue-50/30'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
            active ? 'border-[#001540] bg-[#001540]' : 'border-gray-300'
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Icon className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-sm text-[#001540]">{title}</span>
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                badgeColor === 'navy'
                  ? 'bg-[#001540] text-white'
                  : 'bg-[#B2904D] text-white'
              }`}
            >
              {badge}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1.5">{description}</p>
        </div>
      </div>
    </button>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'error' | 'cta' | 'no-cta';
}) {
  const toneClass =
    tone === 'error' && value > 0
      ? 'text-red-600'
      : tone === 'cta'
      ? 'text-[#B2904D]'
      : tone === 'no-cta'
      ? 'text-emerald-600'
      : 'text-[#001540]';
  return (
    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2.5 text-center">
      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
        {label}
      </div>
      <div className={`text-lg md:text-xl font-bold tabular-nums ${toneClass}`}>{value}</div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg ${
        highlight ? 'bg-red-100 border border-red-200' : 'bg-white border border-emerald-100'
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">
        {label}
      </div>
      <div className={`text-lg font-bold ${highlight ? 'text-red-700' : 'text-emerald-900'}`}>
        {value}
      </div>
    </div>
  );
}
