-- Site settings for photo manager
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site_settings"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can manage site_settings"
  ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (key, value) VALUES
  ('hero_image', ''),
  ('agent_photo', ''),
  ('lifestyle_image_1', ''),
  ('lifestyle_image_2', ''),
  ('lifestyle_image_3', ''),
  ('neighborhood_english-harbour_image', ''),
  ('neighborhood_jolly-harbour_image', ''),
  ('neighborhood_dickenson-bay_image', ''),
  ('neighborhood_galley-bay_image', ''),
  ('neighborhood_hodges-bay_image', ''),
  ('about_banner', ''),
  ('contact_banner', '')
ON CONFLICT (key) DO NOTHING;

-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  location text NOT NULL,
  area text NOT NULL,
  beds integer NOT NULL DEFAULT 0,
  baths integer NOT NULL DEFAULT 0,
  sqft text,
  parking integer,
  pool boolean DEFAULT false,
  type text NOT NULL DEFAULT 'luxury',
  description text NOT NULL DEFAULT '',
  features text[] DEFAULT '{}',
  image_urls text[] DEFAULT '{}',
  badge text,
  category_href text DEFAULT '/luxury-homes',
  featured boolean DEFAULT false,
  new_listing boolean DEFAULT false,
  status text DEFAULT 'active',
  google_maps_url text,
  virtual_tour_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read properties"
  ON public.properties FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can manage properties"
  ON public.properties FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  property_id uuid,
  property_name text,
  status text DEFAULT 'unread',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert enquiries"
  ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can manage enquiries"
  ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Viewings table
CREATE TABLE IF NOT EXISTS public.viewings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  method text NOT NULL,
  preferred_date date NOT NULL,
  message text,
  property_name text,
  property_id uuid,
  status text DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.viewings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert viewings"
  ON public.viewings FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can manage viewings"
  ON public.viewings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can manage leads"
  ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public can read site-images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated can upload site-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated can update site-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated can delete site-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Public can read property-images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated can upload property-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated can update property-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated can delete property-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'property-images');