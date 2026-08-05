'use client'

import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { fetchWithTimeout } from '../lib/fetchTimeout';
import { useLanguage } from '../context/LanguageContext';
import { useDialog } from './useDialog';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Cuando el asistente no puede responder, la salida útil es una vía de contacto
// real, no un "error de conexión": quien escribe aquí tiene una duda legal y el
// despacho pierde la consulta si el chat solo se disculpa. El teléfono es el de
// la oficina principal (officesPhoneMap: houston-principal) y el WhatsApp el
// mismo del botón flotante.
const FALLBACK_MESSAGE = {
  es: 'Ahora mismo no puedo responder por aquí, pero no se quede sin respuesta: llámenos al (713) 701-1731 o escríbanos por WhatsApp al (713) 876-3560 y un miembro del equipo le atiende. También puede dejar sus datos en el formulario de consulta y le contactamos nosotros.',
  en: 'I cannot reply here right now, but do not stay without an answer: call us at (713) 701-1731 or message us on WhatsApp at (713) 876-3560 and a team member will help you. You can also leave your details in the consultation form and we will contact you.',
} as const;

export default function AIChatButton() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useDialog(isOpen, () => setIsOpen(false));

  const t = {
    es: {
      title: 'Asistente Manuel Solís',
      subtitle: 'IA Legal Inteligente',
      placeholder: 'Escribe tu consulta aquí...',
      welcome: 'Bienvenido. Soy la IA oficial del despacho Manuel Solís. ¿En qué situación legal puedo orientarte hoy?',
      close: 'Cerrar asistente legal',
      send: 'Enviar mensaje',
      thinking: 'El asistente está escribiendo una respuesta',
      examples: [
        'Información sobre Inmigración',
        'Tuve un accidente de auto',
        '¿Cómo pido una consulta?'
      ]
    },
    en: {
      title: 'Manuel Solis Assistant',
      subtitle: 'Smart Legal AI',
      placeholder: 'Type your inquiry here...',
      welcome: 'Welcome. I am the official AI for the Manuel Solís Law Firm. How can I guide you with your legal situation today?',
      close: 'Close legal assistant',
      send: 'Send message',
      thinking: 'The assistant is typing a reply',
      examples: [
        'Information about Immigration',
        'I had a car accident',
        'How to request a consultation?'
      ]
    }
  };

  const texts = language === 'es' ? t.es : t.en;

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

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // El modelo puede tardar, pero sin tope un fallo de red deja el indicador
      // de "escribiendo" girando indefinidamente.
      const response = await fetchWithTimeout(
        '/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messages
          })
        },
        30000
      );

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: FALLBACK_MESSAGE[language === 'es' ? 'es' : 'en'] }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: FALLBACK_MESSAGE[language === 'es' ? 'es' : 'en'] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- BOTÓN FLOTANTE "AI" --- */}
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[5.5rem] sm:bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center group outline-none"
        // El nombre accesible empieza por "AI", el texto visible del botón:
        // WCAG 2.5.3 (Label in Name) lo exige para que el control por voz
        // funcione. Lighthouse lo marcaba como label-content-name-mismatch.
        aria-label={isOpen ? texts.close : (language === 'es' ? 'AI — Abrir asistente legal' : 'AI — Open legal assistant')}
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
            className="fixed bottom-[10.5rem] sm:bottom-28 right-3 sm:right-6 z-50 w-[94vw] sm:w-[90vw] md:w-[400px] h-[55vh] sm:h-[600px] max-h-[70vh] flex flex-col overflow-hidden rounded-[30px] border border-white/10 shadow-2xl"
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
            <div
              role="log"
              aria-live="polite"
              aria-atomic="false"
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
                    {msg.content}
                  </div>
                </m.div>
              ))}

              {/* Botones de sugerencia */}
              {messages.length === 1 && (
                <div className="space-y-3 mt-4">
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] pl-1">
                    {language === 'es' ? 'Opciones:' : 'Options:'}
                  </p>
                  {texts.examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(example)}
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

              {/* Indicador de carga */}
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

            {/* Input Area */}
            <div className="p-4 bg-black/20 border-t border-white/10 backdrop-blur-md"> {/* Blur reducido de xl a md */}
              <div className="relative flex items-center group">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  aria-label={texts.placeholder}
                  // El servidor rechaza mensajes de más de 1000 caracteres
                  // (app/api/chat/route.ts): cortar aquí evita el 400.
                  maxLength={1000}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage();
                  }}
                  placeholder={texts.placeholder}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all text-sm shadow-inner"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  aria-label={texts.send}
                  className="absolute right-2 p-2.5 bg-gradient-to-br from-[#D4AF37] to-[#997B2F] rounded-xl text-[#002342] shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all active:scale-95"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="text-center mt-3">
                <p className="text-[10px] text-white/40 font-medium tracking-wide">
                  Manuel Solis Law Firm AI © {new Date().getFullYear()}
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