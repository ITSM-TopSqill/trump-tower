
-- Recreate schema for remixed project
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  form_type TEXT DEFAULT 'general',
  agreement BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Only service role can read leads" ON public.leads FOR SELECT USING (false);
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  receiver_email TEXT NOT NULL DEFAULT 'info@topsqill.com',
  receiver_phone TEXT NOT NULL DEFAULT '+91-7496016040',
  receiver_whatsapp TEXT NOT NULL DEFAULT '+91-7496016040',
  company_name TEXT NOT NULL DEFAULT 'Trump Tower Sales Team',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
INSERT INTO public.site_settings (company_name) VALUES ('Trump Tower Sales Team');
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image','video')),
  category TEXT NOT NULL DEFAULT 'general',
  thumbnail_path TEXT,
  file_size BIGINT,
  duration TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert gallery items" ON public.gallery_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update gallery items" ON public.gallery_items FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete gallery items" ON public.gallery_items FOR DELETE USING (true);
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.brochures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.brochures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view brochures" ON public.brochures FOR SELECT USING (true);
CREATE POLICY "Anyone can insert brochures" ON public.brochures FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update brochures" ON public.brochures FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete brochures" ON public.brochures FOR DELETE USING (true);
CREATE TRIGGER update_brochures_updated_at BEFORE UPDATE ON public.brochures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.amenity_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  amenity_name TEXT NOT NULL,
  image_path TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.amenity_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view amenity images" ON public.amenity_images FOR SELECT USING (true);
CREATE POLICY "Anyone can insert amenity images" ON public.amenity_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update amenity images" ON public.amenity_images FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete amenity images" ON public.amenity_images FOR DELETE USING (true);
CREATE TRIGGER update_amenity_images_updated_at BEFORE UPDATE ON public.amenity_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.pdfs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pdfs" ON public.pdfs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert pdfs" ON public.pdfs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update pdfs" ON public.pdfs FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete pdfs" ON public.pdfs FOR DELETE USING (true);
CREATE TRIGGER update_pdfs_updated_at BEFORE UPDATE ON public.pdfs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('gallery-images','gallery-images',true),
  ('videos','videos',true),
  ('brochures','brochures',true),
  ('amenity-images','amenity-images',true),
  ('pdfs','pdfs',true);

CREATE POLICY "Public read gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Public read videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Public read brochures" ON storage.objects FOR SELECT USING (bucket_id = 'brochures');
CREATE POLICY "Public read amenity images" ON storage.objects FOR SELECT USING (bucket_id = 'amenity-images');
CREATE POLICY "Public read pdfs" ON storage.objects FOR SELECT USING (bucket_id = 'pdfs');
CREATE POLICY "Public upload gallery images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Public upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Public upload brochures" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'brochures');
CREATE POLICY "Public upload amenity images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'amenity-images');
CREATE POLICY "Public upload pdfs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'pdfs');
CREATE POLICY "Public update pdfs" ON storage.objects FOR UPDATE USING (bucket_id = 'pdfs');
CREATE POLICY "Public delete pdfs" ON storage.objects FOR DELETE USING (bucket_id = 'pdfs');
