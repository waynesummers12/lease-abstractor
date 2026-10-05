-- The trigger only calls pg_catalog.now(); fix its search path.
alter function public.set_updated_at() set search_path = pg_catalog;
