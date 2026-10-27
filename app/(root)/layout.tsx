import type { Metadata } from 'next';
import { outfit } from '../lib/fonts';

// Root layout de "/" a secas, que solo redirige a /es (proxy.ts ya lo resuelve
// antes por cookie / Accept-Language; page.tsx es el respaldo). Existe porque
// no hay app/layout.tsx: cada locale tiene su propio root layout en
// app/[lang]/layout.tsx para que <html lang> salga correcto del servidor, y una
// página fuera de [lang] necesita el suyo.
export const metadata: Metadata = {
  title: 'Manuel Solís — Abogados de Inmigración',
  description: 'Abogados de inmigración con 35+ años de experiencia. Oficinas en Houston, Dallas, Chicago, Los Angeles y más.',
  robots: { index: false },
};

export default function RootRedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={outfit.variable} data-scroll-behavior="smooth">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
