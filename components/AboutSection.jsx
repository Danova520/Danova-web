"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { translations } from "@/lib/translations";

const danovaOrg = { "@type": "Organization", name: "DANOVA", url: "https://danovacreators.com" };

// Contenido en español fijo, igual que el resto de JSON-LD del sitio.
const dennisJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dennis Alemán",
  jobTitle: translations["founder.role"].es,
  worksFor: danovaOrg,
};
const abelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abel David Núñez",
  jobTitle: translations["founder.role"].es,
  worksFor: danovaOrg,
};

export function AboutSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="nosotros">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dennisJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(abelJsonLd) }}
      />
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("nosotros.eyebrow")}</div>
          <h2>Dennis Alemán &amp; Abel David Núñez — DANOVA</h2>
          <p>{t("nosotros.intro")}</p>
        </div>
        <div className={`about-grid ${grid.className}`} data-reveal ref={grid.ref}>
          <div className="about-content">
            <div className="founders">
              <div className="founder-card">
                <div className="fname">Dennis Alemán</div>
                <span className="frole">{t("founder.role")}</span>
                <p>{t("founder1.desc")}</p>
              </div>
              <div className="founder-card">
                <div className="fname">Abel David Núñez</div>
                <span className="frole">{t("founder.role")}</span>
                <p>{t("founder2.desc")}</p>
              </div>
            </div>
            <div className="philosophy">
              <p>{t("philosophy")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
