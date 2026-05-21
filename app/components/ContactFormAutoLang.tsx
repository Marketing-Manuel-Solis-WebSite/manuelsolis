'use client';

import { useLanguage } from '../context/LanguageContext';
import ContactFormShell from './ContactFormShell';

/**
 * Client fallback for <ContactForm /> when rendered WITHOUT a `lang` prop (the
 * ~65 other pages that render it inside client components and rely on context).
 * Resolves the language from context, then renders the shared shell. The Home
 * passes `lang` explicitly and bypasses this (fully server-rendered).
 */
export default function ContactFormAutoLang() {
  const { language } = useLanguage();
  return <ContactFormShell lang={language} />;
}
