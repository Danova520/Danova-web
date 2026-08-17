"use client";

import { useLanguage } from "@/context/LanguageContext";

const LANGS = ["es", "en", "gl"];

export function LangSwitch({ mobile = false }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`lang-switch ${mobile ? "lang-switch-mobile" : ""}`}
      role="group"
      aria-label="Idioma"
    >
      {LANGS.map((code) => (
        <button
          key={code}
          className={`lang-btn ${lang === code ? "active" : ""}`}
          data-lang={code}
          type="button"
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
