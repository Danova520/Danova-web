import { fraunces, inter, ibmPlexMono } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "DANOVA — Agencia de Marketing Digital en Carballo, Galicia",
  description:
    "DANOVA es una agencia de marketing digital en Carballo, Galicia. Diseño web, SEO y redes sociales para que tu negocio consiga más clientes.",
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
