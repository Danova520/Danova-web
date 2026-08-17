"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const PILLARS = [
  { num: "I", key: "solucion.p1" },
  { num: "II", key: "solucion.p2" },
  { num: "III", key: "solucion.p3" },
];

export function SolutionSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const pillars = useReveal();

  return (
    <section className="section-light" id="solucion">
      <div className="wrap solucion-inner">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("solucion.eyebrow")}</div>
          <h2>{t("solucion.h2")}</h2>
          <p>{t("solucion.p")}</p>
        </div>
        <div className={`pillars ${pillars.className}`} data-reveal ref={pillars.ref}>
          {PILLARS.map((p) => (
            <div className="pillar" key={p.num}>
              <span className="pnum">{p.num}</span>
              <div>
                <h3>{t(`${p.key}.title`)}</h3>
                <p>{t(`${p.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
