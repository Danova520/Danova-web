import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PackagesSection } from "@/components/PackagesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ChatWidget } from "@/components/ChatWidget";
import { SmoothAnchorLinks } from "@/components/SmoothAnchorLinks";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <PackagesSection />
        <PortfolioSection />
        <ProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <ChatWidget />
      <WhatsAppFloat />
      <SmoothAnchorLinks />
      <CustomCursor />
    </>
  );
}
