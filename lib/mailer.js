import nodemailer from "nodemailer";

const DEST_EMAIL = "info@danovacreators.com";

export function escapeHtml(value) {
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
export function sanitizeForHeader(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

// Infraestructura de envio compartida por todos los formularios del sitio
// (contacto, reseñas...): mismo SMTP de Zoho, mismas credenciales.
export async function sendSiteEmail({ subject, text, html }) {
  const { ZOHO_EMAIL, ZOHO_APP_PASSWORD } = process.env;
  if (!ZOHO_EMAIL || !ZOHO_APP_PASSWORD) {
    throw new Error("MISSING_CREDENTIALS");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    secure: false, // STARTTLS sobre el puerto 587
    auth: { user: ZOHO_EMAIL, pass: ZOHO_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"DANOVA — Web" <${ZOHO_EMAIL}>`,
    to: DEST_EMAIL,
    subject,
    text,
    html,
  });
}
