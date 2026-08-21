"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const TIERS = ["1", "2", "3"];

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
          {TIERS.map((n) => (
            <div className="maintenance-card" key={n}>
              <span className="mname">{t(`maint${n}.name`)}</span>
              <span className="mprice">{t(`maint${n}.price`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
