'use client';

import { useEffect } from 'react';

/**
 * Sets <html lang> dynamically on the client.
 * The root layout defaults to lang="es"; this component corrects it
 * for /en pages after hydration. Google also reads the Content-Language
 * header (set by middleware) and hreflang alternates as primary signals.
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
