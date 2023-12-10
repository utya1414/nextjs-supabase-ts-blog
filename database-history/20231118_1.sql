create table profiles (
  id uuid primary key references auth.users on delete cascade,
  introduce text,
  avatar_url text
);

alter table profiles enable row level security;
create policy "プロフィールは誰でも参照可能" on profiles for select using (true);
create policy "プロフィールを更新" on profiles for update using (true);

insert into storage.buckets (id, name, public) values ('profile', 'profile', true);
create policy "プロフィール画像は誰でも参照可能" on storage.objects for select using ( bucket_id = 'profile');
create policy "プロフィール画像はログインユーザーが追加" on storage.objects for insert with check ( bucket_id = 'profile' AND auth.role() = 'authenticated');
create policy "自身のプロフィール画像を更新" on storage.objects for update with check ( bucket_id = 'profile' AND auth.uid() = owner );
create policy "自身のプロフィール画像を削除" on storage.objects for delete using ( bucket_id = 'profile' AND auth.uid() = owner );

