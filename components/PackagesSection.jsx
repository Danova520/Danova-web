"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const PACKAGES = [
  { key: "pkg1", name: "Danova Base", items: 4, featured: false, btnClass: "btn-ghost" },
  { key: "pkg2", name: "Danova Impulso", items: 5, featured: true, btnClass: "btn-primary" },
  { key: "pkg3", name: "Danova Órbita", items: 5, featured: false, btnClass: "btn-ghost" },
];

function PackageCard({ pkg, index }) {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <div
      className={`package ${pkg.featured ? "featured" : ""} ${reveal.className}`}
      data-reveal
      ref={reveal.ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <span className="pname">{pkg.name}</span>
      <h3>{t(`${pkg.key}.h3`)}</h3>
      <p className="pdesc">{t(`${pkg.key}.desc`)}</p>
      <ul>
        {Array.from({ length: pkg.items }, (_, i) => i + 1).map((n) => (
          <li key={n}>{t(`${pkg.key}.li${n}`)}</li>
        ))}
      </ul>
      <a href="#contacto" className={`btn ${pkg.btnClass}`}>
        {t("packages.cta")}
      </a>
    </div>
  );
}

export function PackagesSection() {
  const { t } = useLanguage();
  const head = useReveal();

  return (
    <section className="section-light" id="paquetes">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("paquetes.eyebrow")}</div>
          <h2>{t("paquetes.h2")}</h2>
          <p>{t("paquetes.p")}</p>
        </div>
        <div className="packages">
          {PACKAGES.map((pkg, index) => (
            <PackageCard key={pkg.key} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
