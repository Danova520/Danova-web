"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const QUESTIONS = ["1", "2", "3", "4", "5"];

export function FaqSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const list = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("faq.eyebrow")}</div>
          <h2>{t("faq.h2")}</h2>
        </div>
        <div className={`faq-list ${list.className}`} data-reveal ref={list.ref}>
          {QUESTIONS.map((n, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={n}>
                <button
                  className="faq-q"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{t(`faq.q${n}`)}</span>
                  <span className="plus">+</span>
                </button>
                <div
                  className="faq-a"
                  style={{ maxHeight: isOpen ? "500px" : "0" }}
                >
                  <p>{t(`faq.a${n}`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
