"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const CYCLE = [1, 2, 3, 4, 5];

const DISCIPLINES = [
  { key: "sistema.d1", items: 6, link: true },
  { key: "sistema.d2", items: 6, link: false },
  { key: "sistema.d3", items: 6, link: false },
  { key: "sistema.d4", items: 5, link: false },
];

function CycleWheel() {
  const { t } = useLanguage();

  return (
    <div className="cycle">
      <div className="cycle-wheel">
        <svg className="cycle-ring" viewBox="0 0 320 320" fill="none" aria-hidden="true">
          <circle cx="160" cy="160" r="128" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="1 7" opacity="0.6" />
        </svg>
        {CYCLE.map((n, i) => (
          <div className="cycle-node" style={{ "--i": i }} key={n}>
            <span className="cycle-dot">{i + 1}</span>
            <span className="cycle-label">{t(`sistema.cycle${n}`)}</span>
          </div>
        ))}
      </div>
      <div className="cycle-list">
        {CYCLE.map((n, i) => (
          <div className="cycle-row" key={n}>
            <span className="cycle-dot">{i + 1}</span>
            <span className="cycle-label">{t(`sistema.cycle${n}`)}</span>
            {i < CYCLE.length - 1 && (
              <span className="cycle-arrow" aria-hidden="true">↓</span>
            )}
          </div>
        ))}
        <div className="cycle-loop-note" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 4a8 8 0 1 1-6.93 4" strokeLinecap="round" />
            <path d="M3 4v4h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DisciplineCard({ disc, index }) {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <div
      className={`discipline-card ${reveal.className}`}
      data-reveal
      ref={reveal.ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="discipline-num">0{index + 1}</span>
      <h3>{t(`${disc.key}.title`)}</h3>
      <p>{t(`${disc.key}.desc`)}</p>
      <ul>
        {Array.from({ length: disc.items }, (_, i) => i + 1).map((n) => (
          <li key={n}>{t(`${disc.key}.li${n}`)}</li>
        ))}
      </ul>
      {disc.link && <span className="discipline-link">{t(`${disc.key}.link`)}</span>}
    </div>
  );
}

export function SystemSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const cycle = useReveal();
  const grid = useReveal();

  return (
    <section className="section-light" id="servicios">
      <div className="wrap">
        <div className={`section-head ${head.className}`} data-reveal ref={head.ref} style={{ maxWidth: "760px" }}>
          <h2 className="sistema-h2">{t("sistema.h2")}</h2>
          <p>{t("sistema.note")}</p>
        </div>
        <div className={cycle.className} data-reveal ref={cycle.ref}>
          <CycleWheel />
        </div>
        <div className={`disciplines ${grid.className}`} data-reveal ref={grid.ref}>
          {DISCIPLINES.map((disc, index) => (
            <DisciplineCard disc={disc} index={index} key={disc.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
