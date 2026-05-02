import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-building.jpg";
import luxuryInterior from "@/assets/luxury-interior.jpg";
import amenitiesPool from "@/assets/amenities-pool.jpg";

const Gallery = () => {
  const images = [
    { src: heroImage, alt: "Building Exterior", title: "Modern Architecture" },
    { src: luxuryInterior, alt: "Luxury Interior", title: "Premium Interiors" },
    { src: amenitiesPool, alt: "Swimming Pool", title: "World-Class Amenities" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Project Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of Godrej Majesty and explore the luxury that awaits
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <div 
              key={image.title}
              className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="luxury" size="lg" className="text-lg px-8 py-4">
            View Complete Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;