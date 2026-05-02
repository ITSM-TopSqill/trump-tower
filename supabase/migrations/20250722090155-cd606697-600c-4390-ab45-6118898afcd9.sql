-- Create storage buckets for different content types
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('gallery-images', 'gallery-images', true),
  ('videos', 'videos', true),
  ('brochures', 'brochures', true),
  ('amenity-images', 'amenity-images', true);

-- Create content management tables
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video')),
  category TEXT NOT NULL DEFAULT 'general',
  thumbnail_path TEXT,
  file_size BIGINT,
  duration TEXT, -- for videos
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

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

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brochures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenity_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Anyone can view brochures" ON public.brochures FOR SELECT USING (true);
CREATE POLICY "Anyone can view amenity images" ON public.amenity_images FOR SELECT USING (true);

-- Create storage policies
CREATE POLICY "Public gallery images access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Public videos access" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Public brochures access" ON storage.objects FOR SELECT USING (bucket_id = 'brochures');
CREATE POLICY "Public amenity images access" ON storage.objects FOR SELECT USING (bucket_id = 'amenity-images');

-- Admin upload policies (can be customized later for specific admin users)
CREATE POLICY "Allow upload to gallery images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Allow upload to videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Allow upload to brochures" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'brochures');
CREATE POLICY "Allow upload to amenity images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'amenity-images');

-- Create triggers for updated_at
CREATE TRIGGER update_gallery_items_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_brochures_updated_at
BEFORE UPDATE ON public.brochures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_amenity_images_updated_at
BEFORE UPDATE ON public.amenity_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample amenity images data
INSERT INTO public.amenity_images (amenity_name, image_path, alt_text, is_primary, display_order) VALUES
('Swimming Pool', 'amenities-pool.jpg', 'Luxury swimming pool with clear blue water', true, 1),
('Gymnasium', 'amenity-gym.jpg', 'State-of-the-art fitness center', true, 2),
('Clubhouse', 'amenity-clubhouse.jpg', 'Modern clubhouse interior', true, 3),
('Kids Play Area', 'amenity-kids-play.jpg', 'Safe and fun kids play area', true, 4),
('Tennis Court', 'tennis-court.jpg', 'Professional tennis court', true, 5),
('Yoga Deck', 'yoga-deck.jpg', 'Peaceful yoga and meditation space', true, 6),
('Business Center', 'business-center.jpg', 'Professional business center', true, 7),
('Party Hall', 'party-hall.jpg', 'Elegant party and event hall', true, 8);