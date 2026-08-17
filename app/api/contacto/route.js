import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// nodemailer necesita APIs de Node (sockets TLS), no funciona en el runtime Edge.
export const runtime = "nodejs";

const MAX_LENGTHS = { nombre: 120, negocio: 120, telefono: 40, mensaje: 5000 };
const DEST_EMAIL = "info@danovacreators.com";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

// Quita saltos de linea para uso seguro en cabeceras de correo (asunto).
function sanitizeForHeader(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

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
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje.trim().slice(0, MAX_LENGTHS.mensaje) : "";

  if (!nombre || !telefono || !mensaje) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  const { ZOHO_EMAIL, ZOHO_APP_PASSWORD } = process.env;
  if (!ZOHO_EMAIL || !ZOHO_APP_PASSWORD) {
    console.error("Faltan las variables de entorno ZOHO_EMAIL / ZOHO_APP_PASSWORD.");
    return NextResponse.json({ error: "El formulario no está disponible ahora mismo." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    secure: false, // STARTTLS sobre el puerto 587
    auth: { user: ZOHO_EMAIL, pass: ZOHO_APP_PASSWORD },
  });

  const subject = `Nuevo contacto desde la web — ${sanitizeForHeader(nombre)}`;
  const text = [
    `Nombre: ${nombre}`,
    `Negocio: ${negocio || "—"}`,
    `Teléfono: ${telefono}`,
    "",
    "Mensaje:",
    mensaje,
  ].join("\n");
  const html = `
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Negocio:</strong> ${escapeHtml(negocio || "—")}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"DANOVA — Web" <${ZOHO_EMAIL}>`,
      to: DEST_EMAIL,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email de contacto:", err);
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
  }
}
