/*
run this in the SQL editor
*/

-- inserts a row into public.User and public.UserSettings
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."User" ("id", "email")
  values (new.id, new.email);

  insert into public."UserSettings" ("userId")
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();