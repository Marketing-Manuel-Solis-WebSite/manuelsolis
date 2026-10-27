import { Outfit } from 'next/font/google';

// Outfit es fuente variable: un solo woff2 cubre el eje wght completo
// (antes: 5 archivos estáticos = 5 preloads en el critical path).
//
// Vive en su propio módulo porque hay más de un root layout
// (app/[lang]/layout.tsx, app/(root)/layout.tsx) más app/global-not-found.tsx,
// y los tres deben pintar <html> con la misma fuente.
export const outfit = Outfit({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-outfit',
  display: 'swap',
});
