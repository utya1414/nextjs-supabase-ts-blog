-- user table
create table users (
    id uuid primary key references auth.users on delete cascade,
    email text not null,
    name text
);
-- RLS settings
alter table users enable row level security;
create policy "プロフィール閲覧可能" on users for select using (true);
create policy "プロフィール編集可能" on users for update using (true);

-- function to create user table on signup
create function public.handle_new_user()
returns trigger as $$
begin
    insert into users (id, email) 
    values (new.id, new.email);
    return new;
end;
$$ language plpgsql security definer set search_path to 'public'; 

-- trigger to call function on signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
