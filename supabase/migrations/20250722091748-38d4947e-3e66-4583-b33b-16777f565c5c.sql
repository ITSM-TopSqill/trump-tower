-- Add INSERT policies for content management
CREATE POLICY "Anyone can insert gallery items" 
ON public.gallery_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert brochures" 
ON public.brochures 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert amenity images" 
ON public.amenity_images 
FOR INSERT 
WITH CHECK (true);

-- Add UPDATE policies for content management
CREATE POLICY "Anyone can update gallery items" 
ON public.gallery_items 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can update brochures" 
ON public.brochures 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can update amenity images" 
ON public.amenity_images 
FOR UPDATE 
USING (true);

-- Add DELETE policies for content management
CREATE POLICY "Anyone can delete gallery items" 
ON public.gallery_items 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can delete brochures" 
ON public.brochures 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can delete amenity images" 
ON public.amenity_images 
FOR DELETE 
USING (true);

-- Create PDFs table
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

-- Enable RLS on PDFs table
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;

-- Create policies for PDFs
CREATE POLICY "Anyone can view pdfs" 
ON public.pdfs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert pdfs" 
ON public.pdfs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update pdfs" 
ON public.pdfs 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete pdfs" 
ON public.pdfs 
FOR DELETE 
USING (true);

-- Create PDFs storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pdfs', 'pdfs', true);

-- Create policies for PDFs storage
CREATE POLICY "Anyone can view PDFs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdfs');

CREATE POLICY "Anyone can upload PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdfs');

CREATE POLICY "Anyone can update PDFs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pdfs');

CREATE POLICY "Anyone can delete PDFs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdfs');