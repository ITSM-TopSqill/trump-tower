import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectOverview from "@/components/ProjectOverview";
import SpecialOffers from "@/components/SpecialOffers";
import LocationConnectivity from "@/components/LocationConnectivity";
import AmenitiesShowcase from "@/components/AmenitiesShowcase";
import FloorPlans from "@/components/FloorPlans";
import ProjectGallery from "@/components/ProjectGallery";
import BrochureSection from "@/components/BrochureSection";
import PricingPayment from "@/components/PricingPayment";
import AboutBuilder from "@/components/AboutBuilder";
import Contact from "@/components/Contact";
import LegalInfo from "@/components/LegalInfo";
import MandatoryInquiryModal from "@/components/MandatoryInquiryModal";
import { useInquiryModal } from "@/contexts/InquiryModalContext";
import { useClickInterceptor } from "@/hooks/useClickInterceptor";
import OfferBanner from "@/components/OfferBanner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const { shouldShowModal, handleModalSuccess, hideModal } = useInquiryModal();
  
  // Use the click interceptor hook
  useClickInterceptor();

  return (
    <div className="min-h-screen">
      <Header />
      <section id="luxury-living-noida">
        <Hero />
      </section>
      <section id="offer-banner">
        <OfferBanner />
      </section>
      <section id="godrej-majesty-overview">
        <ProjectOverview />
      </section>
      {/* <SpecialOffers /> */}
      <section id="prime-location-connectivity">
        <LocationConnectivity />
      </section>
      <section id="world-class-amenities">
        <AmenitiesShowcase />
      </section>
      <section id="spacious-floor-plans">
        <FloorPlans />
      </section>
      <section id="project-gallery-images">
        <ProjectGallery />
      </section>
      {/* <BrochureSection /> */}
      <section id="pricing-payment-options">
        <PricingPayment />
      </section>
      <AboutBuilder />
      <section id="contact-sales-team">
        <Contact />
      </section>
      {/* <LegalInfo /> */}
      
      <MandatoryInquiryModal
        isOpen={shouldShowModal}
        onClose={hideModal}
        onSuccess={handleModalSuccess}
      />
      
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
