import type { Metadata } from 'next';
import './globals.css';
import { outfit } from './lib/fonts';
import SkipLink from './components/SkipLink';
import NotFoundView from './components/NotFoundView';

// 404 de las URLs que no coinciden con ninguna ruta (p. ej. /es/no-existe).
// Requiere experimental.globalNotFound en next.config.ts: desde que no hay
// app/layout.tsx (cada locale tiene su propio root layout, ver
// app/[lang]/layout.tsx), sin este archivo Next compondría /_not-found con su
// layout interno, un <html><body> pelado sin CSS, sin fuente y sin lang.
//
// Esta página se salta todos los layouts, así que importa aquí globals.css y la
// fuente. Los notFound() lanzados DENTRO de una página de [lang] no pasan por
// aquí: los pinta app/[lang]/not-found.tsx con el root layout del locale.
export const metadata: Metadata = {
  title: 'Manuel Solís — Abogados de Inmigración',
  description: 'Abogados de inmigración con 35+ años de experiencia. Oficinas en Houston, Dallas, Chicago, Los Angeles y más.',
  robots: { index: false },
};

export default function GlobalNotFound() {
  // Se prerenderiza una sola vez para todas las URLs, así que el servidor no
  // conoce el locale: sale con el idioma por defecto y el script inline lo
  // corrige a "en" en /en/... antes del primer paint.
  return (
    <html lang="es" className={outfit.variable} data-scroll-behavior="smooth">
      <body className={outfit.className}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0)document.documentElement.lang='en';",
          }}
        />
        <SkipLink />
        <NotFoundView />
      </body>
    </html>
  );
}
