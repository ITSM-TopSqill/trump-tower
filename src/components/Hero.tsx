import { Button } from "@/components/ui/button";
import { Phone, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";
import LeadForm from "./LeadForm";
import ContactInfo from "./ContactInfo";
import logo from "@/assets/godrej-logo.png";
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Godrej Majesty Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative z-10 max-w-7xl mt-10">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-start min-h-screen py-6 sm:py-8 md:py-10">

          {/* Left Content */}
          <div className="text-primary-foreground animate-fade-up order-2 lg:order-1 text-center">
            <h1 className="leading-tight font-extrabold tracking-tight">
              {/* GODREJ */}
              <span className="block text-3xl md:text-4xl lg:text-6xl animate-fade-in">
                GODREJ
              </span>

              {/* MAJESTY */}
              <span className="block text-4xl md:text-5xl lg:text-7xl text-accent animate-float">
                MAJESTY
              </span>
            </h1>


            <p className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 opacity-90">
              3 & 4 BHK Ultra Luxury Apartments
            </p>

            <p className="text-base md:text-lg mb-6 md:mb-8 opacity-80 leading-relaxed">
              Experience premium living at Sector 12 Greater Noida West with world-class amenities,
              strategic location, and architectural excellence by Godrej Properties.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-12 text-center">
              {/* Feature 1 */}
              <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="text-2xl font-bold text-accent">3 & 4 BHK</div>
                <div className="text-sm opacity-80">Ultra Luxury Homes</div>
              </div>

              {/* Feature 2 */}
              <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
                <div className="text-2xl font-bold text-accent">25+ Amenities</div>
                <div className="text-sm opacity-80">Infinity Pool, Sky Deck, Clubhouse</div>
              </div>

              {/* Feature 3 */}
              <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-2xl font-bold text-accent">Prime Location</div>
                <div className="text-sm opacity-80">Best Locations</div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-6 mb-6">
              <span className="text-sm uppercase tracking-widest text-white mb-0 leading-none">
                Powered By
              </span>
              <img
                src={logo}
                alt="Godrej Logo"
                className="w-32 h-12 sm:w-40 sm:h-16 md:w-48 md:h-20 lg:w-64 lg:h-28 object-contain mt-1"
              />
            </div>




            {/* Contact Info */}
            <div className="lg:hidden mb-8">
              <ContactInfo />
            </div>
          </div>


          {/* Right Form */}
          <div
            className="animate-fade-up order-1 lg:order-2 w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none lg:mx-0"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-card/5 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl border border-primary-foreground/20 w-full">
              <LeadForm
                variant="hero"
                title="Get Exclusive Details"
                subtitle="Fill the form to receive brochure and get best offers"
              />
            </div>

            {/* Contact Info for Desktop */}
            <div className="hidden lg:block mt-4">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary-foreground opacity-60" />
      </div>
    </section>
  );
};

export default Hero;
