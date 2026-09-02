revoke all on function public.has_role(uuid, public.app_role) from anon, authenticated, public;
revoke all on function public.is_admin() from anon, authenticated, public;
revoke all on function public.claim_admin_if_none() from anon, public;
grant execute on function public.claim_admin_if_none() to authenticated;
revoke all on function public.update_updated_at_column() from anon, authenticated, public;