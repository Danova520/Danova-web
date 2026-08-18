"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LangSwitch } from "@/components/LangSwitch";
import { OrbitMark } from "@/components/OrbitMark";

const NAV_LINKS = [
  { href: "#servicios", key: "nav.servicios" },
  { href: "#paquetes", key: "nav.paquetes" },
  { href: "#proceso", key: "nav.proceso" },
  { href: "#nosotros", key: "nav.nosotros" },
  { href: "#faq", key: "nav.faq" },
];

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Solo actualiza el estado cuando el valor realmente cambia, para no
      // forzar un re-render en cada tick de scroll (decenas por segundo).
      setScrolled((prev) => {
        const next = window.scrollY > 40;
        return prev === next ? prev : next;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
        <nav className="wrap">
          <a href="#top" className="logo">
            <OrbitMark className="mark" animated />
            DANOVA<span className="sub">Creators</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.key} href={link.href}>
                {t(link.key)}
              </a>
            ))}
          </div>
          <LangSwitch />
          <a href="#contacto" className="btn btn-primary nav-cta">
            {t("nav.cta")}
          </a>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            id="burger"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobileMenu">
        {NAV_LINKS.map((link) => (
          <a key={link.key} href={link.href} onClick={closeMenu}>
            {t(link.key)}
          </a>
        ))}
        <a href="#contacto" style={{ color: "#C6A15B" }} onClick={closeMenu}>
          {t("nav.cta")}
        </a>
        <LangSwitch mobile />
      </div>
    </>
  );
}
