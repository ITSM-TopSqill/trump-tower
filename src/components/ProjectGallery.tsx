import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Play, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useInquiryModal } from "@/contexts/InquiryModalContext";
import heroImage from "@/assets/hero-building.jpg";
import luxuryInterior from "@/assets/luxury-interior.jpg";
import amenitiesPool from "@/assets/amenities-pool.jpg";
import sitePlan from "@/assets/site-plan.jpg";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  category: string;
  thumbnail_path?: string;
  duration?: string;
  is_featured: boolean;
  file_size?: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Brochure {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_size?: number;
  download_count: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const { showModalForAction, isSubmitted } = useInquiryModal();

  useEffect(() => {
    fetchGalleryItems();
    fetchBrochures();
  }, []);

  const fetchGalleryItems = async () => {
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order');
    
    if (data) {
      setGalleryItems(data);
    }
  };

  const fetchBrochures = async () => {
    const { data } = await supabase
      .from('brochures')
      .select('*')
      .order('display_order');
    
    if (data) {
      setBrochures(data);
    }
  };

  const getFileUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  // const downloadBrochure = async (brochure: Brochure) => {
  //   // Increment download count
  //   await supabase
  //     .from('brochures')
  //     .update({ download_count: brochure.download_count + 1 })
  //     .eq('id', brochure.id);
    
  //   // Download file
  //   const url = getFileUrl('brochures', brochure.file_path);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = brochure.title;
  //   link.click();
  // };

  const downloadBrochure = async (brochure: Brochure) => {
  // Increment download count
  await supabase
    .from('brochures')
    .update({ download_count: brochure.download_count + 1 })
    .eq('id', brochure.id);

  // Get public URL
  const { data } = supabase
    .storage
    .from('brochures')
    .getPublicUrl(brochure.file_path);

  if (!data?.publicUrl) {
    alert('Failed to get file URL.');
    return;
  }

  // Trigger download properly
  const link = document.createElement('a');
  link.href = data.publicUrl;
  link.setAttribute('download', brochure.title || 'brochure.pdf');
  link.setAttribute('target', '_blank'); // optional fallback
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const galleryCategories = [
    {
      id: "exterior",
      title: "Exterior Views",
      images: [
        { src: heroImage, alt: "Building Exterior", title: "Main Tower View" },
        { src: heroImage, alt: "Landscape", title: "Landscaped Gardens" },
        { src: heroImage, alt: "Entrance", title: "Grand Entrance" },
        { src: heroImage, alt: "Parking", title: "Parking Area" }
      ]
    },
    {
      id: "interior",
      title: "Interior Design",
      images: [
        { src: luxuryInterior, alt: "Living Room", title: "Premium Living Room" },
        { src: luxuryInterior, alt: "Kitchen", title: "Modular Kitchen" },
        { src: luxuryInterior, alt: "Bedroom", title: "Master Bedroom" },
        { src: luxuryInterior, alt: "Bathroom", title: "Designer Bathroom" }
      ]
    },
    {
      id: "amenities",
      title: "Amenities",
      images: [
        { src: amenitiesPool, alt: "Swimming Pool", title: "Swimming Pool" },
        { src: amenitiesPool, alt: "Gym", title: "Fitness Center" },
        { src: amenitiesPool, alt: "Clubhouse", title: "Clubhouse" },
        { src: amenitiesPool, alt: "Garden", title: "Landscaped Gardens" }
      ]
    },
    {
      id: "lifestyle",
      title: "Lifestyle",
      images: [
        { src: luxuryInterior, alt: "Family Time", title: "Family Living" },
        { src: amenitiesPool, alt: "Recreation", title: "Recreation Area" },
        { src: luxuryInterior, alt: "Social", title: "Social Spaces" },
        { src: amenitiesPool, alt: "Wellness", title: "Wellness Zone" }
      ]
    },
    {
      id: "sitemap",
      title: "Site Plan",
      images: [
        { src: sitePlan, alt: "Master Plan", title: "Master Site Plan" },
        { src: sitePlan, alt: "Layout", title: "Tower Layout" },
        { src: sitePlan, alt: "Landscape Plan", title: "Landscape Plan" },
        { src: sitePlan, alt: "Development Plan", title: "Development Plan" }
      ]
    }
  ];

  const videos = [
    {
      id: "walkthrough",
      title: "Virtual Walkthrough",
      thumbnail: heroImage,
      duration: "3:45"
    },
    {
      id: "amenities",
      title: "Amenities Tour",
      thumbnail: amenitiesPool,
      duration: "2:30"
    },
    {
      id: "location",
      title: "Location Highlights",
      thumbnail: sitePlan,
      duration: "1:45"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour through Godrej Majesty and experience the luxury, 
            comfort, and lifestyle that awaits you.
          </p>
        </div>
        
        {/* <Tabs defaultValue="exterior" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12">
            {galleryCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {galleryCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.images.map((image, index) => (
                  <div 
                    key={image.title}
                    className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 cursor-pointer animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-primary-foreground">
                        <Eye className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-semibold">{image.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs> */}
        
        {/* Video Gallery Section */}
        <div className="mt-20">
          {/* <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Video Walkthrough
          </h3> */}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.filter(item => item.file_type === 'video').length > 0 
              ? galleryItems.filter(item => item.file_type === 'video').map((video, index) => (
                <div 
                  key={video.id}
                  className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                   onClick={() => {
                     if (isSubmitted) {
                       setSelectedVideo(video.id);
                     } else {
                       showModalForAction(() => setSelectedVideo(video.id));
                     }
                   }}
                >
                  <div className="aspect-video overflow-hidden">
                    <video 
                      src={getFileUrl('videos', video.file_path)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-primary-foreground">
                    <h4 className="font-semibold">{video.title}</h4>
                    <p className="text-sm opacity-80">{video.duration}</p>
                  </div>
                </div>
              ))
              : videos.map((video, index) => (
                <div 
                  key={video.id}
                  className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                   onClick={() => {
                     if (isSubmitted) {
                       setSelectedVideo(video.id);
                     } else {
                       showModalForAction(() => setSelectedVideo(video.id));
                     }
                   }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-primary-foreground">
                    <h4 className="font-semibold">{video.title}</h4>
                    <p className="text-sm opacity-80">{video.duration}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        
        {/* <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {brochures.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {brochures.slice(0, 3).map((brochure) => (
                  <Button 
                    key={brochure.id}
                    variant="outline" 
                    size="lg"
                    onClick={() => downloadBrochure(brochure)}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {brochure.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Gallery" 
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
      
      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              {galleryItems.find(item => item.id === selectedVideo) ? (
                <video 
                  src={getFileUrl('videos', galleryItems.find(item => item.id === selectedVideo)?.file_path || '')}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Video Player Placeholder</p>
                  <p className="text-sm">Integration with video service needed</p>
                </div>
              )}
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;