'use client';

import { useEffect } from 'react';

/**
 * Sets <html lang> dynamically on the client.
 * The root layout defaults to lang="es"; this component corrects it
 * for /en pages after hydration. Google also reads the Content-Language
 * header (set by proxy.ts) and hreflang alternates as primary signals.
 *
 * Es un workaround conocido, no la solución: el HTML servido de /en sigue
 * declarando lang="es". El diagnóstico completo (por qué el root layout no
 * puede saber el locale y qué hace falta para arreglarlo de verdad) está en
 * el comentario de cabecera de app/layout.tsx.
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
