import { fraunces, inter, ibmPlexMono } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "DANOVA — Agencia Digital en Carballo, Galicia",
  description:
    "DANOVA ayuda a negocios locales en Galicia a construir una presencia digital completa: web, redes sociales y contenido, pensados como un mismo sistema.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
