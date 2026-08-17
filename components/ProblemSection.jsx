"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const ITEMS = ["1", "2", "3", "4", "5", "6"];

export function ProblemSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="problema">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("problema.eyebrow")}</div>
          <h2>{t("problema.h2")}</h2>
          <p>{t("problema.p")}</p>
        </div>
        <div className={`grid-problems ${grid.className}`} data-reveal ref={grid.ref}>
          {ITEMS.map((n) => (
            <div className="problem-cell" key={n}>
              <span className="idx">0{n}</span>
              <h3>{t(`problema.item${n}.title`)}</h3>
              <p>{t(`problema.item${n}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
