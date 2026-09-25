import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { ServicePage } from "@/components/ServicePage";
import { MaintenanceSection } from "@/components/MaintenanceSection";

export const metadata = {
  title: "SEO Local en A Coruña | DANOVA",
  description:
    "Posicionamiento SEO local en Google y Google Maps para negocios de A Coruña. Aparece antes que tu competencia en las búsquedas de tu zona.",
};

export default function SeoLocalACorunaPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcSeoCoruna" pricing={<MaintenanceSection />} />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
