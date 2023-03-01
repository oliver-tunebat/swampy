/*
run this in the Supabase SQL editor
*/

-- deletes the user's Profile
create function public.handle_deleted_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  delete from public."Profile"
  where id = old.id;
  return old;
end;
$$;

-- trigger the function every time a user is deleted
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_deleted_user();