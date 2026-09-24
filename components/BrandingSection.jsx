"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const TIERS = [
  { key: "brand1", items: 4, featured: false },
  { key: "brand2", items: 5, featured: true },
];

export function BrandingSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section className="section-light" id="diseno-de-marca">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("brand.eyebrow")}</div>
          <h2>{t("brand.h2")}</h2>
          <p>{t("brand.p")}</p>
        </div>
        <div className={`brand-grid ${grid.className}`} data-reveal ref={grid.ref}>
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
      </div>
    </section>
  );
}
