"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { testimonials } from "@/lib/testimonials";

const EMPTY_FORM = { nombre: "", negocio: "", resena: "" };
const FIELD_BY_ID = { rname: "nombre", rbiz: "negocio", rtext: "resena" };
const RESENA_MAX_LENGTH = 500;

function TestimonialCard({ item, index }) {
  const { lang } = useLanguage();
  const reveal = useReveal();

  return (
    <div
      className={`testi-card ${reveal.className}`}
      data-reveal
      ref={reveal.ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="testi-name">{item.name}</div>
      <div className="testi-business">{item.business}</div>
      <div className="testi-quote">“{item.quote[lang]}”</div>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useLanguage();
  const head = useReveal();
  const formReveal = useReveal();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    const field = FIELD_BY_ID[e.target.id];
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/resena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-light" id="testimonios">
      <div className="wrap">
        <div
          className={`section-head ${head.className}`}
          style={{ margin: "0 auto 40px", textAlign: "center" }}
          data-reveal
          ref={head.ref}
        >
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {t("testimonios.eyebrow")}
          </div>
          <h2>{t("testimonios.h2")}</h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((item, index) => (
            <TestimonialCard item={item} index={index} key={`${item.name}-${index}`} />
          ))}
        </div>
        <form
          className={`testi-form ${formReveal.className}`}
          data-reveal
          ref={formReveal.ref}
          onSubmit={handleSubmit}
        >
          <p className="testi-form-intro">{t("testimonios.p")}</p>
          <div className="form-field">
            <label htmlFor="rname">{t("form.nombre")}</label>
            <input
              id="rname"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder={t("form.nombre.placeholder")}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="rbiz">{t("form.negocio")}</label>
            <input
              id="rbiz"
              type="text"
              value={form.negocio}
              onChange={handleChange}
              placeholder={t("form.negocio.placeholder")}
            />
          </div>
          <div className="form-field">
            <label htmlFor="rtext">{t("form.resena")}</label>
            <textarea
              id="rtext"
              value={form.resena}
              onChange={handleChange}
              placeholder={t("form.resena.placeholder")}
              maxLength={RESENA_MAX_LENGTH}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? t("form.sending") : t("form.resena.submit")}
          </button>
          {status === "success" && <p className="form-status form-status-ok">{t("form.resena.success")}</p>}
          {status === "error" && <p className="form-status form-status-error">{t("form.error")}</p>}
        </form>
      </div>
    </section>
  );
}
