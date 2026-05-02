import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  receiver_email: string;
  receiver_phone: string;
  receiver_whatsapp: string;
  company_name: string;
}

const ContactInfo = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching settings:', error);
          return;
        }

        setSettings(data);
      } catch (err) {
        console.error('Failed to fetch contact settings:', err);
      }
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-elegant">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in Godrej Majesty project. Please share more details.";
    const whatsappUrl = `https://wa.me/${settings.receiver_whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${settings.receiver_phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${settings.receiver_email}`;
  };

  return (
<div className="bg-card p-6 rounded-xl shadow-elegant">
  <h3 className="text-base font-semibold mb-1 text-foreground">Contact Us Directly</h3>
  <div className="space-y-2">
    <div 
      className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
      onClick={handlePhoneClick}
    >
      <Phone className="h-4 w-4 text-primary" />
      <div>
        <p className="font-medium text-sm text-foreground">Call Now</p>
        <p className="text-xs text-muted-foreground">{settings.receiver_phone}</p>
      </div>
    </div>
    
    <div 
      className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
      onClick={handleWhatsAppClick}
    >
      <MessageCircle className="h-4 w-4 text-green-600" />
      <div>
        <p className="font-medium text-sm text-foreground">WhatsApp</p>
        <p className="text-xs text-muted-foreground">{settings.receiver_whatsapp}</p>
      </div>
    </div>
    
    {/* <div 
      className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
      onClick={handleEmailClick}
    >
      <Mail className="h-4 w-4 text-primary" />
      <div>
        <p className="font-medium text-sm text-foreground">Email</p>
        <p className="text-xs text-muted-foreground">{settings.receiver_email}</p>
      </div>
    </div> */}
  </div>
</div>

  );
};

export default ContactInfo;