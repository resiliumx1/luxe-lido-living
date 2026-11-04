CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  enquiry_id uuid,
  title text NOT NULL,
  client_name text NOT NULL,
  client_email text,
  client_phone text,
  service_type text,
  location text,
  status text NOT NULL DEFAULT 'assessment',
  budget_usd numeric,
  spent_usd numeric NOT NULL DEFAULT 0,
  start_date date,
  target_date date,
  notes text,
  photo_paths text[] NOT NULL DEFAULT '{}'
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE UNIQUE INDEX projects_enquiry_id_key ON public.projects(enquiry_id) WHERE enquiry_id IS NOT NULL;