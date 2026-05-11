import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Root metadata — serves as fallback for pages outside [lang] (e.g., 404).
// Pages under [lang]/ override this via their own layout generateMetadata.
export const metadata: Metadata = {
  title: 'Manuel Solís — Abogados de Inmigración',
  description: 'Abogados de inmigración con 35+ años de experiencia. Oficinas en Houston, Dallas, Chicago, Los Angeles y más.',
  robots: { index: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get("x-locale") || "es";

  return (
    <html lang={lang} className={`${outfit.variable} ${playfair.variable} bg-[#001540]`}>
      <body className={outfit.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#C4A265] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
        >
          Saltar al contenido / Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
