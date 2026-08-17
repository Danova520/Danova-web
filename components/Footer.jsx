"use client";

import { useLanguage } from "@/context/LanguageContext";
import { OrbitMark } from "@/components/OrbitMark";
import { SOCIAL_LINKS } from "@/lib/constants";

const LINKS = [
  { href: "#servicios", key: "nav.servicios" },
  { href: "#paquetes", key: "nav.paquetes" },
  { href: "#portfolio", key: "footer.portfolio" },
  { href: "#nosotros", key: "nav.nosotros" },
  { href: "#contacto", key: "footer.contacto" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="logo">
            <OrbitMark className="mark" />
            DANOVA<span className="sub">Creators</span>
          </div>
          <div className="footer-links">
            {LINKS.map((link) => (
              <a key={link.key} href={link.href}>
                {t(link.key)}
              </a>
            ))}
          </div>
          <div className="footer-socials">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path
                  d="M14 21v-7h2.5l.5-3H14V9.2c0-.9.3-1.6 1.7-1.6H17V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.6v7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path
                  d="M13 3v11.2a3.2 3.2 0 1 1-2.4-3.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M13 3c.3 2.4 2 4.2 4.4 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
