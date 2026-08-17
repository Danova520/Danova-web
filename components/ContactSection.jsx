"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { WA_LINK, WA_DISPLAY, SOCIAL_LINKS } from "@/lib/constants";

export function ContactSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section className="section-light" id="contacto">
      <div className="wrap">
        <div className={head.className} data-reveal ref={head.ref}>
          <div className="eyebrow">{t("contacto.eyebrow")}</div>
          <h2>{t("contacto.h2")}</h2>
          <p>{t("contacto.p")}</p>
        </div>
        <div className={`contact-grid ${grid.className}`} data-reveal ref={grid.ref}>
          <div className="contact-channels">
            <a
              className="channel"
              href={`${WA_LINK}?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DANOVA`}
              target="_blank"
              rel="noopener"
            >
              <div>
                <span className="clabel">WhatsApp</span>
                <span className="cvalue">{WA_DISPLAY}</span>
              </div>
              <span className="channel-link">{t("channel.escribir")}</span>
            </a>
            <a className="channel" href="mailto:info@danovacreators.com">
              <div>
                <span className="clabel">Email</span>
                <span className="cvalue">info@danovacreators.com</span>
              </div>
              <span className="channel-link">{t("channel.enviar")}</span>
            </a>
            <a className="channel" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener">
              <div>
                <span className="clabel">Instagram</span>
                <span className="cvalue">@danova.creators</span>
              </div>
              <span className="channel-link">{t("channel.seguir")}</span>
            </a>
            <a className="channel" href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener">
              <div>
                <span className="clabel">Facebook</span>
                <span className="cvalue">DANOVA Creators</span>
              </div>
              <span className="channel-link">{t("channel.seguir")}</span>
            </a>
            <a className="channel" href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener">
              <div>
                <span className="clabel">TikTok</span>
                <span className="cvalue">@danovacreators</span>
              </div>
              <span className="channel-link">{t("channel.seguir")}</span>
            </a>
            <div className="channel">
              <div>
                <span className="clabel">{t("channel.ubicacion")}</span>
                <span className="cvalue">Carballo, A Coruña</span>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-field">
              <label htmlFor="fname">{t("form.nombre")}</label>
              <input id="fname" type="text" placeholder={t("form.nombre.placeholder")} required />
            </div>
            <div className="form-field">
              <label htmlFor="fbiz">{t("form.negocio")}</label>
              <input id="fbiz" type="text" placeholder={t("form.negocio.placeholder")} />
            </div>
            <div className="form-field">
              <label htmlFor="fmsg">{t("form.mensaje")}</label>
              <textarea id="fmsg" placeholder={t("form.mensaje.placeholder")} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              {t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
