import { Clock, Gift, Star, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpecialOffers = () => {
  const offers = [
    {
      icon: Gift,
      title: "EOI Discount",
      discount: "Up to ₹2 Lakhs",
      description: "Limited time offer for early birds",
      validity: "Valid till 31st Dec 2024",
      highlight: true
    },
    {
      icon: Percent,
      title: "No Registration Charges",
      discount: "Save ₹50,000",
      description: "Zero registration fees for first 100 bookings",
      validity: "Limited period offer",
      highlight: false
    },
    {
      icon: Star,
      title: "Assured Returns",
      discount: "12% Annual",
      description: "Guaranteed rental returns for 3 years",
      validity: "Terms & conditions apply",
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent text-accent-foreground px-4 py-2 rounded-full mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span className="font-semibold">Limited Time Offers</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Special Launch Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss these exclusive offers available for a limited time. Book now and save big!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={offer.title}
              className={`relative p-8 rounded-2xl shadow-luxury transition-all duration-300 hover:scale-105 animate-fade-up ${
                offer.highlight 
                  ? 'bg-gradient-luxury text-primary-foreground border-2 border-accent' 
                  : 'bg-card'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {offer.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Best Offer
                  </div>
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                offer.highlight ? 'bg-accent/20' : 'bg-gradient-luxury'
              }`}>
                <offer.icon className={`h-8 w-8 ${
                  offer.highlight ? 'text-accent' : 'text-primary-foreground'
                }`} />
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${
                offer.highlight ? 'text-primary-foreground' : 'text-foreground'
              }`}>
                {offer.title}
              </h3>
              
              <div className={`text-3xl font-bold mb-4 ${
                offer.highlight ? 'text-accent' : 'text-primary'
              }`}>
                {offer.discount}
              </div>
              
              <p className={`mb-4 ${
                offer.highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'
              }`}>
                {offer.description}
              </p>
              
              <div className={`text-sm mb-6 ${
                offer.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {offer.validity}
              </div>
              
              <Button 
                variant={offer.highlight ? "accent" : "default"} 
                className="w-full"
              >
                Claim Offer
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            *Terms and conditions apply. Offers subject to availability.
          </p>
          <Button variant="luxury" size="lg">
            View All Offers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;