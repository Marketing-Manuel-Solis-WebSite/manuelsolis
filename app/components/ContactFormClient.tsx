'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { m, AnimatePresence, Variants } from 'framer-motion'
import { User, Phone, Mail, MessageSquare, CheckCircle2, ShieldCheck, Zap, XCircle, type LucideIcon } from 'lucide-react'
import { fireConversion } from '../lib/conversion'
import { fetchWithTimeout, FetchTimeoutError } from '../lib/fetchTimeout'
import { getEffectiveUtms, effectiveUtmsToLeadFields } from '../lib/attribution'
import { collectMetaBrowserParams } from '../lib/metaPixel'

// Client island: the interactive lead-capture form. La sección y el encabezado
// viven en el wrapper de servidor (ContactForm.tsx); aquí quedan el submit, la
// validación, la atribución (UTM/click IDs) y el evento de conversión. Es el
// único camino de captura de leads del sitio: no romperlo.
//
// Sin hooks de navegación (useSearchParams): eso forzaría un boundary de
// Suspense y el formulario saldría del HTML prerenderizado de las ~65 páginas
// estáticas. Los click IDs se leen de window.location.search en el submit,
// igual que readTouchFromUrl() en lib/attribution.ts.
const API_URL = '/api/lead-capture';
// Vercel BotID protection for /api/lead-capture is registered in
// instrumentation-client.ts and verified server-side via checkBotId()
// in app/api/lead-capture/route.ts. Mode controlled by BOTID_MODE env.

const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

interface NeonInputProps {
  icon: LucideIcon;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Nombre accesible del campo, renderizado como <label> sr-only. Si se omite,
   *  quien lo usa DEBE asociar su propio <label htmlFor={name}>: el control no
   *  lleva ningún otro nombre (el placeholder no cuenta). */
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
  autoComplete?: string;
}

