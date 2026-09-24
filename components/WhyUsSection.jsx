"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

function DirectIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9h8M8 12.5h5" strokeLinecap="round" />
    </svg>
  );
}
function PriceTagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5L13 21l8-8-9.5-9.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.2" cy="8.2" r="1.4" />
    </svg>
  );
}
function SpeedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProofIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 19V10M10 19V5M16 19v-7M20 19V8" strokeLinecap="round" />
      <path d="m4 9 6-5 6 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const REASONS = [
  { Icon: DirectIcon, key: "whyus.r1" },
  { Icon: PriceTagIcon, key: "whyus.r2" },
  { Icon: SpeedIcon, key: "whyus.r3" },
  { Icon: ProofIcon, key: "whyus.r4" },
];

function WhyUsCard({ item, index }) {
  const { t } = useLanguage();
  const reveal = useReveal();
  const { Icon } = item;

  return (
    <div
      className={`whyus-card ${reveal.className}`}
      data-reveal
      ref={reveal.ref}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className="whyus-icon">
        <Icon />
      </span>
      <p>{t(item.key)}</p>
    </div>
  );
}

export function WhyUsSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="por-que-danova">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("whyus.eyebrow")}</div>
          <h2>{t("whyus.h2")}</h2>
        </div>
        <div className={`whyus-grid ${grid.className}`} data-reveal ref={grid.ref}>
          {REASONS.map((item, index) => (
            <WhyUsCard item={item} index={index} key={item.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
