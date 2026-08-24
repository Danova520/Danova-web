import { NextResponse } from "next/server";
import { escapeHtml, sanitizeForHeader, sendSiteEmail } from "@/lib/mailer";

// nodemailer necesita APIs de Node (sockets TLS), no funciona en el runtime Edge.
export const runtime = "nodejs";

const MAX_LENGTHS = { nombre: 120, negocio: 120, resena: 500 };

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const nombre = typeof body?.nombre === "string" ? body.nombre.trim().slice(0, MAX_LENGTHS.nombre) : "";
  const negocio = typeof body?.negocio === "string" ? body.negocio.trim().slice(0, MAX_LENGTHS.negocio) : "";
  const resena = typeof body?.resena === "string" ? body.resena.trim().slice(0, MAX_LENGTHS.resena) : "";

  if (!nombre || !resena) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  // Estas reseñas NUNCA se publican solas: solo llegan por email para que
  // Dennis y Abel las revisen a mano antes de decidir mostrarlas en la web.
  const subject = `Nueva reseña para revisar — ${sanitizeForHeader(nombre)}`;
  const text = [`Nombre: ${nombre}`, `Negocio: ${negocio || "—"}`, "", "Reseña:", resena].join("\n");
  const html = `
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Negocio:</strong> ${escapeHtml(negocio || "—")}</p>
    <p><strong>Reseña:</strong></p>
    <p>${escapeHtml(resena).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await sendSiteEmail({ subject, text, html });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err.message === "MISSING_CREDENTIALS") {
      console.error("Faltan las variables de entorno ZOHO_EMAIL / ZOHO_APP_PASSWORD.");
      return NextResponse.json({ error: "El formulario no está disponible ahora mismo." }, { status: 500 });
    }
    console.error("Error enviando email de reseña:", err);
    return NextResponse.json({ error: "No se pudo enviar la reseña." }, { status: 502 });
  }
}
