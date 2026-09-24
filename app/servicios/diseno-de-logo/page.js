import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ServicePage } from "@/components/ServicePage";
import { BrandingSection } from "@/components/BrandingSection";

export const metadata = {
  title: "Diseño de Logo e Identidad de Marca en Galicia | DANOVA",
  description:
    "Diseño de logo e identidad de marca para negocios locales en Carballo y Galicia. Logo a medida o paquete completo con colores, tipografías y guía de uso.",
};

export default function DisenoDeLogoPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcBrand" pricing={<BrandingSection />} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
