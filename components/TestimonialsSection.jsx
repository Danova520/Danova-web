"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

export function TestimonialsSection() {
  const { t } = useLanguage();
  const empty = useReveal();

  return (
    <section className="section-light" id="testimonios">
      <div className="wrap">
        <div
          className="section-head"
          style={{ margin: "0 auto 40px", textAlign: "center" }}
          data-reveal
        >
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {t("testimonios.eyebrow")}
          </div>
          <h2>{t("testimonios.h2")}</h2>
        </div>
        <div className={`testi-empty ${empty.className}`} data-reveal ref={empty.ref}>
          <p>{t("testimonios.p")}</p>
        </div>
      </div>
    </section>
  );
}
