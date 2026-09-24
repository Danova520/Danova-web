import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ServicePage } from "@/components/ServicePage";

export const metadata = {
  title: "Gestión de Redes Sociales en Galicia | DANOVA",
  description:
    "Gestión profesional de Instagram, Facebook y TikTok para negocios locales en Carballo y Galicia. Contenido, calendario y estrategia.",
};

export default function RedesSocialesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcSocial" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
