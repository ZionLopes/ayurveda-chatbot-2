-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  avatar_url text,
  language text default 'en',
  role text default 'user',
  dosha_profile jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS setup for Users
alter table public.users enable row level security;
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- Chats table
create table public.chats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Chats
alter table public.chats enable row level security;
create policy "Users can view own chats" on public.chats for select using (auth.uid() = user_id);
create policy "Users can insert own chats" on public.chats for insert with check (auth.uid() = user_id);
create policy "Users can update own chats" on public.chats for update using (auth.uid() = user_id);
create policy "Users can delete own chats" on public.chats for delete using (auth.uid() = user_id);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references public.chats(id) on delete cascade not null,
  role text not null,
  content text not null,
  images jsonb,
  references_list jsonb,
  research jsonb,
  safety_notice text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Messages
alter table public.messages enable row level security;
create policy "Users can view messages of own chats" on public.messages for select 
  using (exists (select 1 from public.chats where id = messages.chat_id and user_id = auth.uid()));
create policy "Users can insert messages to own chats" on public.messages for insert 
  with check (exists (select 1 from public.chats where id = chat_id and user_id = auth.uid()));

-- Dosha Assessments
create table public.dosha_assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  answers jsonb not null,
  results jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Assessments
alter table public.dosha_assessments enable row level security;
create policy "Users can view own assessments" on public.dosha_assessments for select using (auth.uid() = user_id);
create policy "Users can insert own assessments" on public.dosha_assessments for insert with check (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_chats_updated_at
  before update on public.chats
  for each row
  execute procedure public.handle_updated_at();
