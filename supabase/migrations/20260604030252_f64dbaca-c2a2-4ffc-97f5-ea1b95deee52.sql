CREATE TABLE public.service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  request_type text NOT NULL CHECK (request_type IN ('container_order','trailer_build')),
  status text NOT NULL DEFAULT 'new',
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  preferred_contact text CHECK (preferred_contact IN ('whatsapp','email','call')),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  estimated_total numeric,
  currency text,
  also_interested text[] NOT NULL DEFAULT '{}'::text[],
  notes text
);

GRANT INSERT ON public.service_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requests TO authenticated;
GRANT ALL ON public.service_requests TO service_role;

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a service request"
  ON public.service_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service_requests"
  ON public.service_requests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX service_requests_created_at_idx ON public.service_requests (created_at DESC);
CREATE INDEX service_requests_type_status_idx ON public.service_requests (request_type, status);