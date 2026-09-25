"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { PortfolioSection } from "@/components/PortfolioSection";
import { WA_LINK } from "@/lib/constants";

const SERVICE_LINKS = [
  { href: "/servicios/diseno-web", key: "nav.svcWeb" },
  { href: "/servicios/seo-local", key: "nav.svcSeo" },
  { href: "/servicios/redes-sociales", key: "nav.svcSocial" },
  { href: "/servicios/mantenimiento-web", key: "nav.svcMaint" },
  { href: "/servicios/diseno-de-logo", key: "nav.svcBrand" },
];

export function LocationPage({ prefix, serviceOverrides }) {
  const { t } = useLanguage();
  const hero = useReveal();
  const what = useReveal();
  const trust = useReveal();
  const links = useReveal();
  const cta = useReveal();

  const waHref = `${WA_LINK}?text=${encodeURIComponent(t(`${prefix}.waText`))}`;
  const serviceLinks = SERVICE_LINKS.map((link) =>
    serviceOverrides?.[link.key] ? { ...link, href: serviceOverrides[link.key] } : link
  );

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
        <div className={`wrap ${trust.className}`} data-reveal ref={trust.ref}>
          <h2>{t(`${prefix}.trustH2`)}</h2>
          <p>{t(`${prefix}.trustP`)}</p>
        </div>
      </section>

      <section className="section-light">
        <div className="wrap">
          <div className={links.className} data-reveal ref={links.ref}>
            <h2>{t(`${prefix}.servicesH2`)}</h2>
          </div>
          <div className="loc-service-links">
            {serviceLinks.map((link) => (
              <Link href={link.href} className="loc-service-link" key={link.key}>
                <span>{t(link.key)}</span>
                <span className="arrow">→</span>
              </Link>
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
