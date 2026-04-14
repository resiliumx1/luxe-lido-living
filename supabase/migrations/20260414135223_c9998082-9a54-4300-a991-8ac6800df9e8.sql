CREATE TABLE public.container_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  product_id text NOT NULL,
  product_name text NOT NULL,
  selected_addons jsonb,
  total_price_usd numeric,
  use_case text,
  site_situation text,
  contact_name text,
  contact_email text,
  contact_whatsapp text,
  parish text,
  timeline text,
  status text DEFAULT 'new'
);

ALTER TABLE public.container_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert container_leads"
ON public.container_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage container_leads"
ON public.container_leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);