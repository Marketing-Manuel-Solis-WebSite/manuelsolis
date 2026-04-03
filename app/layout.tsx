import { Outfit } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// Metadata and LanguageProvider are in app/[lang]/layout.tsx
// Root layout reads x-locale header (set by middleware) to render correct <html lang>.

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get("x-locale") || "es";

  return (
    <html lang={lang} className={outfit.variable}>
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