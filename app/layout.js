import { fraunces, inter, ibmPlexMono } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { WA_DISPLAY, SOCIAL_LINKS } from "@/lib/constants";
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DANOVA",
  url: "https://danovacreators.com",
  description: "Agencia de marketing digital en Carballo, Galicia. Diseño web, SEO y redes sociales.",
  areaServed: "ES",
  email: "info@danovacreators.com",
  telephone: WA_DISPLAY,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Carballo",
    addressRegion: "A Coruña",
    addressCountry: "ES",
  },
  sameAs: Object.values(SOCIAL_LINKS),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DANOVA",
  url: "https://danovacreators.com",
  inLanguage: "es",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
