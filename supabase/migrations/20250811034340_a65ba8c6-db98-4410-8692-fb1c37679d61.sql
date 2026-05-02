-- Add interested_in column to leads table to store array of BHK preferences
ALTER TABLE public.leads 
ADD COLUMN interested_in text[] DEFAULT ARRAY[]::text[];