const NeonInput = ({
  icon: Icon,
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  isTextArea = false,
  autoComplete,
}: NeonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `w-full bg-[#000510]/60 border rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors z-10 relative
    ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/90' : 'border-white/10 hover:border-white/20'}`;

  return (
    <div className="relative group">
      {label && (
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      )}

      <div className="absolute left-4 top-4 z-20 pointer-events-none text-[#64748b] group-focus-within:text-[#B2904D] transition-colors">
        <Icon size={20} />
      </div>

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          rows={5}
          className={`${baseClasses} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          className={baseClasses}
          placeholder={placeholder}
        />
      )}

      <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-transparent overflow-hidden pointer-events-none">
        <m.div
          initial={{ x: "-100%" }}
          animate={{ x: isFocused ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full bg-[#B2904D]"
        />
      </div>
    </div>
  );
};

// Regla de teléfono replicada del servidor (leadCapture.ts PHONE_MIN_DIGITS):
// si divergen, el usuario recibe un 400 que ya no puede accionar.
const PHONE_MIN_DIGITS = 7;

// Honeypot: campo que ninguna persona ve ni puede tabular. Si llega con
// contenido, el envío es automatizado y se descarta en silencio (nunca se avisa
// al bot). El nombre viaja también en el payload para que el route pueda
// aplicar la misma regla server-side sin cambiar el cliente.
const HONEYPOT_FIELD = 'website';

// Tope del envío. Generoso a propósito: el servidor reintenta contra el CRM
// hasta tres veces antes de responder, y cortar demasiado pronto descartaría un
// lead que sí iba a entregarse.
const SUBMIT_TIMEOUT_MS = 20000;

interface BilingualMessage {
  es: string;
  en: string;
}

const PHONE_MESSAGE: BilingualMessage = {
  es: `El teléfono debe tener al menos ${PHONE_MIN_DIGITS} dígitos.`,
  en: `The phone number must have at least ${PHONE_MIN_DIGITS} digits.`,
};

// El servidor responde 400 con { error, field }; el texto del servidor es
// técnico y monolingüe, así que el mensaje al usuario se resuelve aquí.
const FIELD_MESSAGES: Record<string, BilingualMessage | undefined> = {
  first_name: {
    es: 'Escriba su nombre.',
    en: 'Please enter your first name.',
  },
  phone: PHONE_MESSAGE,
  email: {
    es: 'Revise su correo electrónico: no parece una dirección válida.',
    en: 'Please check your email address: it does not look valid.',
  },
  acceptedTerms: {
    es: 'Debe aceptar los Términos de Servicio para enviar su consulta.',
    en: 'You must accept the Terms of Service to send your inquiry.',
  },
};

const GENERIC_FIELD_MESSAGE: BilingualMessage = {
  es: 'Revise los datos del formulario e intente de nuevo.',
  en: 'Please review the form fields and try again.',
};

const RATE_LIMIT_MESSAGE: BilingualMessage = {
  es: 'Recibimos varios envíos desde su conexión. Espere un minuto e intente de nuevo.',
  en: 'We received several submissions from your connection. Please wait a minute and try again.',
};

const TRANSPORT_ERROR_MESSAGE: BilingualMessage = {
  es: 'Hubo un problema al enviar su consulta. Intente de nuevo más tarde.',
  en: 'There was an issue sending your inquiry. Please try again later.',
};

// El envío pudo haber llegado aunque la respuesta no volviera, así que el
// mensaje evita pedir un reenvío que duplicaría el lead y remite al teléfono
// que la propia página ya muestra (no se codifica aquí ningún número: cada
// página enseña el de su oficina).
const TIMEOUT_MESSAGE: BilingualMessage = {
  es: 'El envío está tardando más de lo normal y puede que ya haya llegado. No lo reenvíe: si prefiere no esperar, llámenos al número que aparece en esta página y le atendemos de inmediato.',
  en: 'Your submission is taking longer than usual and may already have gone through. Please do not resend it: if you would rather not wait, call the number shown on this page and we will assist you right away.',
};

export default function ContactFormClient() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';

  const [formData, setFormData] = useState({
    first_name: '', last_name: '', phone: '', email: '', enquiry_detail: '',
    acceptedTerms: false, marketingConsent: false
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [overlayMessage, setOverlayMessage] = useState<BilingualMessage>(TRANSPORT_ERROR_MESSAGE);
  const [fieldMessage, setFieldMessage] = useState<BilingualMessage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms || isSubmitting) return;

    // Honeypot relleno = envío automatizado. Se aparenta éxito para no darle
    // señal al bot, pero no se hace POST ni se registra conversión.
    if (honeypot.trim().length > 0) {
      setFieldMessage(null);
      setSubmitStatus('success');
      return;
    }

    // Misma regla que el servidor: atrapamos el teléfono corto antes de
    // gastar un envío que volvería como 400.
    if (formData.phone.replace(/\D/g, '').length < PHONE_MIN_DIGITS) {
      setFieldMessage(PHONE_MESSAGE);
      return;
    }

    setFieldMessage(null);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Atribución EFECTIVA: URL actual → last-touch → first-touch (cookie
    // msl_attr) → directo. Antes solo se leía el URL actual, así que un lead
    // que llegaba por campaña y luego navegaba a /consulta (sin UTMs en el URL)
    // perdía su origen y caía a "directo". Ahora la campaña real sobrevive la
    // navegación interna y se envía a BOS.
    // Centinelas GA4 + campaña (lógica pura, validada en
    // __tests__/attribution.test.ts vía effectiveUtmsToLeadFields).
    const eff = getEffectiveUtms();
    const utmData = effectiveUtmsToLeadFields(eff);

    let urlParams: URLSearchParams | null = null;
    let pageUrl = '';
    let sessionId: string | null = null;

    if (typeof window !== 'undefined') {
      try {
        urlParams = new URLSearchParams(window.location.search);
      } catch {
        urlParams = null;
      }
      const hasParams = (urlParams?.toString().length ?? 0) > 0;
      pageUrl = hasParams
        ? window.location.href
        : `${window.location.origin}${window.location.pathname}`;
      try {
        sessionId = window.sessionStorage.getItem('msl_sid');
      } catch {
        sessionId = null;
      }
    }

    // Click IDs: el URL actual gana; si no está (el usuario navegó internamente
    // y perdió el ?gclid=), recuperamos el persistido en la cookie msl_attr.
    const clickIds = {
      gclid: urlParams?.get('gclid') || eff.gclid || null,
      fbclid: urlParams?.get('fbclid') || eff.fbclid || null,
    };

    // Match keys de Meta (cookies _fbp/_fbc del Pixel): solo existen en el
    // navegador del lead y solo en este momento — viajan con el lead para
    // que BOS los adjunte a los eventos CAPI de Lead Qualified/Purchase,
    // que un agente dispara días después desde otra máquina.
    const metaKeys = collectMetaBrowserParams();

    try {
      const payload = {
        ...formData,
        ...utmData,
        ...clickIds,
        fbp: metaKeys.fbp || null,
        fbc: metaKeys.fbc || null,
        [HONEYPOT_FIELD]: honeypot,
        page_url: pageUrl,
        language: lang,
        session_id: sessionId,
      };

      // El tope evita que el envío quede colgado indefinidamente dejando al
      // usuario en "Procesando..." sin error ni reintento, que es lo que pasó
      // cuando el challenge de BotID no se servía y el fetch parcheado nunca
      // resolvía (mayo de 2026). Va por fetchWithTimeout y no por
      // AbortSignal.timeout porque esa API no existe en iOS 15 y allí romper
      // el envío sería peor que el cuelgue que se quiere evitar.
      const response = await fetchWithTimeout(
        API_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
        SUBMIT_TIMEOUT_MS,
      );

      if (response.ok) {
        // Un solo evento de conversión por envío: fireConversion hace el
        // fanout a las cinco superficies con un eventID compartido.
        fireConversion('form_submit', 'contact_form', {
          language: lang,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        });

        setSubmitStatus('success');
        setFormData({
          first_name: '', last_name: '', phone: '', email: '', enquiry_detail: '',
          acceptedTerms: false, marketingConsent: false
        });
      } else {
        const data = (await response.json().catch(() => null)) as { field?: string } | null;
        const field = typeof data?.field === 'string' ? data.field : null;

        // Solo la validación propia del route responde 400 con `field`; ahí el
        // usuario puede corregir, así que el mensaje va junto al formulario en
        // vez del overlay de "intente más tarde". Un 4xx sin `field` viene del
        // destino del lead: para el usuario es un fallo de envío.
        if (response.status === 400 && field) {
          setFieldMessage(FIELD_MESSAGES[field] ?? GENERIC_FIELD_MESSAGE);
        } else {
          setOverlayMessage(
            response.status === 429 ? RATE_LIMIT_MESSAGE : TRANSPORT_ERROR_MESSAGE,
          );
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      // Un timeout no se distingue de una caída de red para el usuario, pero sí
      // para quien lea los logs: el lead pudo haber llegado al CRM aunque la
      // respuesta no volviera, así que el mensaje no debe afirmar que se perdió.
      const timedOut = error instanceof FetchTimeoutError;
      setOverlayMessage(timedOut ? TIMEOUT_MESSAGE : TRANSPORT_ERROR_MESSAGE);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (fieldMessage) setFieldMessage(null);
  };

  const t = (es: string, en: string) => (lang === 'es' ? es : en);

  return (
    /*
      `initial={false}`, no "hidden": el formulario de captación de todo el sitio
      se servía dentro de opacity:0 en las 332 páginas que lo montan, y sus ocho
      campos heredaban el mismo estado por `containerVar`/`itemVar`. Solo se
      hacía visible cuando framer-motion hidrataba y descargaba su chunk
      asíncrono, que no está precargado en ningún <link rel=preload>: si ese
      chunk no llegaba —red móvil mala, bloqueador, despliegue a medias— el
      formulario quedaba invisible, funcional y sin error en ningún log.
      Los hijos heredan el estado del contenedor, así que esta línea quita dos
      de las tres capas. La tercera es el <Reveal> que lo envuelve en cada
      página, y va con `eager`.
    */
    <m.div variants={containerVar} initial={false} whileInView="visible" viewport={{ once: true }}
      className="relative bg-[#001026]/95 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        {/* Ni el éxito ni el error se auto-ocultan: el éxito esconde un
            formulario ya vacío (invita al reenvío duplicado) y un error que
            desaparece solo deja al usuario sin saber qué pasó. Ambos se cierran
            con el botón. */}
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#001540]/98 flex flex-col items-center justify-center text-center rounded-[2rem]" role="alert" aria-live="assertive">
              {submitStatus === 'success' ? (
                <>
                  <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                    <CheckCircle2 size={80} className="text-green-400 mb-6" />
                  </m.div>
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('¡Enviado con Éxito!', 'Successfully Sent!')}</h3>
                  <p className="text-blue-200 max-w-md px-6">{t('Recibimos su consulta. Un miembro de nuestro equipo le contactará por teléfono o correo dentro de las próximas 24 horas hábiles. No necesita enviarla de nuevo.', 'We received your inquiry. A member of our team will contact you by phone or email within the next business day. There is no need to send it again.')}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 rounded-xl border border-[#B2904D]/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#B2904D] transition-colors hover:bg-[#B2904D] hover:text-[#001026] cursor-pointer"
                  >
                    {t('Enviar otra consulta', 'Send another inquiry')}
                  </button>
                </>
              ) : (
                <>
                  <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                    <XCircle size={80} className="text-red-400 mb-6" />
                  </m.div>
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('Error de Envío', 'Submission Error')}</h3>
                  <p className="text-red-200 max-w-md px-6">{t(overlayMessage.es, overlayMessage.en)}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 rounded-xl border border-[#B2904D]/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#B2904D] transition-colors hover:bg-[#B2904D] hover:text-[#001026] cursor-pointer"
                  >
                    {t('Volver al formulario', 'Back to the form')}
                  </button>
                </>
              )}
            </m.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-8">
          <m.div variants={itemVar}>
            <fieldset className="min-w-0 p-0">
              <legend className="block p-0 text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Identidad', 'Identity')}</legend>
              <div className="space-y-5">
                <NeonInput icon={User} name="first_name" label={t('Nombre', 'First name')} autoComplete="given-name" placeholder={t('Nombre', 'First Name')} value={formData.first_name} onChange={handleChange} required />
                <NeonInput icon={User} name="last_name" label={t('Apellido', 'Last name')} autoComplete="family-name" placeholder={t('Apellido', 'Last Name')} value={formData.last_name} onChange={handleChange} required />
              </div>
            </fieldset>
          </m.div>

          <m.div variants={itemVar}>
            <fieldset className="min-w-0 p-0">
              <legend className="block p-0 text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Contacto', 'Contact')}</legend>
              <div className="space-y-5">
                <NeonInput icon={Phone} name="phone" type="tel" label={t('Teléfono', 'Phone number')} autoComplete="tel" placeholder={t('Teléfono', 'Phone Number')} value={formData.phone} onChange={handleChange} required />
                <NeonInput icon={Mail} name="email" type="email" label={t('Correo electrónico', 'Email address')} autoComplete="email" placeholder={t('Correo', 'Email Address')} value={formData.email} onChange={handleChange} required />
              </div>
            </fieldset>
          </m.div>
        </div>

        <m.div variants={itemVar}>
          <label htmlFor="enquiry_detail" className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Detalles', 'Details')}</label>
          <NeonInput icon={MessageSquare} name="enquiry_detail" isTextArea placeholder={t('Describa brevemente su situación legal...', 'Briefly describe your legal situation...')} value={formData.enquiry_detail} onChange={handleChange} required />
        </m.div>

        <div className="space-y-4">
          <m.div variants={itemVar} className="p-5 rounded-xl bg-[#000814]/50 border border-white/10">
            <p className="text-xs text-blue-200/80 leading-relaxed">
              {t(
                'Al proporcionar voluntariamente su número de teléfono y optar explícitamente por recibir mensajes de texto, usted consiente recibir comunicaciones SMS del Law Office of Manuel Solis relacionadas con responder a consultas sobre servicios de inmigración, programar consultas, enviar recordatorios de citas, solicitar documentos y proporcionar actualizaciones de casos. La frecuencia de los mensajes puede variar. Pueden aplicarse tarifas estándar de mensajes y datos. Su consentimiento para recibir mensajes SMS no es una condición para adquirir ningún servicio. Puede cancelar en cualquier momento respondiendo "STOP" a cualquier mensaje, y puede solicitar ayuda adicional respondiendo "HELP". Para más detalles, por favor visite nuestra',
                'By voluntarily providing your phone number and explicitly opting in to text messages, you consent to receive SMS communications from Law Office of Manuel Solis regarding respond to immigration service inquiries, schedule consultations, send appointment reminders, request documents, and provide case updates. Message frequency may vary. Standard messaging and data rates may apply. Your consent to receive SMS messages is not a condition of purchasing any service. You may opt out at any time by replying "STOP" to any message, and you may request additional assistance by replying "HELP." For more details, please visit our'
              )}{' '}
              <a href={`/${lang}/privacidad`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('política de privacidad', 'privacy policy')}</a>{' '}
              {t('y', 'and')}{' '}
              <a href={`/${lang}/sms-terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('términos de servicio SMS', 'SMS terms of service')}</a>.
            </p>
          </m.div>

          <m.div variants={itemVar} className="flex items-start gap-4 p-5 rounded-xl bg-[#000814]/50 border border-white/10 hover:border-white/20 transition-colors group">
            <div className="relative flex items-center pt-1">
              <input type="checkbox" id="acceptedTerms" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} className="peer h-7 w-7 sm:h-6 sm:w-6 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D] hover:border-slate-400" />
              <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100"><CheckCircle2 size={16} strokeWidth={3} /></div>
            </div>
            <label htmlFor="acceptedTerms" className="text-sm text-blue-100 leading-relaxed cursor-pointer select-none group-hover:text-white transition-colors">
              {t('Acepto los', 'I accept the')}{' '}
              <a href={`/${lang}/terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('Términos de Servicio', 'Terms of Service')}</a>{' '}
              {t('y he leído la', 'and have read the')}{' '}
              <a href={`/${lang}/privacidad`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('Política de Privacidad', 'Privacy Statement')}</a>.
            </label>
          </m.div>

          <m.div variants={itemVar} className="flex items-start gap-4 p-4 rounded-xl bg-[#000814]/30 border border-white/5 hover:border-white/10 transition-colors group">
            <div className="relative flex items-center pt-1">
              <input type="checkbox" id="marketingConsent" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="peer h-6 w-6 sm:h-5 sm:w-5 cursor-pointer appearance-none rounded border-2 border-slate-600 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D] hover:border-slate-500" />
              <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100"><CheckCircle2 size={14} strokeWidth={3} /></div>
            </div>
            <label htmlFor="marketingConsent" className="text-xs text-blue-200/80 leading-relaxed cursor-pointer select-none group-hover:text-blue-100 transition-colors">
              {t('Me gustaría recibir comunicaciones SMS del Law Office of Manuel Solís al número de teléfono proporcionado relacionadas con consultas sobre servicios de inmigración, programación de consultas, recordatorios de citas, solicitud de documentos y actualizaciones de casos. Pueden aplicar tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. Responda STOP para cancelar, HELP para ayuda.', 'I would like to receive SMS communications from the Law Office of Manuel Solís at the phone number provided regarding immigration service inquiries, scheduling consultations, appointment reminders, document requests, and case updates. Message and data rates may apply. Message frequency may vary. Reply STOP to cancel, HELP for help.')}{' '}
              <a href={`/${lang}/sms-terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('Términos de Servicio SMS', 'SMS Terms of Service')}</a>
            </label>
          </m.div>
        </div>

        <m.div variants={itemVar} className="pt-2">
          {fieldMessage && (
            <p role="alert" className="mb-4 text-sm font-medium text-red-300">
              {t(fieldMessage.es, fieldMessage.en)}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !formData.acceptedTerms}
            className={`group relative w-full h-14 sm:h-16 overflow-hidden rounded-xl font-bold tracking-wider sm:tracking-widest uppercase text-sm sm:text-base transition-all shadow-lg
              ${!formData.acceptedTerms
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                : 'bg-[#B2904D] text-[#001026] hover:bg-[#cbb06d] cursor-pointer transform hover:-translate-y-1'
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Zap className="animate-spin text-[#001026]" size={20} /> {t('Procesando...', 'Processing...')}
                </span>
              ) : (
                <>
                  <ShieldCheck size={22} className={!formData.acceptedTerms ? "text-slate-500" : "text-[#001026]"} />
                  {t('Solicitar Consulta', 'Request Consultation')}
                </>
              )}
            </span>
            {!isSubmitting && formData.acceptedTerms && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out" />
            )}
          </button>
        </m.div>

        {/* Honeypot. Va al final y en posición absoluta para no entrar en el
            ritmo de space-y-8 del formulario. aria-hidden + tabIndex -1: no es
            un campo real, así que nadie con teclado o lector de pantalla llega
            a él; los bots que rellenan todo input sí. */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor={HONEYPOT_FIELD}>{t('No rellene este campo', 'Do not fill in this field')}</label>
          <input
            id={HONEYPOT_FIELD}
            type="text"
            name={HONEYPOT_FIELD}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>
    </m.div>
  )
}
