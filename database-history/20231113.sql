-- blogs table
create table blogs (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  image_url text not null
);

-- rls settings of blogs
alter table blogs enable row level security;
create policy "誰でもブログ閲覧可能" on blogs for select using (true);
create policy "自身のブログ投稿可能" on blogs for insert with check (auth.uid() = user_id);
create policy "自身のブログ編集可能" on blogs for update using (auth.uid() = user_id);
create policy "自身のブログ削除可能" on blogs for delete using (auth.uid() = user_id);

-- blogs storage
insert into storage.buckets (id, name, public) values ('blogs', 'blogs', true);
create policy "誰でもブログ画像閲覧可能" on storage.objects for select using (bucket_id = 'blogs');
create policy "自身のブログ画像投稿可能" on storage.objects for insert with check (bucket_id = 'blogs' AND auth.role() = 'authenticated');
create policy "自身のブログ画像編集可能" on storage.objects for update with check (bucket_id = 'blogs' AND auth.uid() = owner );
create policy "自身のブログ画像削除可能" on storage.objects for delete using (bucket_id = 'blogs' AND auth.uid() = owner );