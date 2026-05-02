import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/godrej-logo.png";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#luxury-living-noida" },
    { label: "Offers", href: "#offer-banner" },
    { label: "Project Overview", href: "#godrej-majesty-overview" },
    { label: "Location", href: "#prime-location-connectivity" },
    { label: "Amenities", href: "#world-class-amenities" },
    { label: "Floor Plans", href: "#spacious-floor-plans" },
    { label: "Gallery", href: "#project-gallery-images" },
    { label: "Pricing", href: "#pricing-payment-options" },
    { label: "Contact", href: "#contact-sales-team" },
  ];
  //new changges applied

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Update URL hash
      window.history.pushState(null, '', href);
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10">
              <img src={logo} alt="Godrej Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold bg-clip-text text-yellow-600 tracking-wide">
                Godrej Majesty
              </h1>            </div>
          </div>



          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                data-scroll-to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              {/* <Phone className="h-4 w-4 text-primary" /> */}
              {/* <span className="text-foreground">+91-7496016040</span> */}
            </div>
            <Button
              onClick={() => scrollToSection("#contact-sales-team")}
              data-scroll-to="#contact-sales-team"
              className="bg-gradient-luxury hover:opacity-90 transition-opacity"
            >
              Get Details
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  data-scroll-to={item.href}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-border pt-4 px-4">
                <div className="flex items-center space-x-2 text-sm mb-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">+91-7496016040</span>
                </div>
                <Button
                  onClick={() => scrollToSection("#contact-sales-team")}
                  data-scroll-to="#contact-sales-team"
                  className="w-full bg-gradient-luxury hover:opacity-90 transition-opacity"
                >
                  Get Details
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;