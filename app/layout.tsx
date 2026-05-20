import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Static lang="es" (default locale). The root layout intentionally avoids
  // headers() so the whole app stays statically renderable / ISR instead of
  // being forced dynamic. The existing LangSetter (rendered in
  // app/[lang]/layout.tsx) corrects <html lang> to "en" on /en routes after
  // hydration; Content-Language (proxy.ts) + per-page hreflang remain the
  // primary SEO language signals.
  return (
    <html lang="es" className={outfit.variable}>
      <body className={outfit.className}>
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