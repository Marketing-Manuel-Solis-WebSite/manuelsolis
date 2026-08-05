'use client'

import { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone } from 'lucide-react';
import { fetchWithTimeout } from '../lib/fetchTimeout';
import {
  formatAssistantMessage,
  wasInterrupted,
  STREAM_ERROR_MARKER,
  type ChatBlock,
  type InlineSegment,
} from '../lib/chatFormat';
import {
  DEFAULT_PHONE,
  DEFAULT_PHONE_LINK,
  OFFICES_NAP,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from './officesPhoneMap';
import { useLanguage } from '../context/LanguageContext';
import { useDialog } from './useDialog';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Teléfono de la sede, leído del registro NAP en vez de escrito a mano: es el
// mismo dato que sale en la ficha de Houston y en el schema LocalBusiness, y si
// cambia allí tiene que cambiar aquí.
const HQ_PHONE = OFFICES_NAP['houston-principal'].phone;

// Cuando el asistente no puede responder, la salida útil es una vía de contacto
// real, no un "error de conexión": quien escribe aquí tiene una duda legal y el
// despacho pierde la consulta si el chat solo se disculpa.
const FALLBACK_MESSAGE = {
  es: `Ahora mismo no puedo responder por aquí, pero no se quede sin respuesta: llámenos al ${HQ_PHONE} o escríbanos por WhatsApp al ${WHATSAPP_DISPLAY} y un miembro del equipo le atiende. También puede dejar sus datos en el formulario de consulta y le contactamos nosotros.`,
  en: `I cannot reply here right now, but do not stay without an answer: call us at ${HQ_PHONE} or message us on WhatsApp at ${WHATSAPP_DISPLAY} and a team member will help you. You can also leave your details in the consultation form and we will contact you.`,
} as const;

// Mensajes por código de estado. Se resuelven en el cliente y no con el texto
// que manda el servidor (que va en español): un visitante en /en debe leer el
// aviso en inglés.
const STATUS_MESSAGE: Record<number, { es: string; en: string }> = {
  429: {
    es: `Ha enviado varios mensajes muy seguidos. Espere unos segundos y vuelva a intentarlo; si es urgente, llámenos al ${HQ_PHONE}.`,
    en: `You have sent several messages in a row. Wait a few seconds and try again; if it is urgent, call us at ${HQ_PHONE}.`,
  },
  400: {
    es: 'Ese mensaje es demasiado largo para procesarlo. ¿Puede resumirlo en unas pocas frases?',
    en: 'That message is too long to process. Could you sum it up in a few sentences?',
  },
  413: {
    es: 'La conversación se ha hecho muy larga. Cierre y vuelva a abrir el asistente para empezar de nuevo.',
    en: 'This conversation has grown too long. Close and reopen the assistant to start over.',
  },
};

// Sin actividad durante este tiempo se corta la lectura. `fetchWithTimeout`
// limpia su temporizador en cuanto llegan las cabeceras, así que su tope de 30 s
// cubre el arranque de la respuesta pero no el cuerpo: sin esta segunda guarda,
// un stream que se quedara a medias dejaría el cursor parpadeando para siempre.
const STREAM_IDLE_TIMEOUT_MS = 20_000;

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Lee del stream con tope de inactividad; `null` cuando el stream termina. */
async function readChunk(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Promise<Uint8Array | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const idle = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('stream idle')), STREAM_IDLE_TIMEOUT_MS);
  });
  try {
    const result = await Promise.race([reader.read(), idle]);
    return result.done ? null : result.value ?? null;
  } finally {
    clearTimeout(timer);
  }
}

const PHONE_LINK_CLASS =
  'font-semibold text-[#F1D57A] underline decoration-[#D4AF37]/50 underline-offset-2 hover:decoration-[#D4AF37]';

