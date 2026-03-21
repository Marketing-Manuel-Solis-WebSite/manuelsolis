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
        {children}
      </body>
    </html>
  );
}