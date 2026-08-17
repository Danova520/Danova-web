"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const STEPS = ["1", "2", "3", "4", "5", "6", "7"];

export function ProcessSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const list = useReveal();

  return (
    <section className="section-light" id="proceso">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("proceso.eyebrow")}</div>
          <h2>{t("proceso.h2")}</h2>
        </div>
        <div className={`process-list ${list.className}`} data-reveal ref={list.ref}>
          {STEPS.map((n) => (
            <div className="process-row" key={n}>
              <span className="pn">0{n}</span>
              <h3>{t(`step${n}.title`)}</h3>
              <p>{t(`step${n}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
