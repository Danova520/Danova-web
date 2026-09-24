import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { LocationPage } from "@/components/LocationPage";

export const metadata = {
  title: "Agencia de Marketing Digital en A Coruña | DANOVA",
  description:
    "DANOVA es una agencia de marketing digital con base en Carballo que trabaja con negocios de A Coruña y la comarca: diseño web, SEO local y redes sociales como un mismo sistema.",
};

export default function ACorunaPage() {
  return (
    <>
      <Header />
      <main>
        <LocationPage prefix="locCoruna" />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
