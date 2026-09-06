"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const PROJECTS = [
  {
    key: "cerveceria",
    url: "cerveceriadelicias.com",
    href: "https://cerveceriadelicias.com",
    image: "/images/cerveceria-web.png",
    alt: "Captura de la web de Cervecería Delicias",
    title: "Cervecería Delicias — Carballo",
    textKey: "portfolio.text",
  },
  {
    key: "berlink",
    url: "berlinktattoos.com",
    href: "https://www.berlinktattoos.com",
    image: "/images/berlink-web.png",
    alt: "Captura de la web de Berlink Tattoos",
    title: "Berlink Tattoos — Joinville, Brasil",
    textKey: "portfolio.text2",
  },
];

function PortfolioItem({ project }) {
  const { t } = useLanguage();
  const feature = useReveal();

  return (
    <div className={`portfolio-feature ${feature.className}`} data-reveal ref={feature.ref}>
      <div className="portfolio-media">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <span className="browser-dot browser-dot-red"></span>
            <span className="browser-dot browser-dot-yellow"></span>
            <span className="browser-dot browser-dot-green"></span>
          </span>
          <span className="browser-url">{project.url}</span>
        </div>
        <div className="browser-screenshot">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(min-width: 860px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
      <div className="portfolio-text">
        <span className="portfolio-badge">{t("portfolio.badge")}</span>
        <h3>{project.title}</h3>
        <p>{t(project.textKey)}</p>
        <a className="btn btn-ghost portfolio-cta" href={project.href} target="_blank" rel="noopener">
          {t("portfolio.cta")}
        </a>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useLanguage();
  const head = useReveal();

  return (
    <section id="resultados">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("portfolio.eyebrow")}</div>
          <h2>{t("portfolio.h2")}</h2>
          <p>{t("portfolio.p")}</p>
        </div>
        <div className="portfolio-list">
          {PROJECTS.map((project) => (
            <PortfolioItem project={project} key={project.key} />
          ))}
        </div>
        <div className="portfolio-note">
          <p>{t("portfolio.note")}</p>
        </div>
      </div>
    </section>
  );
}
