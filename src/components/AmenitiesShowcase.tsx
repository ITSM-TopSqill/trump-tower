import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import amenitiesPool from "@/assets/amenities-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import amenityClubhouse from "@/assets/amenity-clubhouse.jpg";
import amenityKidsPlay from "@/assets/amenity-kids-play.jpg";
import amenityPoolLuxury from "@/assets/amenity-pool-luxury.jpg";
import amenityGymModern from "@/assets/amenity-gym-modern.jpg";
import amenityClubhouseElegant from "@/assets/amenity-clubhouse-elegant.jpg";
import amenityKidsPlayground from "@/assets/amenity-kids-playground.jpg";
import amenityTennisProfessional from "@/assets/amenity-tennis-professional.jpg";
import amenityYogaSerene from "@/assets/amenity-yoga-serene.jpg";
import amenityBusinessModern from "@/assets/amenity-business-modern.jpg";
import amenityPartyElegant from "@/assets/amenity-party-elegant.jpg";

interface AmenityImage {
  amenity_name: string;
  image_path: string;
  alt_text: string;
  is_primary: boolean;
}

const AmenitiesShowcase = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [amenityImages, setAmenityImages] = useState<AmenityImage[]>([]);

  useEffect(() => {
    fetchAmenityImages();
  }, []);

  const fetchAmenityImages = async () => {
    const { data } = await supabase
      .from('amenity_images')
      .select('*')
      .eq('is_primary', true)
      .order('display_order');
    
    if (data) {
      setAmenityImages(data);
    }
  };

  const getImageUrl = (imagePath: string) => {
    // Map database image paths to imported assets
    const imageMap: { [key: string]: string } = {
      'amenities-pool.jpg': amenityPoolLuxury,
      'amenity-gym.jpg': amenityGymModern,
      'amenity-clubhouse.jpg': amenityClubhouseElegant,
      'amenity-kids-play.jpg': amenityKidsPlayground,
      'tennis-court.jpg': amenityTennisProfessional,
      'yoga-deck.jpg': amenityYogaSerene,
      'business-center.jpg': amenityBusinessModern,
      'party-hall.jpg': amenityPartyElegant,
    };
    
    return imageMap[imagePath] || amenityPoolLuxury;
  };

  const amenityCategories = [
    {
      id: "sports",
      title: "Sports & Fitness",
      amenities: [
        { name: "Swimming Pool", image: amenityPoolLuxury, description: "Olympic-sized swimming pool with separate kids pool" },
        { name: "Gymnasium", image: amenityGymModern, description: "State-of-the-art fitness equipment and trainer support" },
        { name: "Yoga Deck", image: amenityYogaSerene, description: "Peaceful outdoor yoga and meditation space" },
        { name: "Badminton Court", image: amenitiesPool, description: "Indoor badminton court with professional flooring" },
        { name: "Tennis Court", image: amenityTennisProfessional, description: "Full-size tennis court with flood lights" }
      ]
    },
    {
      id: "lifestyle",
      title: "Lifestyle",
      amenities: [
        { name: "Clubhouse", image: amenityClubhouseElegant, description: "Premium clubhouse with multiple recreational activities" },
        { name: "Party Hall", image: amenityPartyElegant, description: "Elegant banquet hall for celebrations and events" },
        { name: "Library", image: amenityBusinessModern, description: "Well-stocked library with comfortable reading areas" },
        { name: "Business Center", image: amenityBusinessModern, description: "Professional workspace with meeting rooms" },
        { name: "Multipurpose Hall", image: amenityClubhouseElegant, description: "Versatile space for community gatherings" }
      ]
    },
    {
      id: "family",
      title: "Family & Kids",
      amenities: [
        { name: "Kids Play Area", image: amenityKidsPlayground, description: "Safe and colorful playground for children" },
        { name: "Toddler Pool", image: amenityPoolLuxury, description: "Shallow pool designed specifically for toddlers" },
        { name: "Day Care Center", image: amenityKidsPlayground, description: "Professional childcare services for working parents" },
        { name: "Senior Citizen Area", image: amenityYogaSerene, description: "Dedicated relaxation space for elderly residents" },
        { name: "Pet Park", image: amenityKidsPlayground, description: "Designated area for pets with play equipment" }
      ]
    },
    {
      id: "convenience",
      title: "Convenience",
      amenities: [
        { name: "24/7 Security", image: amenityBusinessModern, description: "Round-the-clock security with CCTV surveillance" },
        { name: "Power Backup", image: amenityBusinessModern, description: "100% power backup for common areas and lifts" },
        { name: "High-Speed Elevators", image: amenityClubhouseElegant, description: "Modern elevators with emergency backup" },
        { name: "Water Treatment Plant", image: amenityPoolLuxury, description: "24/7 treated water supply throughout the complex" },
        { name: "Waste Management", image: amenityBusinessModern, description: "Eco-friendly waste segregation and management" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a lifestyle of luxury with our comprehensive range of amenities designed 
            for your comfort, convenience, and entertainment.
          </p>
        </div>
        
        <Tabs defaultValue="sports" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 md:mb-12 h-auto p-1">
            {amenityCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {amenityCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {category.amenities.map((amenity, index) => (
                  <div 
                    key={amenity.name}
                    className="group bg-card rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {amenity.image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={amenity.image} 
                          alt={amenity.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedImage(amenity.image!)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-luxury flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {amenity.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {amenity.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            And many more amenities to enhance your living experience
          </p>
          <Button variant="luxury" size="lg">
            Schedule Amenity Tour
          </Button>
        </div> */}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Amenity" 
              className="w-full h-full object-contain rounded-lg"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AmenitiesShowcase;