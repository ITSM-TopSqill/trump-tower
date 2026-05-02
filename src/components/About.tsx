import { Building, MapPin, Trophy, Users } from "lucide-react";
import luxuryInterior from "@/assets/luxury-interior.jpg";

const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src={luxuryInterior}
                alt="Luxury Interior"
                className="rounded-2xl shadow-luxury w-full"
              />
              <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-elegant">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                About Godrej Majesty
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Godrej Majesty represents the pinnacle of luxury living in Greater Noida West.
                Strategically located in Sector 12, this premium residential project offers
                world-class amenities, contemporary architecture, and unparalleled connectivity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-card rounded-xl shadow-elegant">
                <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Towers</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-elegant">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">1200+</div>
                <div className="text-sm text-muted-foreground">Families</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Prime Location</h3>
                  <p className="text-muted-foreground">
                    Easy access to Delhi NCR, educational institutions, and commercial hubs
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Trophy className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Award-Winning Design</h3>
                  <p className="text-muted-foreground">
                    Contemporary architecture with premium finishes and spacious layouts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;