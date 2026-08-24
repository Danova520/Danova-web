"use client";

import Image from "next/image";
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
            <div className="browser-bar">
              <span className="browser-dots" aria-hidden="true">
                <span className="browser-dot browser-dot-red"></span>
                <span className="browser-dot browser-dot-yellow"></span>
                <span className="browser-dot browser-dot-green"></span>
              </span>
              <span className="browser-url">cerveceriadelicias.com</span>
            </div>
            <div className="browser-screenshot">
              <Image
                src="/images/cerveceria-web.png"
                alt="Captura de la web de Cervecería Delicias"
                fill
                sizes="(min-width: 860px) 50vw, 100vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
          <div className="portfolio-text">
            <span className="portfolio-badge">{t("portfolio.badge")}</span>
            <h3>Cervecería Delicias — Carballo</h3>
            <p>{t("portfolio.text")}</p>
            <a
              className="btn btn-ghost portfolio-cta"
              href="https://cerveceriadelicias.com"
              target="_blank"
              rel="noopener"
            >
              {t("portfolio.cta")}
            </a>
          </div>
        </div>
        <div className="portfolio-note">
          <p>{t("portfolio.note")}</p>
        </div>
      </div>
    </section>
  );
}