/** Segmentos de una línea: texto, negrita y teléfonos marcables. */
function Inline({ segments }: { segments: InlineSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'phone') {
          return (
            <a key={i} href={seg.href} className={PHONE_LINK_CLASS}>
              {seg.text}
            </a>
          );
        }
        if (seg.kind === 'strong') {
          return (
            <strong key={i} className="font-semibold text-white">
              {seg.text}
            </strong>
          );
        }
        return <Fragment key={i}>{seg.text}</Fragment>;
      })}
    </>
  );
}

/** Renderiza los bloques del formateador: párrafos y listas. */
function AssistantContent({ blocks }: { blocks: ChatBlock[] }) {
  return (
    <>
      {blocks.map((block, blockIdx) =>
        block.kind === 'paragraph' ? (
          <p key={blockIdx} className={blockIdx > 0 ? 'mt-3' : undefined}>
            <Inline segments={block.segments} />
          </p>
        ) : (
          <ul key={blockIdx} className={`space-y-1.5 ${blockIdx > 0 ? 'mt-3' : ''}`}>
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]"
                />
                <span>
                  <Inline segments={item} />
                </span>
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

export default function AIChatButton() {
  const { language } = useLanguage();
  const lang: 'es' | 'en' = language === 'es' ? 'es' : 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // `loading` cubre la espera hasta el primer token; `streaming` indica que la
  // respuesta ya está llegando. Se distinguen para no mostrar a la vez los
  // puntos de "escribiendo" y el texto que ya se está escribiendo.
  const [streaming, setStreaming] = useState(false);
  // Texto anunciado a lectores de pantalla, una sola vez y ya completo.
  const [announcement, setAnnouncement] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useDialog(isOpen, () => setIsOpen(false));

  const t = {
    es: {
      title: 'Asistente Manuel Solís',
      subtitle: 'IA Legal Inteligente',
      placeholder: 'Escribe tu consulta aquí...',
      welcome: 'Bienvenido. Soy la asistente virtual del despacho Manuel Solís. Cuénteme qué situación legal tiene y le orientaré sobre cómo podemos ayudarle.',
      close: 'Cerrar asistente legal',
      send: 'Enviar mensaje',
      thinking: 'El asistente está escribiendo una respuesta',
      options: 'Opciones:',
      call: 'Llamar',
      whatsapp: 'WhatsApp',
      hint: 'Enter envía · Shift+Enter salto de línea',
      disclaimer: 'Orientación general. No sustituye una consulta con un abogado.',
      examples: [
        'Información sobre Inmigración',
        'Tuve un accidente de auto',
        '¿Cómo pido una consulta?',
      ],
    },
    en: {
      title: 'Manuel Solis Assistant',
      subtitle: 'Smart Legal AI',
      placeholder: 'Type your inquiry here...',
      welcome: 'Welcome. I am the virtual assistant for the Manuel Solís Law Firm. Tell me about your legal situation and I will explain how we can help.',
      close: 'Close legal assistant',
      send: 'Send message',
      thinking: 'The assistant is typing a reply',
      options: 'Options:',
      call: 'Call',
      whatsapp: 'WhatsApp',
      hint: 'Enter to send · Shift+Enter for a new line',
      disclaimer: 'General guidance. Not a substitute for a consultation with an attorney.',
      examples: [
        'Information about Immigration',
        'I had a car accident',
        'How to request a consultation?',
      ],
    },
  };

  const texts = lang === 'es' ? t.es : t.en;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: texts.welcome }]);
    }
  }, [isOpen, texts.welcome, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /** Reemplaza el contenido del último mensaje (el del asistente en curso). */
  const replaceLast = useCallback((content: string) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      next.push({ role: 'assistant', content });
      return next;
    });
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const userMessage = raw.trim();
      if (!userMessage || loading || streaming) return;

      setInput('');
      setAnnouncement('');
      // El historial que va al servidor es el de ANTES de este mensaje: el
      // endpoint reconstruye los roles contando hacia atrás desde el final y
      // espera que el último turno sea del asistente.
      const history = messages;
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setLoading(true);

      const fallback = FALLBACK_MESSAGE[lang];

      try {
        const response = await fetchWithTimeout(
          '/api/chat',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: userMessage,
              conversationHistory: history,
              // El idioma lo fija el sitio, no la detección del modelo.
              language: lang,
            }),
          },
          30000,
        );

        if (!response.ok || !response.body) {
          const mapped = STATUS_MESSAGE[response.status];
          const text = mapped ? mapped[lang] : fallback;
          setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
          setAnnouncement(text);
          return;
        }

        // Hueco vacío que se va rellenando conforme llegan los fragmentos.
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
        setLoading(false);
        setStreaming(true);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        try {
          while (true) {
            const chunk = await readChunk(reader);
            if (chunk === null) break;
            accumulated += decoder.decode(chunk, { stream: true });
            replaceLast(accumulated);
          }
          accumulated += decoder.decode();
        } catch {
          // Corte o inactividad a mitad de la respuesta: se conserva lo que ya
          // llegó (suele ser útil) y se añade la vía de contacto.
          await reader.cancel().catch(() => {});
          const partial = accumulated.trim();
          const text = partial ? `${partial}\n\n${fallback}` : fallback;
          replaceLast(text);
          setAnnouncement(text);
          return;
        }

        // El servidor no puede cambiar el código de estado una vez abierto el
        // stream, así que avisa de un fallo tardío con el marcador.
        const interrupted = wasInterrupted(accumulated);
        const clean = accumulated.split(STREAM_ERROR_MARKER).join('').trim();
        const finalText = interrupted
          ? clean
            ? `${clean}\n\n${fallback}`
            : fallback
          : clean || fallback;

        replaceLast(finalText);
        setAnnouncement(finalText);
      } catch {
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
        setAnnouncement(fallback);
      } finally {
        setLoading(false);
        setStreaming(false);
      }
    },
    [lang, loading, streaming, messages, replaceLast],
  );

  const busy = loading || streaming;

  return (
    <>
      {/* --- BOTÓN FLOTANTE "AI" --- */}
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[5.5rem] sm:bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center group outline-none"
        // El nombre accesible empieza por "AI", el texto visible del botón:
        // WCAG 2.5.3 (Label in Name) lo exige para que el control por voz
        // funcione. Lighthouse lo marcaba como label-content-name-mismatch.
        aria-label={isOpen ? texts.close : (lang === 'es' ? 'AI — Abrir asistente legal' : 'AI — Open legal assistant')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #F9E79F 0%, #D4AF37 40%, #997B2F 100%)',
          boxShadow: `
            0 10px 25px -5px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.5)
          `, // Sombra simplificada
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
        whileHover={{
          scale: 1.05, // Escala reducida
          boxShadow: `
            0 15px 30px -5px rgba(0, 0, 0, 0.5),
            inset 0 4px 6px rgba(255, 255, 255, 0.6)
          `
        }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <m.div
              key="ai-text"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-serif font-black text-2xl text-[#002342] tracking-tighter drop-shadow-sm">
                AI
              </span>
            </m.div>
          ) : (
            <m.div
              key="close-icon"
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={32} className="text-[#002342] drop-shadow-sm" strokeWidth={2.5} />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>

      {/* --- VENTANA DE CHAT --- */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={texts.title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.95 }} // Eliminado filter: blur en animación inicial
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-[10.5rem] sm:bottom-28 right-3 sm:right-6 z-50 w-[94vw] sm:w-[90vw] md:w-[400px] h-[60vh] sm:h-[600px] max-h-[75vh] flex flex-col overflow-hidden rounded-[30px] border border-white/10 shadow-2xl"
            style={{
              // OPTIMIZACIÓN CRÍTICA:
              // 1. Aumentamos opacidad del fondo (0.92)
              // 2. Reducimos el blur (12px en lugar de 25px)
              // Esto reduce drásticamente el costo de renderizado
              background: 'rgba(5, 15, 30, 0.92)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
            }}
          >

            {/* Header */}
            <div className="relative pl-8 pr-16 py-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
              <div>
                <h3 className="text-white font-serif font-bold text-xl tracking-wide text-shadow-sm mb-1">
                  {texts.title}
                </h3>
                <p className="text-[#D4AF37] text-xs font-medium tracking-widest uppercase opacity-90">
                  {texts.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={texts.close}
                className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Chat Body */}
            {/*
              `role="log"` sin aria-live: con la respuesta llegando token a token,
              una región live volvería a leer el mensaje entero en cada fragmento
              y el lector de pantalla resultaría inservible. El anuncio se hace
              una sola vez, ya completo, en la región de más abajo.
            */}
            <div
              role="log"
              aria-label={texts.title}
              className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-custom"
            >
              {messages.map((msg, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }} // Animación simplificada (sin scale)
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#F9E79F] to-[#D4AF37] text-[#002342] font-semibold rounded-br-sm'
                      : 'bg-white/10 text-gray-100 border border-white/5 rounded-bl-sm' // Eliminado backdrop-blur en mensajes individuales
                    }
                  `}>
                    {msg.role === 'assistant' ? (
                      <>
                        <AssistantContent blocks={formatAssistantMessage(msg.content)} />
                        {/* Cursor mientras el último mensaje se está escribiendo. */}
                        {streaming && idx === messages.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-[#D4AF37]"
                          />
                        )}
                      </>
                    ) : (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    )}
                  </div>
                </m.div>
              ))}

              {/* Botones de sugerencia */}
              {messages.length === 1 && !busy && (
                <div className="space-y-3 mt-4">
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] pl-1">
                    {texts.options}
                  </p>
                  {texts.examples.map((example, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => send(example)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/40 text-gray-300 text-xs transition-all duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                         <MessageCircle size={12} className="text-[#D4AF37] group-hover:text-[#002342]" />
                      </div>
                      {example}
                    </button>
                  ))}
                </div>
              )}

              {/* Indicador de espera: solo hasta que empieza a llegar el texto. */}
              {loading && (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    <span className="sr-only">{texts.thinking}</span>
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </m.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/*
              Anuncio para lectores de pantalla: recibe la respuesta ya terminada,
              una única vez, en lugar de re-anunciarla en cada token.
            */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {announcement}
            </div>

            {/*
              Vía de contacto siempre a mano. Quien abre el chat con una urgencia
              (una detención, un accidente) no debería tener que leerse una
              respuesta para encontrar el teléfono.
            */}
            <div className="flex gap-2 px-4 pt-3">
              <a
                href={DEFAULT_PHONE_LINK}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 py-2.5 text-xs font-semibold text-[#F1D57A] transition-colors hover:bg-[#D4AF37]/20"
              >
                <Phone size={13} strokeWidth={2.5} />
                {texts.call} {DEFAULT_PHONE}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10"
              >
                {texts.whatsapp}
              </a>
            </div>

            {/* Input Area */}
            <div className="p-4 pt-3">
              <div className="relative flex items-end group">
                {/*
                  Textarea en lugar de input: el tope es de 1000 caracteres y en
                  un campo de una línea el visitante no ve lo que ha escrito.
                  Enter envía; Shift+Enter hace salto de línea.
                */}
                <textarea
                  ref={inputRef}
                  value={input}
                  aria-label={texts.placeholder}
                  rows={1}
                  // El servidor rechaza mensajes de más de 1000 caracteres
                  // (app/api/chat/route.ts): cortar aquí evita el 400.
                  maxLength={1000}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={texts.placeholder}
                  className="w-full resize-none bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all text-sm shadow-inner max-h-28 scrollbar-custom"
                  disabled={busy}
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={!input.trim() || busy}
                  aria-label={texts.send}
                  className="absolute right-2 bottom-2 p-2.5 bg-gradient-to-br from-[#D4AF37] to-[#997B2F] rounded-xl text-[#002342] shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all active:scale-95"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <p className="text-[10px] text-white/35 font-medium tracking-wide">
                  {input.length > 850
                    ? `${input.length} / 1000`
                    : texts.hint}
                </p>
                <p className="text-[10px] text-white/30 text-right">
                  {texts.disclaimer}
                </p>
              </div>
            </div>

          </m.div>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </>
  );
}
