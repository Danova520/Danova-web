"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const SERVICES = ["1", "2", "3", "4"];

export function ServicesSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="servicios">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("servicios.eyebrow")}</div>
          <h2>{t("servicios.h2")}</h2>
        </div>
        <div className={`services-grid ${grid.className}`} data-reveal ref={grid.ref}>
          {SERVICES.map((n) => (
            <div className="service-card" key={n}>
              <span className="service-num">{t(`serv${n}.num`)}</span>
              <h3>{t(`serv${n}.title`)}</h3>
              <p>{t(`serv${n}.desc`)}</p>
              <div className="service-tags">
                <span>{t(`serv${n}.tag1`)}</span>
                <span>{t(`serv${n}.tag2`)}</span>
                <span>{t(`serv${n}.tag3`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
