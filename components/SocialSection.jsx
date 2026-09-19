"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const TIERS = [
  { key: "soc1", items: 4, featured: false },
  { key: "soc2", items: 5, featured: true },
  { key: "soc3", items: 5, featured: false },
];

export function SocialSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section className="section-light" id="redes-sociales">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("social.eyebrow")}</div>
          <h2>{t("social.h2")}</h2>
          <p>{t("social.p")}</p>
        </div>
        <div className={`social-grid ${grid.className}`} data-reveal ref={grid.ref}>
          {TIERS.map((tier) => (
            <div className={`social-card ${tier.featured ? "featured" : ""}`} key={tier.key}>
              <div className="social-head">
                <span className="sname">{t(`${tier.key}.name`)}</span>
                <span className="sprice">{t(`${tier.key}.price`)}</span>
              </div>
              <ul>
                {Array.from({ length: tier.items }, (_, i) => i + 1).map((n) => (
                  <li key={n}>{t(`${tier.key}.li${n}`)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="social-note">{t("social.note")}</p>
      </div>
    </section>
  );
}
