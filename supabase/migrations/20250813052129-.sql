-- Remove the overly permissive policy that allows public read access to leads
DROP POLICY IF EXISTS "Service can read leads" ON public.leads;

-- Create a more secure policy that only allows service role to read leads
-- This ensures edge functions can still access the data for notifications
-- but public users cannot read sensitive customer information
CREATE POLICY "Only service role can read leads" 
ON public.leads 
FOR SELECT 
USING (false); -- No public access, only service role can bypass this