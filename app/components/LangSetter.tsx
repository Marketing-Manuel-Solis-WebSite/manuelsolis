'use client';

import { useEffect } from 'react';

/**
 * Keeps <html lang> in sync on the client.
 *
 * Desde que app/[lang]/layout.tsx es el root layout, el HTML del servidor ya
 * trae el lang correcto y esto no hace nada en una carga normal. Se queda como
 * red de seguridad por si alguna navegación de cliente entre /es y /en
 * conservara el <html> anterior en lugar de recargar la página.
 */
export function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
