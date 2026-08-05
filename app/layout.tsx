import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Outfit es fuente variable: un solo woff2 cubre el eje wght completo
// (antes: 5 archivos estáticos = 5 preloads en el critical path).
const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-outfit",
  display: "swap",
});

// Root metadata — serves as fallback for pages outside [lang] (e.g., 404).
// Pages under [lang]/ override this via their own layout generateMetadata.
export const metadata: Metadata = {
  title: 'Manuel Solís — Abogados de Inmigración',
  description: 'Abogados de inmigración con 35+ años de experiencia. Oficinas en Houston, Dallas, Chicago, Los Angeles y más.',
  robots: { index: false },
};

// ───────────────────────────────────────────────────────────────────────────
// POR QUÉ <html lang> ES ESTÁTICO ("es") Y NO EL LOCALE REAL DE LA RUTA
//
// Síntoma medido (auditoría de los 295 prerenders, 2026-08-04): las 146 rutas
// /en/* se sirven con <html lang="es">. El script inline de abajo y
// <LangSetter> lo corrigen en el cliente, pero el HTML que parsea un crawler o
// un lector de pantalla declara el idioma equivocado (WCAG 3.1.1).
//
// Lo que lo causa:
//   1. Solo un root layout puede renderizar <html>, y este archivo está POR
//      ENCIMA del segmento [lang]: no recibe params, así que no conoce el
//      locale.
//   2. Leerlo con headers() (proxy.ts ya manda x-locale, hoy sin consumidor)
//      volvería dinámico el árbol entero y perdería el prerender estático, que
//      es el principal activo de rendimiento del sitio.
//   3. next/root-params NO sirve mientras este archivo exista: getRootParams()
//      (next/dist/server/app-render/create-component-tree.js) deja de recorrer
//      el árbol en el PRIMER layout que encuentra, y ese es este, así que
//      `lang` nunca llega a ser root param. Además va detrás de
//      experimental.rootParams y se publica sin tipos (`declare module`).
//
// La única salida real son DOS root layouts vía grupos de rutas: borrar este
// archivo, que app/[lang]/layout.tsx pase a ser root layout y renderice
// <html lang={lang}>, y mover app/page.tsx (el redirect) a app/(root)/ con su
// propio root layout mínimo.
//
// NO SE HIZO porque rompe la 404 global, y esto se verificó leyendo Next
// 16.1.6, no por intuición: sin app/layout.tsx la ruta /_not-found se compone
// con el layout interno next/dist/client/components/builtin/layout.js, que es
// un <html><body> pelado (ver next-app-loader/index.js, rama
// `isDefaultNotFound && !layoutPath`). Consecuencias sobre app/not-found.tsx:
//   · globals.css se importa SOLO aquí -> la 404 se queda sin Tailwind ni
//     .text-gradient-gold, es decir sin diseño;
//   · sin la clase de la fuente en <html>, --font-outfit no existe y
//     globals.css cae al font-family de sistema;
//   · ese <html> interno no lleva NINGÚN lang, peor que el lang="es" de hoy;
//   · se pierde el `metadata` de arriba y con él el robots noindex y el title
//     de la 404 (no se puede reponer desde not-found.tsx: es 'use client').
// Y el bundler por defecto de Next 16 es Turbopack, cuyo armado de /_not-found
// es código nativo no auditable desde el repo; Next documenta ahí un bug
// propio ("bugs in Turbopack that cause the _not-found LoaderTree to not have
// any layouts", create-component-tree.js), así que tampoco se puede afirmar
// que el comportamiento coincida con el del loader de webpack que sí se leyó.
//
// PARA DESBLOQUEARLO, en este orden:
//   a) next.config.ts -> experimental.globalNotFound = true (hoy default
//      false en 16.1.6);
//   b) app/global-not-found.tsx con su propio <html lang> + <body>, el import
//      de globals.css, la fuente y el diseño actual de la 404. El archivo
//      app/not-found.tsx se queda como boundary de los notFound() de
//      [lang]/abogados, /colaboradores, /newsletter y /servicios/accidentes;
//   c) recién entonces el split en grupos de rutas;
//   d) verificar en el build: mismo recuento de rutas ○/● que hoy, un solo
//      <TrackingSurfaces/> por página, <noscript> del píxel server-rendered y
//      /_not-found devolviendo 404 con su CSS.
// Mientras (a) siga siendo experimental, el lang correcto no compensa el
// riesgo: Google detecta el idioma por el contenido, no por este atributo.
// ───────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // El script inline corrige <html lang> a "en" en /en ANTES del primer paint
  // (LangSetter en [lang]/layout.tsx cubre las navegaciones de cliente).
  // Content-Language (proxy.ts) + hreflang por página siguen siendo las
  // señales de idioma primarias para SEO. Ver el bloque de arriba.
  return (
    <html lang="es" className={outfit.variable}>
      <body className={outfit.className}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0)document.documentElement.lang='en';",
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#B2904D] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
        >
          Saltar al contenido / Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}