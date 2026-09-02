-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin')
$$;

create policy "Users can read their own roles"
on public.user_roles for select to authenticated
using (user_id = auth.uid());

create policy "Admins can read all roles"
on public.user_roles for select to authenticated
using (public.is_admin());

create policy "Admins can manage roles"
on public.user_roles for all to authenticated
using (public.is_admin()) with check (public.is_admin());

-- One-time bootstrap: first signed-in account can claim admin while none exists
create or replace function public.claim_admin_if_none()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    return false;
  end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(uid, 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin')
  on conflict do nothing;
  return true;
end;
$$;

grant execute on function public.claim_admin_if_none() to authenticated;

-- Tighten table policies: replace blanket "authenticated" access with admin-only
drop policy if exists "Authenticated users can manage enquiries" on public.enquiries;
create policy "Admins can manage enquiries" on public.enquiries
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage viewings" on public.viewings;
create policy "Admins can manage viewings" on public.viewings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage leads" on public.leads;
create policy "Admins can manage leads" on public.leads
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage container_leads" on public.container_leads;
create policy "Admins can manage container_leads" on public.container_leads
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage service_requests" on public.service_requests;
create policy "Admins can manage service_requests" on public.service_requests
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage properties" on public.properties;
create policy "Admins can manage properties" on public.properties
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated users can manage site_settings" on public.site_settings;
create policy "Admins can manage site_settings" on public.site_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage: admin-only access to enquiry photos and image management
drop policy if exists "Administrators can view enquiry photos" on storage.objects;
create policy "Administrators can view enquiry photos" on storage.objects
for select to authenticated using (bucket_id = 'enquiry-photos' and public.is_admin());

drop policy if exists "Administrators can delete enquiry photos" on storage.objects;
create policy "Administrators can delete enquiry photos" on storage.objects
for delete to authenticated using (bucket_id = 'enquiry-photos' and public.is_admin());

drop policy if exists "Authenticated can upload property-images" on storage.objects;
create policy "Admins can upload property-images" on storage.objects
for insert to authenticated with check (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "Authenticated can update property-images" on storage.objects;
create policy "Admins can update property-images" on storage.objects
for update to authenticated using (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "Authenticated can delete property-images" on storage.objects;
create policy "Admins can delete property-images" on storage.objects
for delete to authenticated using (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "Authenticated can upload site-images" on storage.objects;
create policy "Admins can upload site-images" on storage.objects
for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Authenticated can update site-images" on storage.objects;
create policy "Admins can update site-images" on storage.objects
for update to authenticated using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Authenticated can delete site-images" on storage.objects;
create policy "Admins can delete site-images" on storage.objects
for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());