import { NextResponse } from "next/server";
import { escapeHtml, sanitizeForHeader, sendSiteEmail } from "@/lib/mailer";

// nodemailer necesita APIs de Node (sockets TLS), no funciona en el runtime Edge.
export const runtime = "nodejs";

const MAX_LENGTHS = { nombre: 120, negocio: 120, telefono: 40, necesita: 120, objetivo: 120, mensaje: 5000 };

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const nombre = typeof body?.nombre === "string" ? body.nombre.trim().slice(0, MAX_LENGTHS.nombre) : "";
  const negocio = typeof body?.negocio === "string" ? body.negocio.trim().slice(0, MAX_LENGTHS.negocio) : "";
  const telefono = typeof body?.telefono === "string" ? body.telefono.trim().slice(0, MAX_LENGTHS.telefono) : "";
  const necesita = typeof body?.necesita === "string" ? body.necesita.trim().slice(0, MAX_LENGTHS.necesita) : "";
  const objetivo = typeof body?.objetivo === "string" ? body.objetivo.trim().slice(0, MAX_LENGTHS.objetivo) : "";
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje.trim().slice(0, MAX_LENGTHS.mensaje) : "";

  if (!nombre || !telefono || !mensaje) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  const subject = `Nuevo contacto desde la web — ${sanitizeForHeader(nombre)}`;
  const text = [
    `Nombre: ${nombre}`,
    `Negocio: ${negocio || "—"}`,
    `Teléfono: ${telefono}`,
    `Qué necesita: ${necesita || "—"}`,
    `Objetivo principal: ${objetivo || "—"}`,
    "",
    "Mensaje:",
    mensaje,
  ].join("\n");
  const html = `
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Negocio:</strong> ${escapeHtml(negocio || "—")}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
    <p><strong>Qué necesita:</strong> ${escapeHtml(necesita || "—")}</p>
    <p><strong>Objetivo principal:</strong> ${escapeHtml(objetivo || "—")}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await sendSiteEmail({ subject, text, html });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err.message === "MISSING_CREDENTIALS") {
      console.error("Faltan las variables de entorno ZOHO_EMAIL / ZOHO_APP_PASSWORD.");
      return NextResponse.json({ error: "El formulario no está disponible ahora mismo." }, { status: 500 });
    }
    console.error("Error enviando email de contacto:", err);
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
  }
}
