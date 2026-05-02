import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+917496016040"; // Replace with actual WhatsApp number
  const defaultMessage = "Hi! I'm interested in Godrej Majesty. Please share more details.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  const makeCall = () => {
    window.open(`tel:${whatsappNumber}`, '_self');
  };

  return (
    <>
      {/* Main Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`transition-all duration-300 ${isOpen ? 'transform scale-95' : ''}`}>
          {isOpen && (
            <div className="mb-4 space-y-3 animate-fade-up">
              {/* Call Button */}
              <Button
                onClick={makeCall}
                className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-luxury hover:shadow-xl transition-all duration-300"
                title="Call Now"
              >
                <Phone className="h-6 w-6" />
              </Button>
              
              {/* WhatsApp Button */}
              <Button
                onClick={openWhatsApp}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-luxury hover:shadow-xl transition-all duration-300"
                title="WhatsApp"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          )}
          
          {/* Toggle Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury hover:shadow-xl transition-all duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            title={isOpen ? "Close" : "Contact Us"}
          >
            {isOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <MessageCircle className="h-7 w-7" />
            )}
          </Button>
        </div>
        
        {/* Ripple Effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
        )}
      </div>
      
      {/* Contact Banner for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-primary text-primary-foreground p-3 shadow-luxury">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-3">
              <p className="font-semibold text-sm leading-tight">Interested in Godrej Majesty?</p>
              <p className="text-xs opacity-90">Get instant assistance</p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <Button
                onClick={makeCall}
                size="sm"
                variant="accent"
                className="flex items-center px-3 py-2 text-xs"
              >
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
              <Button
                onClick={openWhatsApp}
                size="sm"
                variant="secondary"
                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 text-xs"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingWhatsApp;