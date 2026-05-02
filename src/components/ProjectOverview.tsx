import { Building2, MapPin, Trophy, Calendar, IndianRupee } from "lucide-react";
import LeadForm from "./LeadForm";

const ProjectOverview = () => {
  const highlights = [
    {
      icon: Building2,
      title: "3 & 4 BHK",
      description: "Ultra Luxury Apartments"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Sector 12, Greater Noida West"
    },
    {
      icon: Trophy,
      title: "Premium Towers",
      description: "12 Towers with World-Class Amenities"
    },
    {
      icon: Calendar,
      title: "Ready to Move",
      description: "Possession by 2030"
    },
    // {
    //   icon: IndianRupee,
    //   title: "Starting from",
    //   description: "₹45 Lakhs onwards"
    // }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-1 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Godrej Majesty stands as a testament to luxury living in Greater Noida West.
                Strategically located in Sector 12, this premium residential project offers
                an unprecedented lifestyle experience with meticulously designed 3 & 4 BHK
                apartments that redefine modern living standards.
              </p>

              <div className="prose prose-lg max-w-none text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>12 premium towers with over 1200+ luxury apartments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Excellent connectivity to Delhi NCR via FNG Expressway</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Close proximity to metro stations, schools, and hospitals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>World-class amenities including swimming pool, gym, and clubhouse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Environment-friendly design with 70% open green spaces</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-card p-6 rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="lg:col-span-1">
            <LeadForm 
              title="Get Project Details"
              subtitle="Fill the form to receive complete information"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;