create table submissions (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  blogs_id uuid references public.blogs on delete cascade not null,
  code text,
  status text, 
  submitted_at timestamp with time zone default timezone('uts'::text, now()) not null
);

alter table submissions enable row level security;
create policy "誰でも参照可能" on submissions for select using (true);
create policy "認証時に追加可能" on submissions for insert with check ( auth.role() = 'authenticated');
create policy "自身の提出削除" on submissions for delete using (auth.uid() = user_id);
