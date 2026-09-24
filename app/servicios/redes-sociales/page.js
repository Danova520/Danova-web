import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { ServicePage } from "@/components/ServicePage";
import { SocialSection } from "@/components/SocialSection";

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
        <ServicePage prefix="svcSocial" pricing={<SocialSection />} />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
