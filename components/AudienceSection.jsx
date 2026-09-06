"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

// Iconos de línea sobrios, mismo trazo (strokeWidth 1.6) que el resto del sitio.
function RestaurantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M7 2v8M5 2v5a2 2 0 0 0 4 0V2M7 10v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 2c-1.7 0-3 2-3 5s1.3 5 3 5v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ScissorsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8.3 7.6 20 18M20 6 8.3 16.4" strokeLinecap="round" />
    </svg>
  );
}
function DumbbellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 9v6M2.5 10.5v3M20 9v6M21.5 10.5v3M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4.5" y="8" width="3" height="8" rx="1" />
      <rect x="16.5" y="8" width="3" height="8" rx="1" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 21V9l8-5 8 5v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6M9 12h.01M15 12h.01M9 9h.01M15 9h.01" strokeLinecap="round" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 12.5h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 9.5 5 4h14l1 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V20h14V9.5M10 20v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AUDIENCE = [
  { Icon: RestaurantIcon, key: "paraquien.item1" },
  { Icon: ScissorsIcon, key: "paraquien.item2" },
  { Icon: DumbbellIcon, key: "paraquien.item3" },
  { Icon: BuildingIcon, key: "paraquien.item4" },
  { Icon: BriefcaseIcon, key: "paraquien.item5" },
  { Icon: ShopIcon, key: "paraquien.item6" },
];

function AudienceCard({ item, index }) {
  const { t } = useLanguage();
  const reveal = useReveal();
  const { Icon } = item;

  return (
    <div
      className={`audience-card ${reveal.className}`}
      data-reveal
      ref={reveal.ref}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <span className="audience-icon">
        <Icon />
      </span>
      <span className="audience-label">{t(item.key)}</span>
    </div>
  );
}

export function AudienceSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="para-quien">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref} style={{ margin: "0 auto 40px", textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>{t("paraquien.eyebrow")}</div>
          <h2>{t("paraquien.h2")}</h2>
          <p>{t("paraquien.p")}</p>
        </div>
        <div className={`audience-grid ${grid.className}`} data-reveal ref={grid.ref}>
          {AUDIENCE.map((item, index) => (
            <AudienceCard item={item} index={index} key={item.key} />
          ))}
        </div>
        <p className="audience-note">{t("paraquien.note")}</p>
      </div>
    </section>
  );
}
