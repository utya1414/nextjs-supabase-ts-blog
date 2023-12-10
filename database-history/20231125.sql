create table testcases (
    id uuid not null default uuid_generate_v4() primary key,
    user_id uuid references public.users on delete cascade not null,
    blog_id uuid references public.blogs on delete cascade not null,
    testcase text[] not null
);

alter table testcases enable row level security;
create policy "誰でもテストケース参照可能" on testcases for select using (true);
create policy "自身のテストケース投稿可能" on blogs for insert with check (auth.uid() = user_id);
create policy "自身のテストケース編集可能" on blogs for update using (auth.uid() = user_id);
create policy "自身のテストケース削除可能" on blogs for delete using (auth.uid() = user_id);