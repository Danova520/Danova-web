"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { PortfolioSection } from "@/components/PortfolioSection";
import { WA_LINK } from "@/lib/constants";

const STEPS = [1, 2, 3, 4];
const PHOTOS = [1, 2, 3];

export function ServicePage({ prefix, pricing }) {
  const { t } = useLanguage();
  const hero = useReveal();
  const what = useReveal();
  const how = useReveal();
  const who = useReveal();
  const photos = useReveal();
  const cta = useReveal();

  const waHref = `${WA_LINK}?text=${encodeURIComponent(t(`${prefix}.waText`))}`;

  return (
    <>
      <section className="service-hero">
        <div className={`wrap ${hero.className}`} data-reveal ref={hero.ref}>
          <div className="eyebrow">{t(`${prefix}.eyebrow`)}</div>
          <h1>{t(`${prefix}.h1`)}</h1>
          <p className="lede">{t(`${prefix}.lede`)}</p>
        </div>
      </section>

      <section className="section-light">
        <div className={`wrap ${what.className}`} data-reveal ref={what.ref}>
          <h2>{t(`${prefix}.whatH2`)}</h2>
          <p>{t(`${prefix}.whatP`)}</p>
        </div>
      </section>

      <section className="section-light">
        <div className="wrap">
          <div className={how.className} data-reveal ref={how.ref}>
            <h2>{t(`${prefix}.howH2`)}</h2>
          </div>
          <div className="process-list">
            {STEPS.map((n) => (
              <div className="process-row" key={n}>
                <span className="pn">0{n}</span>
                <h3>{t(`${prefix}.how${n}Title`)}</h3>
                <p>{t(`${prefix}.how${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className={`wrap ${who.className}`} data-reveal ref={who.ref}>
          <h2>{t(`${prefix}.whoH2`)}</h2>
          <p>{t(`${prefix}.whoP`)}</p>
        </div>
      </section>

      {pricing}

      <section className="section-light">
        <div className="wrap">
          <div className={`section-head ${photos.className}`} data-reveal ref={photos.ref}>
            <h2>{t("svc.photosH2")}</h2>
          </div>
          <div className="service-photos">
            {PHOTOS.map((n) => (
              <div className="photo-placeholder" key={n}>
                <span>{t("svc.photoPlaceholder")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSection />

      <section className="section-light">
        <div className={`wrap service-cta ${cta.className}`} data-reveal ref={cta.ref}>
          <h2>{t(`${prefix}.ctaH2`)}</h2>
          <p>{t(`${prefix}.ctaP`)}</p>
          <div className="hero-ctas">
            <a href={waHref} className="btn btn-primary" target="_blank" rel="noopener">
              {t("svc.ctaWa")}
            </a>
            <a href="/#contacto" className="btn btn-ghost">
              {t("svc.ctaForm")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
