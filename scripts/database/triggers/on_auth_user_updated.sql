/*
run this in the SQL editor
*/

-- updates a Profile's email
create function public.handle_updated_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public."Profile"
  set email = new.email
  where id = new.id;
  return new;
end;
$$;

-- trigger the function every time a user's email is updated
create trigger on_auth_user_updated
  after update on auth.users
  for each row 
  when (old.email is distinct from new.email)
  execute procedure public.handle_updated_user();