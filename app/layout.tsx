import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manuel Solis Law Firm | Abogados de Inmigración y Accidentes",
  description: "Law Offices of Manuel Solis — 35+ years defending immigrant rights. Immigration, accidents, criminal defense, family law & insurance across Texas, California, Illinois, Colorado & Tennessee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultLanguage = "en";

  return (
    <html lang={defaultLanguage} className={outfit.variable}>
      <body className={outfit.className}>
        <LanguageProvider initialLanguage={defaultLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}