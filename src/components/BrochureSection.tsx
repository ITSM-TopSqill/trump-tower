import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle } from "lucide-react";
import LeadForm from "./LeadForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

const BrochureSection = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const [brochures, setBrochures] = useState<Brochure[]>([]);

  const brochureFeatures = [
    "Complete project details and specifications",
    "Floor plans for all apartment configurations",
    "Amenities overview with high-quality images",
    "Location advantages and connectivity details",
    "Pricing information and payment plans",
    "Legal information and RERA details"
  ];

  const handleDownload = () => {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    // Simulate brochure download
    toast({
      title: "Brochure Downloaded!",
      description: "The project brochure has been downloaded to your device.",
    });
  };

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    const { data } = await supabase
      .from('brochures')
      .select('*')
      .order('display_order');

    if (data) {
      setBrochures(data);
    }
  };
  const downloadBrochure = async (brochure: Brochure) => {
    try {
      // Increment download count
      const { error: updateError } = await supabase
        .from('brochures')
        .update({ download_count: brochure.download_count + 1 })
        .eq('id', brochure.id);

      if (updateError) {
        alert('Failed to update download count.');
        return;
      }

      // Get public URL
      const { data } = supabase
        .storage
        .from('brochures')
        .getPublicUrl(brochure.file_path);

      if (!data?.publicUrl) {
        alert('Failed to get brochure file URL.');
        return;
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.setAttribute('download', brochure.title || 'brochure.pdf');

      // Force open in a new tab (good fallback for mobile/Chrome blocking issues)
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Unexpected error occurred during download.');
      console.error(err);
    }
  };


  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Download Project Brochure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get complete information about Godrej Majesty including floor plans,
                amenities, pricing, and location advantages. Our comprehensive brochure
                contains everything you need to make an informed decision.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                What's included in the brochure:
              </h3>
              <div className="space-y-3">
                {brochureFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-elegant">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Digital Brochure</h4>
                  <p className="text-sm text-muted-foreground">PDF Format • 15.2 MB • 32 Pages</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center mb-4">Download Brochure</h3>

              {brochures.length > 0 ? (
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
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No brochures available.
                </p>
              )}


            </div>
          </div>

          <div className="relative">
            {showForm ? (
              <div className="animate-fade-in">
                <LeadForm
                  title="Download Brochure"
                  subtitle="Get instant access to complete project details"
                />
              </div>
            ) : (
              <div className="bg-card p-8 rounded-xl shadow-luxury animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Project Brochure</p>
                    <p className="text-sm">Complete Details Inside</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Click "Download Brochure" to access the complete project information
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            By downloading the brochure, you agree to receive updates about the project.
            We respect your privacy and won't spam you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;