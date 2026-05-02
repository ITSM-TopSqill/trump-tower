import { Building, Award, Users, Calendar, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutBuilder = () => {
  const achievements = [
    {
      icon: Building,
      number: "250+",
      title: "Projects Delivered",
      subtitle: "Across India"
    },
    {
      icon: Users,
      number: "2.5 Lakh+",
      title: "Happy Families",
      subtitle: "Living in Godrej Homes"
    },
    {
      icon: Calendar,
      number: "125+",
      title: "Years of Trust",
      subtitle: "Legacy Since 1897"
    },
    {
      icon: Trophy,
      number: "500+",
      title: "Awards Won",
      subtitle: "Industry Recognition"
    }
  ];

  const awards = [
    {
      title: "Best Residential Project",
      organization: "CREDAI Awards 2023",
      category: "Innovation in Design"
    },
    {
      title: "Developer of the Year",
      organization: "Times Real Estate Awards 2023",
      category: "Affordable Housing"
    },
    {
      title: "Green Building Certification",
      organization: "IGBC Gold Rating",
      category: "Sustainability"
    },
    {
      title: "Customer Choice Award",
      organization: "Housing Awards 2022",
      category: "Customer Satisfaction"
    }
  ];

  const keyHighlights = [
    "One of India's most trusted real estate developers",
    "Part of the prestigious Godrej Group conglomerate",
    "Strong focus on sustainable and green construction",
    "Commitment to timely delivery and quality construction",
    "Innovation in design and customer-centric approach",
    "Strong financial backing and transparent business practices"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About Godrej Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A legacy of trust, innovation, and excellence in real estate development. 
            Godrej Properties is committed to creating sustainable and contemporary spaces 
            that enhance the quality of life for our customers.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Our Legacy
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Godrej Properties Limited is the real estate arm of the Godrej Group, one of 
                India's most trusted business conglomerates. With over 125 years of excellence 
                and a strong legacy of trust, we have been transforming the Indian real estate 
                landscape with our innovative projects and customer-centric approach.
              </p>
              
              <div className="space-y-3">
                {keyHighlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="flex items-start animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Star className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-elegant">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Our Commitment
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "At Godrej Properties, we believe in creating not just homes, but communities 
                that foster happiness, well-being, and sustainability. Our commitment to quality, 
                innovation, and customer satisfaction drives everything we do."
              </p>
              <div className="mt-4 text-right">
                <p className="text-sm font-medium text-primary">- Godrej Properties Leadership</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.title}
                  className="bg-card p-6 rounded-xl shadow-elegant text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement.subtitle}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-elegant">
              <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Award className="h-6 w-6 text-primary mr-2" />
                Recent Awards & Recognition
              </h4>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div 
                    key={index}
                    className="border-l-4 border-primary pl-4 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h5 className="font-semibold text-foreground text-sm">{award.title}</h5>
                    <p className="text-xs text-muted-foreground">{award.organization}</p>
                    <p className="text-xs text-primary">{award.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-luxury p-8 rounded-2xl text-center text-primary-foreground">
          <h3 className="text-2xl font-bold mb-4">
            Why Choose Godrej Properties?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
            Join the family of 2.5 lakh+ satisfied customers who have made Godrej Properties 
            their trusted partner in finding their dream homes. Experience the difference of 
            working with India's most trusted real estate developer.
          </p>
          <Button variant="accent" size="lg">
            Learn More About Godrej Group
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilder;