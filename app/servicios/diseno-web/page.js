import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { ServicePage } from "@/components/ServicePage";
import { PackagesSection } from "@/components/PackagesSection";

export const metadata = {
  title: "Diseño Web en Carballo y Galicia | DANOVA",
  description:
    "Diseño y desarrollo de páginas web para negocios locales en Carballo y Galicia: bares, restaurantes, tiendas y peluquerías. Webs rápidas, mobile-first y pensadas para conseguir clientes.",
};

export default function DisenoWebPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePage prefix="svcWeb" pricing={<PackagesSection />} />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
