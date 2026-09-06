"use client";

import { useLanguage } from "@/context/LanguageContext";

// Barra fija solo en móvil que lleva al formulario de contacto (no a WhatsApp).
export function MobileStickyCta() {
  const { t } = useLanguage();

  return (
    <a href="#contacto-form" className="mobile-sticky-cta">
      {t("sticky.cta")}
    </a>
  );
}
