"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LangSwitch } from "@/components/LangSwitch";
import { OrbitMark } from "@/components/OrbitMark";

const NAV_LINKS = [
  { href: "#servicios", key: "nav.servicios" },
  { href: "#resultados", key: "nav.resultados" },
  { href: "#testimonios", key: "nav.testimonios" },
  { href: "#proceso", key: "nav.proceso" },
  { href: "#nosotros", key: "nav.nosotros" },
];

const SERVICE_LINKS = [
  { href: "/servicios/diseno-web", key: "nav.svcWeb" },
  { href: "/servicios/seo-local", key: "nav.svcSeo" },
  { href: "/servicios/redes-sociales", key: "nav.svcSocial" },
  { href: "/servicios/mantenimiento-web", key: "nav.svcMaint" },
];

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // En las paginas de servicio no existen los anclajes de la home (#servicios,
  // #resultados...), asi que ahi los enlaces del nav deben apuntar a "/#ancla"
  // para volver primero a la home y luego saltar a la seccion.
  function anchorHref(href) {
    return isHome ? href : `/${href}`;
  }

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
          <a href={anchorHref("#top")} className="logo">
            <OrbitMark className="mark" animated />
            DANOVA<span className="sub">Creators</span>
          </a>
          <div className="nav-links">
            <div className="nav-dropdown">
              <a href={anchorHref("#servicios")}>{t("nav.servicios")}</a>
              <div className="nav-dropdown-menu">
                {SERVICE_LINKS.map((link) => (
                  <a key={link.key} href={link.href}>
                    {t(link.key)}
                  </a>
                ))}
              </div>
            </div>
            {NAV_LINKS.slice(1).map((link) => (
              <a key={link.key} href={anchorHref(link.href)}>
                {t(link.key)}
              </a>
            ))}
          </div>
          <LangSwitch />
          <a href={anchorHref("#contacto")} className="btn btn-primary nav-cta">
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
          <a key={link.key} href={anchorHref(link.href)} onClick={closeMenu}>
            {t(link.key)}
          </a>
        ))}
        {SERVICE_LINKS.map((link) => (
          <a key={link.key} href={link.href} className="sub" onClick={closeMenu}>
            {t(link.key)}
          </a>
        ))}
        <a href={anchorHref("#contacto")} style={{ color: "#C6A15B" }} onClick={closeMenu}>
          {t("nav.cta")}
        </a>
        <LangSwitch mobile />
      </div>
    </>
  );
}
