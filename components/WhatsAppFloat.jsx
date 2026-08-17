"use client";

import { useLanguage } from "@/context/LanguageContext";
import { WA_LINK } from "@/lib/constants";

export function WhatsAppFloat() {
  const { t } = useLanguage();

  function handleClick(e) {
    e.preventDefault();
    const url = `${WA_LINK}?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DANOVA`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  return (
    <a
      href={`${WA_LINK}?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DANOVA`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener"
      aria-label={t("wa.aria")}
      onClick={handleClick}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.36.685 4.56 1.87 6.41L4 29l7.78-1.83A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.6a9.55 9.55 0 0 1-4.87-1.33l-.35-.2-4.62 1.09 1.11-4.5-.23-.37A9.56 9.56 0 1 1 25.56 15 9.58 9.58 0 0 1 16.004 24.6zm5.24-7.15c-.29-.14-1.71-.84-1.98-.94-.27-.1-.46-.14-.65.14-.19.28-.75.94-.92 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.02 2.77 1.17 2.96c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.71-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z" />
      </svg>
    </a>
  );
}
