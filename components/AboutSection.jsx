"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

export function AboutSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="nosotros">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("nosotros.eyebrow")}</div>
          <h2>Dennis Alemán &amp; Abel David Núñez — DANOVA</h2>
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
