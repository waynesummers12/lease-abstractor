-- Active uploads pass through the authorized worker using the service role.
-- Public storage access exposed private lease PDFs through the Storage API.
drop policy if exists "Allow anon reads from leases bucket" on storage.objects;
drop policy if exists "Allow anon uploads to leases bucket" on storage.objects;
drop policy if exists "allow uploads to leases bucket" on storage.objects;

-- The legacy public.leases table is not used by the active upload flow.
drop policy if exists "Allow anon insert leases" on public.leases;
revoke insert on table public.leases from public, anon, authenticated;
