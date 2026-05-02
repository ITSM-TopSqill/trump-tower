import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Home, Square } from "lucide-react";
import floorPlan3BHK from "@/assets/floor-plan-3bhk.jpg";
import floorPlan4BHK from "@/assets/floor-plan-4bhk.jpg";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import new3BHK1 from "@/assets/3BHK1.png";
import new3BHK2 from "@/assets/3BHK2.png";
import new4BHK1 from "@/assets/4BHK1.png";
import new4BHK2 from "@/assets/4BHK2.png";

interface Plan {
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


const FloorPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const floorPlans = [
    {
      id: "3bhk",
      title: "3 BHK",
      subtitle: "Premium Apartments",
      area: "1993 Sq. Ft.",
      price: "₹2.90 Cr – ₹3.20 Cr",
      image: new3BHK1,
      features: [
        "3 Spacious Bedrooms",
        "2 Modern Bathrooms",
        "Large Living & Dining",
        "Modular Kitchen",
        "2 Balconies",
        "Servant Room"
      ],
      specifications: {
        "Carpet Area": "1993 Sq. Ft.",
        "Bedrooms": "3",
        "Bathrooms": "2",
        "Balconies": "2"
      }
    },
    {
      id: "3bhk-study",
      title: "3 BHK + Study",
      subtitle: "Executive Apartments",
      area: "2368 Sq. Ft.",
      price: "₹3.29 Cr – ₹3.72 Cr",
      image: new3BHK2,
      features: [
        "3 Spacious Bedrooms",
        "Dedicated Study Room",
        "3 Modern Bathrooms",
        "Premium Living & Dining",
        "Designer Kitchen",
        "3 Balconies"
      ],
      specifications: {
        "Carpet Area": "2368 Sq. Ft.",
        "Bedrooms": "3 + Study",
        "Bathrooms": "3",
        "Balconies": "3"
      }
    },
    {
      id: "4bhk",
      title: "4 BHK",
      subtitle: "Luxury Apartments",
      area: "2757 Sq. Ft.",
      price: "₹3.56 Cr – ₹4.19 Cr",
      image: new4BHK1,
      features: [
        "4 Master Bedrooms",
        "4 Attached Bathrooms",
        "Expansive Living Areas",
        "Premium Kitchen",
        "3 Large Balconies",
        "Utility Room"
      ],
      specifications: {
        "Carpet Area": "2757 Sq. Ft.",
        "Bedrooms": "4",
        "Bathrooms": "4",
        "Balconies": "3"
      }
    },
    {
      id: "4bhk-study",
      title: "4 BHK + Study",
      subtitle: "Luxury Apartments",
      area:"2799 Sq. Ft.",
      price: " ₹3.96 Cr – ₹4.48 Cr",
      image: new4BHK2,
      features: [
        "4 Master Bedrooms",
        "Dedicated Study Room",
        "4 Attached Bathrooms",
        "Expansive Living Areas",
        "Premium Kitchen",
        "3 Large Balconies",
        "Utility Room"
      ],
      specifications: {
        "Carpet Area": "2799 Sq. Ft.",
        "Bedrooms": "4",
        "Bathrooms": "4",
        "Balconies": "3"
      }
    }
  ];


  const [pdf, setPdf] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const { data, error } = await supabase
        .from('pdfs')
        .select('*')
        .order('display_order')
        .limit(1)
        .single(); // since you said there's only one

      if (data) {
        setPdf(data);
      }
    };

    fetchPdf();
  }, []);
const downloadPdf = async () => {
  if (!pdf) {
    toast({
      title: "Download Failed",
      description: "PDF not found.",
      variant: "destructive",
    });
    return;
  }

  // Increment download count
  const { error: updateError } = await supabase
    .from('pdfs')
    .update({ download_count: pdf.download_count + 1 })
    .eq('id', pdf.id);

  if (updateError) {
    toast({
      title: "Error",
      description: "Failed to update download count.",
      variant: "destructive",
    });
  }

  // Get public URL from Supabase storage
  const { data: fileData } = supabase.storage
    .from('pdfs')
    .getPublicUrl(pdf.file_path);

  if (!fileData?.publicUrl) {
    toast({
      title: "Download Failed",
      description: "Unable to fetch PDF URL.",
      variant: "destructive",
    });
    return;
  }

  // Open the PDF in a new tab
  window.open(fileData.publicUrl, '_blank');

  toast({
    title: "Download Started",
    description: "Your floor plan is opening in a new tab.",
  });
};

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Floor Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our thoughtfully designed floor plans that maximize space utilization
            while ensuring optimal ventilation and natural light.
          </p>
        </div>

        <Tabs defaultValue="3bhk" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 md:mb-12 max-w-lg mx-auto h-auto p-1">
            {floorPlans.map((plan) => (
              <TabsTrigger key={plan.id} value={plan.id} className="text-sm">
                {plan.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {floorPlans.map((plan) => (
            <TabsContent key={plan.id} value={plan.id}>
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
                <div className="space-y-6">
                  <div className="bg-card p-4 md:p-6 lg:p-8 rounded-xl shadow-elegant">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                          {plan.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted-foreground mb-4">
                          {plan.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                          <div className="flex items-center">
                            <Square className="h-5 w-5 text-primary mr-2" />
                            <span className="text-sm text-muted-foreground">
                              {plan.area} sq.ft
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Home className="h-5 w-5 text-primary mr-2" />
                            <span className="font-semibold text-primary">
                              {plan.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">
                          Specifications
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(plan.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-border">
                              <span className="text-sm text-muted-foreground">{key}</span>
                              <span className="text-sm font-medium text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => setSelectedPlan(plan.image)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Floor Plan
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={downloadPdf}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>

                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-card p-6 rounded-xl shadow-elegant">
                    <img
                      src={plan.image}
                      alt={`${plan.title} Floor Plan`}
                      className="w-full h-auto rounded-lg cursor-pointer hover:shadow-luxury transition-shadow duration-300"
                      onClick={() => setSelectedPlan(plan.image)}
                    />
                    <div className="absolute top-8 right-8">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedPlan(plan.image)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            All dimensions are approximate and subject to final approval.
            Furniture shown is for representation purposes only.
          </p>
        </div>
      </div>

      {/* Floor Plan Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlan(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={selectedPlan}
              alt="Floor Plan"
              className="w-full h-full object-contain rounded-lg"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedPlan(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FloorPlans;