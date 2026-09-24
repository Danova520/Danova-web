import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { ServicePage } from "@/components/ServicePage";
import { MaintenanceSection } from "@/components/MaintenanceSection";

export const metadata = {
  title: "Posicionamiento SEO Local en Galicia | DANOVA",
  description:
    "Mejora tu posicionamiento en Google y Google Maps en Carballo y Galicia. SEO local para negocios que quieren aparecer antes que su competencia.",
};

export default function SeoLocalPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcSeo" pricing={<MaintenanceSection />} />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
