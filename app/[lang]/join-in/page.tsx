// app/[lang]/join-in/page.tsx

'use client'

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence, Variants } from 'framer-motion'; 
import { User, Phone, Mail, MessageSquare, CheckCircle2, ShieldCheck, Zap, XCircle, Clock, MapPin, PhoneCall } from 'lucide-react';
import { Outfit } from 'next/font/google';

// --- CONFIGURACIÓN DE FUENTE Y COLORES ---
const font = Outfit({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });
const ACCENT_GOLD = '#B2904D';
const API_URL = '/api/signup-proxy'; 

// --- VARIANTS ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- SUBCOMPONENTE: INPUT CON EFECTOS DE FOCO ---
const NeonInput = ({ icon: Icon, name, type = "text", placeholder, value, onChange, required = false, isTextArea = false, autoFocus = false }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <motion.div 
                animate={isFocused ? { color: ACCENT_GOLD, scale: 1.1 } : { color: '#64748b', scale: 1 }}
                className="absolute left-4 top-4 z-20 transition-all duration-300 pointer-events-none"
            >
                <Icon size={20} />
            </motion.div>

            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    rows={5}
                    className={`w-full bg-[#000510]/50 border-2 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all resize-none z-10 relative
                      ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/80 shadow-[0_0_20px_rgba(178,144,77,0.1)]' : 'border-white/10 hover:border-white/20'}
                    `}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    autoFocus={autoFocus}
                    className={`w-full bg-[#000510]/50 border-2 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all z-10 relative
                      ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/80 shadow-[0_0_20px_rgba(178,144,77,0.1)]' : 'border-white/10 hover:border-white/20'}
                    `}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

// Componente del Contenido del Formulario (con lógica de estado)
function FormContent({ formData, isSubmitting, submitStatus, handleSubmit, handleChange, t }: any) {
    const lang = useLanguage().language as 'es' | 'en';
    return (
        <motion.div
            variants={containerVar}
            initial="hidden"
            animate="visible"
            className="relative z-10"
        >
            <AnimatePresence>
                {(submitStatus === 'success' || submitStatus === 'error') && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-[#001540]/95 flex flex-col items-center justify-center text-center rounded-[2rem] backdrop-blur-md"
                  >
                     {submitStatus === 'success' ? (
                       <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 size={80} className="text-green-400 mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('¡Enviado con Éxito!', 'Successfully Sent!')}</h3>
                          <p className="text-blue-200">{t('Nuestro equipo revisará su caso de inmediato.', 'Our team will review your case immediately.')}</p>
                        </motion.div>
                     ) : (
                       <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <XCircle size={80} className="text-red-400 mb-6 drop-shadow-[0_0_15px_rgba(252,165,165,0.5)]" />
                          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('Error de Envío', 'Submission Error')}</h3>
                          <p className="text-red-200">{t('Hubo un problema. Intente de nuevo o llame al (713) 701-1731.', 'There was an issue. Please try again or call (713) 701-1731.')}</p>
                        </motion.div>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div variants={itemVar}>
                        <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Identidad', 'Identity')}</label>
                        <div className="space-y-5">
                            <NeonInput icon={User} name="firstName" placeholder={t('Nombre', 'First Name')} value={formData.firstName} onChange={handleChange} required autoFocus />
                            <NeonInput icon={User} name="lastName" placeholder={t('Apellido', 'Last Name')} value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVar}>
                        <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Contacto', 'Contact')}</label>
                        <div className="space-y-5">
                            <NeonInput icon={Phone} name="phone" type="tel" placeholder={t('Teléfono', 'Phone Number')} value={formData.phone} onChange={handleChange} required />
                            <NeonInput icon={Mail} name="email" type="email" placeholder={t('Correo', 'Email Address')} value={formData.email} onChange={handleChange} required />
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVar}>
                    <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Detalles', 'Details')}</label>
                    <NeonInput 
                        icon={MessageSquare} 
                        name="message" 
                        isTextArea
                        placeholder={t('Describa brevemente su situación legal...', 'Briefly describe your legal situation...')} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    />
                </motion.div>

                <motion.div variants={itemVar} className="flex items-start gap-4 p-5 rounded-xl bg-[#000814]/50 border border-white/10 hover:border-white/20 transition-colors group">
                    <div className="relative flex items-center pt-1">
                        <input
                            type="checkbox"
                            id="consent"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D] hover:border-slate-400"
                        />
                        <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100">
                            <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                    </div>
                    <label htmlFor="consent" className="text-sm text-blue-100 leading-relaxed cursor-pointer select-none group-hover:text-white transition-colors">
                        {t('Acepto recibir mensajes de texto de marketing y otros mensajes del Law Office of Manuel Solis al número proporcionado. Pueden aplicarse tarifas de mensajes y datos. El consentimiento no es una condición para recibir servicios. Para más información, por favor revise nuestra', 'I agree to receive marketing text messages and other messages from the Law Office of Manuel Solis at the number provided. Message and data rates may apply. Consent is not a condition of receiving services. For more information, please review our')}{' '}
                        <a href={`/${lang}/privacidad`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('Política de Privacidad', 'Privacy Policy')}</a>.
                    </label>
                </motion.div>

                <motion.div variants={itemVar} className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.consent}
                        className={`
                            group relative w-full h-16 overflow-hidden rounded-xl font-bold tracking-widest uppercase text-base transition-all shadow-xl
                            ${!formData.consent 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                                : 'bg-[#B2904D] text-[#001026] hover:bg-[#cbb06d] shadow-[#B2904D]/20 hover:shadow-[#B2904D]/40 cursor-pointer transform hover:-translate-y-1'
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
                                    <ShieldCheck size={22} className={!formData.consent ? "text-slate-500" : "text-[#001026]"} />
                                    {t('Iniciar Análisis Gratuito', 'Start Free Analysis')}
                                </>
                            )}
                        </span>
                        
                        {!isSubmitting && formData.consent && (
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                        )}
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}

// Componente principal de la página
export default function JoinInPage() {
    const { language } = useLanguage();
    const lang = language as 'es' | 'en';
    
    // El estado del formulario se maneja aquí
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '', consent: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const t = (es: string, en: string) => (lang === 'es' ? es : en);

    // ÚNICA FUNCIÓN DE ENVÍO DE DATOS A LA API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus('idle'); 

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone.replace(/[^0-9]/g, ''), 
            acceptedTerms: formData.consent, 
            receiveUpdates: formData.consent, 
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData(prev => ({ 
                    ...prev, 
                    firstName: '', lastName: '', phone: '', email: '', message: '' 
                }));
            } else {
                console.error('API Proxy Error:', response.status);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Network or Proxy Fetch Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 4000); 
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return (
        <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
            <Header />

            <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
            </div>

            {/* --- SECCIÓN PRINCIPAL: TAMAÑO REDUCIDO --- */}
            <section className="relative pt-32 pb-20 z-10 px-6 lg:px-12">
                <div className="container mx-auto max-w-6xl"> {/* Max width reducido */}
                    <div className="grid lg:grid-cols-12 gap-10 items-center"> {/* Gap reducido */}
                        
                        {/* --- COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO --- */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 relative space-y-8"
                        >
                            <h1 className="text-4xl md:text-5xl font-thin text-white tracking-tight leading-tight"> {/* H1 reducido */}
                                {t('Únete a la Lucha', 'Join the Fight')} <br />
                                <span className="font-medium text-[#B2904D] drop-shadow-2xl">
                                    {t('Legal', 'Legal')}
                                </span>
                            </h1>

                            <p className="text-lg text-white/70 font-light leading-relaxed pl-4 border-l-2 border-white/10"> {/* Párrafo reducido */}
                                {t('Tu consulta es el primer paso hacia una solución. Contáctanos para una evaluación profesional de tu caso.', 'Your consultation is the first step toward a solution. Contact us for a professional evaluation of your case.')}
                            </p>

                            <div className="space-y-4 pt-2"> {/* Espacio reducido */}
                                <ContactInfoItem icon={PhoneCall} label={t('Línea de Consulta', 'Consultation Line')} value="1-866-979-5146" href="tel:+18669795146" />
                                <ContactInfoItem icon={Mail} label={t('Correo Electrónico', 'Email Address')} value="info@manuelsolis.com" href="mailto:info@manuelsolis.com" />
                                <ContactInfoItem icon={Clock} label={t('Horario de Oficina', 'Office Hours')} value={t('Lun - Vie: 9am - 7pm', 'Mon - Fri: 9am - 7pm')} />
                                <ContactInfoItem icon={MapPin} label={t('Sede Principal', 'Main Office')} value="6657 Navigation Blvd, Houston, TX" href={`/${lang}/oficinas`} />
                            </div>
                        </motion.div>

                        {/* --- COLUMNA DERECHA: FORMULARIO PRINCIPAL --- */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <div className="p-6 md:p-10 bg-[#001026]/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"> {/* Padding y rounded reducido */}
                                
                                <h2 className="text-2xl font-bold text-white mb-6"> {/* H2 reducido */}
                                    {t('Formulario de Consulta Prioritaria', 'Priority Consultation Form')}
                                </h2>

                                <FormContent 
                                    formData={formData} 
                                    isSubmitting={isSubmitting} 
                                    submitStatus={submitStatus} 
                                    handleSubmit={handleSubmit} 
                                    handleChange={handleChange} 
                                    t={t}
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Subcomponente reutilizable para la información de contacto lateral
function ContactInfoItem({ icon: Icon, label, value, href }: { icon: React.ElementType, label: string, value: string, href?: string }) {
    return (
        <a 
            href={href || '#'} 
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
        >
            <div className="w-8 h-8 rounded-full bg-[#B2904D]/20 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#B2904D]" />
            </div>
            <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{label}</p>
                <p className="text-md text-white font-medium group-hover:text-[#B2904D] transition-colors">{value}</p>
            </div>
        </a>
    );
}