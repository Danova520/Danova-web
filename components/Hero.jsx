"use client";

import { useLanguage } from "@/context/LanguageContext";
import { StoryDoor } from "@/components/StoryDoor";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <div className="eyebrow">{t("hero.eyebrow")}</div>
          <h1 dangerouslySetInnerHTML={{ __html: t("hero.h1") }} />
          <p className="lede">{t("hero.lede")}</p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-primary">
              {t("hero.cta1")}
            </a>
            <a href="#servicios" className="btn btn-ghost">
              {t("hero.cta2")}
            </a>
          </div>
          <div className="location-tag">
            <span className="dot"></span>
            <span>{t("hero.location")}</span>
          </div>
        </div>
        <div className="hero-visual">
          <svg viewBox="0 0 320 320" fill="none">
            <circle
              className="orbit-ring"
              cx="160"
              cy="160"
              r="120"
              stroke="#C6A15B"
              strokeWidth="0.8"
              strokeDasharray="1 7"
              opacity="0.7"
            />
            <circle cx="160" cy="160" r="90" stroke="#F6F1E7" strokeWidth="0.6" opacity="0.12" />
            <circle cx="160" cy="160" r="60" stroke="#F6F1E7" strokeWidth="0.6" opacity="0.18" />
            <circle className="orbit-dot" cx="160" cy="40" r="5" fill="#C6A15B" />
            <circle cx="160" cy="160" r="3" fill="#F6F1E7" opacity="0.6" />
          </svg>
        </div>
      </div>

      <StoryDoor />
    </section>
  );
}
