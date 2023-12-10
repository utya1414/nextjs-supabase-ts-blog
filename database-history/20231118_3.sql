-- まだテーブル作ってないです
create table like_blogs (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  blog_id uuid references public.blogs on delete cascade not null
);

alter table like_blogs enable row level security;
create policy "誰でも参照可能" on like_blogs for select using ( true );
create policy "認証時に追加可能" on like_blogs for insert with check ( auth.role() = 'authenticated' );
create policy "自身のいいねを更新可能" on like_blogs for update using ( auth.uid() = 'owner' );
create policy "自身のいいねを削除可能" on like_blogs for delete using ( auth.uid() = 'owner' );