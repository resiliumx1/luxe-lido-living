ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS preferred_contact text,
  ADD COLUMN IF NOT EXISTS qualification jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS photo_path text;

ALTER TABLE public.enquiries
  ADD CONSTRAINT enquiries_name_length CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT enquiries_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT enquiries_phone_length CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT enquiries_message_length CHECK (char_length(message) BETWEEN 1 AND 3000),
  ADD CONSTRAINT enquiries_property_name_length CHECK (property_name IS NULL OR char_length(property_name) <= 150),
  ADD CONSTRAINT enquiries_preferred_contact_check CHECK (preferred_contact IS NULL OR preferred_contact IN ('whatsapp', 'email', 'call')),
  ADD CONSTRAINT enquiries_photo_path_length CHECK (photo_path IS NULL OR char_length(photo_path) <= 500),
  ADD CONSTRAINT enquiries_qualification_object CHECK (jsonb_typeof(qualification) = 'object');

GRANT INSERT ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

CREATE POLICY "Visitors can upload enquiry photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'enquiry-photos'
  AND (storage.foldername(name))[1] = 'submissions'
  AND lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp')
);

CREATE POLICY "Administrators can view enquiry photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'enquiry-photos');

CREATE POLICY "Administrators can delete enquiry photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'enquiry-photos');