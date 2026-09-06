import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InstantProofStrip } from "@/components/InstantProofStrip";
import { ProblemSection } from "@/components/ProblemSection";
import { SystemSection } from "@/components/SystemSection";
import { AudienceSection } from "@/components/AudienceSection";
import { PackagesSection } from "@/components/PackagesSection";
import { MaintenanceSection } from "@/components/MaintenanceSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSection } from "@/components/AboutSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { SmoothAnchorLinks } from "@/components/SmoothAnchorLinks";
import { DeferredWidgets } from "@/components/DeferredWidgets";

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <Hero />
        <InstantProofStrip />
        <ProblemSection />
        <SystemSection />
        <AudienceSection />
        <PackagesSection />
        <MaintenanceSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ProcessSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileStickyCta />
      <SmoothAnchorLinks />
      <DeferredWidgets />
    </>
  );
}
