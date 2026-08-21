"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const TIERS = [
  { key: "maint1", items: 3 },
  { key: "maint2", items: 4 },
  { key: "maint3", items: 4 },
];

export function MaintenanceSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section className="section-light" id="mantenimiento">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("maintenance.eyebrow")}</div>
          <h2>{t("maintenance.h2")}</h2>
          <p>{t("maintenance.p")}</p>
        </div>
        <div className={`maintenance-grid ${grid.className}`} data-reveal ref={grid.ref}>
          {TIERS.map((tier) => (
            <div className="maintenance-card" key={tier.key}>
              <div className="maintenance-head">
                <span className="mname">{t(`${tier.key}.name`)}</span>
                <span className="mprice">{t(`${tier.key}.price`)}</span>
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
