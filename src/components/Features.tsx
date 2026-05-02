import { Shield, Car, Wifi, Dumbbell, Trees, Baby } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Advanced security systems with CCTV monitoring and trained personnel"
    },
    {
      icon: Car,
      title: "Reserved Parking",
      description: "Dedicated parking spaces for each unit with visitor parking available"
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Fiber optic connectivity throughout the complex for seamless connectivity"
    },
    {
      icon: Dumbbell,
      title: "Modern Gymnasium",
      description: "Fully equipped fitness center with latest equipment and trainer support"
    },
    {
      icon: Trees,
      title: "Landscaped Gardens",
      description: "Beautifully designed green spaces and gardens for peaceful living"
    },
    {
      icon: Baby,
      title: "Kids Play Area",
      description: "Safe and fun play zones designed specifically for children"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience luxury living with our premium amenities designed for your comfort and convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card p-6 rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;