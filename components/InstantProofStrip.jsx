"use client";

import { useLanguage } from "@/context/LanguageContext";

// Iconos de línea sencillos, mismo estilo que los sociales del footer.
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20.5 12.3c0-.7-.06-1.4-.18-2.05H12v3.9h4.76a4.1 4.1 0 0 1-1.77 2.68v2.2h2.86c1.68-1.55 2.65-3.83 2.65-6.73Z" />
      <path d="M12 21c2.4 0 4.4-.8 5.85-2.16l-2.86-2.2c-.8.53-1.82.85-3 .85-2.3 0-4.26-1.55-4.96-3.64H4.1v2.28A9 9 0 0 0 12 21Z" />
      <path d="M7.04 13.85a5.4 5.4 0 0 1 0-3.4V8.17H4.1a9 9 0 0 0 0 8.06l2.94-2.28Z" />
      <path d="M12 6.9c1.3 0 2.47.45 3.39 1.33l2.54-2.53C16.4 4.14 14.4 3.3 12 3.3a9 9 0 0 0-7.9 4.87l2.94 2.28C7.74 8.45 9.7 6.9 12 6.9Z" />
    </svg>
  );
}
function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9s1.2-6.6 3.6-9Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path
        d="M14 21v-7h2.5l.5-3H14V9.2c0-.9.3-1.6 1.7-1.6H17V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.6v7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.55L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.4c.15-.35.3-.36.45-.36h.4c.13 0 .3-.05.47.35s.58 1.4.63 1.5.08.22 0 .35a2 2 0 0 1-.3.35c-.15.15-.3.32-.13.6.17.3.75 1.2 1.6 1.95 1.1.95 1.9 1.24 2.2 1.38.3.14.47.12.64-.08.18-.2.75-.85.95-1.15.2-.3.4-.24.65-.14s1.6.75 1.87.9c.28.13.46.2.53.32.07.13.07.7-.17 1.37-.24.68-1.4 1.3-1.93 1.35-.5.06-1 .26-3.3-.7-2.8-1.16-4.55-3.98-4.7-4.16-.13-.2-1.1-1.46-1.1-2.8 0-1.32.7-1.96.94-2.23Z"
      />
    </svg>
  );
}

const ICONS = [
  { Icon: GoogleIcon, label: "Google" },
  { Icon: WebIcon, label: "Web" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: WhatsAppIcon, label: "WhatsApp" },
];

export function InstantProofStrip() {
  const { t } = useLanguage();

  return (
    <div className="proof-strip">
      <div className="wrap proof-strip-inner">
        <p className="proof-text1">{t("proof.text1")}</p>
        <div className="proof-icons" aria-hidden="true">
          {ICONS.map(({ Icon, label }) => (
            <span className="proof-icon" key={label} title={label}>
              <Icon />
            </span>
          ))}
        </div>
        <p className="proof-text2">{t("proof.text2")}</p>
      </div>
    </div>
  );
}
