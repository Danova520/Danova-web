"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

export function PortfolioSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const feature = useReveal();

  return (
    <section id="portfolio">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("portfolio.eyebrow")}</div>
          <h2>{t("portfolio.h2")}</h2>
          <p>{t("portfolio.p")}</p>
        </div>
        <div className={`portfolio-feature ${feature.className}`} data-reveal ref={feature.ref}>
          <div className="portfolio-media">
            <span className="ph-label">{t("portfolio.media")}</span>
          </div>
          <div className="portfolio-text">
            <span className="portfolio-badge">{t("portfolio.badge")}</span>
            <h3>Cafetería / Bar — Carballo</h3>
            <p>{t("portfolio.text")}</p>
          </div>
        </div>
        <div className="portfolio-note">
          <p>{t("portfolio.note")}</p>
        </div>
      </div>
    </section>
  );
}
