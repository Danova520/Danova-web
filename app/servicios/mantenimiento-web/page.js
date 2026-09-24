import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { ServicePage } from "@/components/ServicePage";
import { MaintenanceSection } from "@/components/MaintenanceSection";

export const metadata = {
  title: "Mantenimiento Web en Galicia | DANOVA",
  description:
    "Mantenimiento web para negocios en Carballo y Galicia: seguridad, copias de seguridad y actualizaciones de contenido para tu web.",
};

export default function MantenimientoWebPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcMaint" pricing={<MaintenanceSection />} />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
